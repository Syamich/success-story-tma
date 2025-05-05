# build environment
FROM node:16 AS build
WORKDIR /app
COPY package.json ./
RUN npm install # Создаст package-lock.json
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
