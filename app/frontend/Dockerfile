FROM node:16.14-alpine
WORKDIR /app-frontend
ADD ./ ./
RUN npm install
ENTRYPOINT [ "npm", "start" ]
