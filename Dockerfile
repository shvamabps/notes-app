FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 8000

CMD ["yarn", "start"]
