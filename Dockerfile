FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]
