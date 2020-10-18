FROM node:12.18.3 as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:latest as server
COPY --from=build-step /app/dist/Fitness-Tracker-FE /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf