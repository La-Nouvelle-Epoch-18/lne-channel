FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY app.js ./
COPY src ./

# default port
EXPOSE 8080
CMD [ "npm", "start" ]
