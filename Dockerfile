FROM node:latest

WORKDIR /usr/src

COPY . .

RUN npm i

EXPOSE 4000

CMD ["npm", "run", "dev"]

