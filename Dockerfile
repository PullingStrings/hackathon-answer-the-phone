# Install the frontend toolchain inside Docker: the host needs only Docker/Compose.
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Build and verify the static application before it can be packaged.
FROM dependencies AS build
COPY . .
RUN npm test && npm run build

# Serve only the generated static files; Node is not needed at runtime.
FROM nginx:stable-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
