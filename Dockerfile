# Stage 1: Build React app
FROM node:latest as build


WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

ARG NODE_ENV production
ARG REACT_APP_BACKEND_URL http://localhost:8080/

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]