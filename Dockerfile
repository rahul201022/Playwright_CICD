# Use Node.js as the base image
FROM mcr.microsoft.com/playwright:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set environment variables
ENV CI=true

# Command to run tests
# CMD ["npx", "playwright", "test"] 