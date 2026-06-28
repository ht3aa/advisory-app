# advisory (advisory-office) — Next.js SSR + Prisma.
# 2-stage build on the shared DevOps base image (738222620290 base-images:node-22,
# org-wide pull). Build -> .next, then a non-root runtime that runs `next start`.
ARG BASE=738222620290.dkr.ecr.eu-central-1.amazonaws.com/base-images
ARG NODE=node-22

# ---------------------------------------------------------------------------
# Stage 1: build (.next)
# ---------------------------------------------------------------------------
FROM ${BASE}:${NODE} AS build
WORKDIR /app
USER root

# Do NOT set NODE_ENV=development here: `next build` must run as production or
# prerender breaks ("Cannot read properties of null (reading 'useContext')").
# `npm ci` installs devDeps by default when NODE_ENV is unset, so the build
# toolchain is still present. Dummy DATABASE_URL so the Prisma client can be
# instantiated during the build (no real connection is made — pages render
# dynamically at runtime).
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"

# prisma schema + config must be present for the `postinstall` (prisma generate).
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci

COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# Stage 2: runtime (next start, non-root `node`)
# ---------------------------------------------------------------------------
FROM ${BASE}:${NODE} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

# Non-standalone Next needs node_modules + .next + public + config at runtime.
# node_modules is kept intact (not pruned) so the Prisma client AND
# `prisma migrate deploy` (run as a chart job from this image) both work.
COPY --from=build /app/node_modules   ./node_modules
COPY --from=build /app/.next          ./.next
COPY --from=build /app/public         ./public
COPY --from=build /app/package.json   ./package.json
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/prisma         ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

RUN chown -R node:node /app/.next
USER node

EXPOSE 3000

# Base image keeps tini as PID 1 (clean SIGTERM). `next start` reads PORT.
CMD ["node_modules/.bin/next", "start"]
