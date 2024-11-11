# Use the official Node.js image as a base
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the app code
COPY . .

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
