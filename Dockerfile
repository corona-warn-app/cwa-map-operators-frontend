FROM node:16 as build
WORKDIR /src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1-alpine
COPY --from=build /src/app/dist/management-frontend /usr/share/nginx/html
