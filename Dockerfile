# =============================================================================
# Customer Site — React Router 8 SSR (Node.js)
# =============================================================================
# Standalone Dockerfile for per-customer repos. Built by the platform's
# build-agent (Dockerfile strategy, repo root as build context) on every push
# to the App's branch; see the CRM's managed-deploy runbook.
#
# node:22-slim, not 20: React Router 8 requires node >=22.22.0.

# Stage 1: Install dependencies
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm ci` for a reproducible install off the lockfile; the fallback keeps a
# build alive if the lockfile ever drifts from package.json.
RUN npm ci || npm install

# Stage 2: Build
FROM node:22-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production dependencies only
FROM node:22-slim AS production-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Stage 4: Runtime
FROM node:22-slim AS runtime
WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "run", "start"]
