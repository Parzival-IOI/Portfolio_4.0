# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Production stage
FROM node:22-alpine

WORKDIR /usr/src/app

# Nitro's node-server output is self-contained (its own bundled deps) - no
# separate `npm ci` needed in this stage, unlike a typical Node service.
COPY --from=builder /usr/src/app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

USER node

CMD ["node", ".output/server/index.mjs"]
