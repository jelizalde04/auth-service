# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package files for efficient caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the project
COPY . .

# Expose port 1002
EXPOSE 1002

# Start the application
CMD ["node", "index.js"]
