FROM node:20-alpine3.17 AS base
ENV CI=true
ENV HUSKY=0

WORKDIR /app

COPY frontend/package.json ./frontend/
COPY api/package.json ./api/

COPY packages/helpers/package.json ./packages/helpers/
COPY packages/website-widget/package.json ./packages/website-widget/
COPY packages/news-widget/package.json ./packages/news-widget/
COPY packages/weather-widget/package.json ./packages/weather-widget/

COPY package*.json ./

RUN npm ci
COPY . ./

ARG commitHash
ENV VITE_APP_COMMIT_HASH $commitHash
ARG version
ENV VITE_APP_VERSION $version

FROM base as build-stage
ARG mode
RUN npm run build:$mode --workspace ./frontend

# production stage
FROM nginx:1.13.12-alpine AS production-stage
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
