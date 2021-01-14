FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install && \
    npx knex migrate:latest && \
    npx knex seed:run

COPY . .

EXPOSE 5000

CMD ["npm", "start"]