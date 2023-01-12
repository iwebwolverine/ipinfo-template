FROM node:16

WORKDIR /usr/src/app

RUN apt-get update && apt-get install build-essential -y

COPY package*.json ./

RUN npm install
RUN npm install -g sequelize-cli
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start:dev"]