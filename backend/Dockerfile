# Use an official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json ./
# If using npm:
RUN npm install

# If using Yarn:
# RUN yarn install

# Copy the rest of the source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the server
CMD [ "npm", "start" ]
