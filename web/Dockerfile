FROM node:carbon

WORKDIR /app

COPY . .

RUN npm install -g sails
RUN npm install -g nodemon

EXPOSE 1337

CMD ["nodemon", "app.js"]