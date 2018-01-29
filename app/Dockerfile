FROM node:carbon

WORKDIR /app

COPY . /app
# COPY ./package.json /app

RUN npm install
# RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
