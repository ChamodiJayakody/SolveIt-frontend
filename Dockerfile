# filepath: d:\Projects\DevOps\SolveIt-frontend\Dockerfile
FROM node:18-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Clean up any existing node_modules and package-lock.json
RUN rm -rf node_modules package-lock.json

### Installing dependencies
RUN npm install --silent

# Copy local files to app folder
COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev"]