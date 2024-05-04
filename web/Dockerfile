# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app


# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm i

# Bundle app source
COPY . .

# Copy the .env and .env.development files
# COPY .env .env.development ./

# Expose the port on which the app will run
EXPOSE 3692

ENV PORT 3692


# ENV CHOKIDAR_USEPOLLING true
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Start the server using the production build
CMD ["npm", "run", "dev"]
