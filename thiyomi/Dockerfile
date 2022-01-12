FROM node:16.13.1-alpine AS development

WORKDIR /.

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
RUN npm run build