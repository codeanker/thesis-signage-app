FROM node:20-alpine3.17 AS workspace-base
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
RUN npm run initPrisma --workspace ./api

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ARG commitHash
ENV COMMIT_HASH $commitHash
ARG version
ENV VERSION $version

FROM workspace-base as api-build-stage

FROM api-build-stage as api-production-stage

CMD ["npm", "run", "start", "--workspace", "./api"]

FROM workspace-base as frontend-build-stage
ARG tenant
ENV VITE_APP_COMMIT_HASH $commitHash
ENV VITE_APP_VERSION $version
RUN npm run build --workspace ./frontend


# production stage
FROM nginx:1.13.12-alpine AS frontend-production-stage
COPY --from=frontend-build-stage /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
