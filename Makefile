GIT_SHA ?= $(shell git rev-parse --short HEAD)
REGION  ?= eu-central-1

# ---- App image -> push to the Enjaz ECR (630877783467/advisory) ----
REGISTRY ?= 630877783467.dkr.ecr.eu-central-1.amazonaws.com/advisory

# ---- Base images -> shared DevOps ECR (738222620290, org-wide pull) ----
BASE ?= 738222620290.dkr.ecr.eu-central-1.amazonaws.com/base-images
NODE ?= node-22

# Unique tag for the IMMUTABLE repo; `web` prefix is preserved by cd-deployer
# (it swaps only the sha on deploy).
IMAGE_TAG ?= web-$(GIT_SHA)

.PHONY: all login build push run
all: login build push

login: ## docker login to BOTH ECRs (738… base pull + 630877783467 app push)
	@TOKEN=$$(aws ecr get-login-password --region $(REGION)); \
	for acct in 738222620290 630877783467; do \
		echo "  -> docker login $$acct.dkr.ecr.$(REGION).amazonaws.com"; \
		echo "$$TOKEN" | docker login --username AWS --password-stdin $$acct.dkr.ecr.$(REGION).amazonaws.com; \
	done
	# One token (caller = 630877783467). Cross-account pull from 738…/base-images
	# is authorized by that repo's org-wide pull policy; push by IAM.

build: ## Build the image (pulls FROM the shared base image)
	docker build . \
		--platform=linux/amd64 --provenance=false \
		--build-arg BASE=$(BASE) \
		--build-arg NODE=$(NODE) \
		-t $(REGISTRY):$(IMAGE_TAG)

push: ## Push the SHA-tagged image
	docker push $(REGISTRY):$(IMAGE_TAG)

run: ## Run locally (3000)
	docker run --rm -p 3000:3000 $(REGISTRY):$(IMAGE_TAG)
