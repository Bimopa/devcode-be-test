# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN npm install
CMD ["npx", "sequelize" "db:create"]
CMD ["npx", "sequelize" "db:migrate"]
CMD ["npm", "start"]
EXPOSE 3030
