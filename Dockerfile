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

# Copy the FULL app (source + node_modules + .next + public + prisma), owned by
# node. The TS source (lib/, types/, prisma/seed.ts, ...) must be present so
# `prisma db seed` (tsx) resolves its imports (e.g. ../lib/permissions), and node
# ownership lets `prisma db push` regenerate the client (root-owned = EACCES).
COPY --from=build --chown=node:node /app ./

USER node

EXPOSE 3000

# Base image keeps tini as PID 1 (clean SIGTERM). `next start` reads PORT.
CMD ["node_modules/.bin/next", "start"]
