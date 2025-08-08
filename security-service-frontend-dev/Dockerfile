# Use an official Node.js image as the base
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy environment variables script
COPY ./public /usr/share/nginx/html
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
