# Dockerfile for React frontend (Vite)
FROM node:20-alpine as build

WORKDIR /app
COPY . .

# Rename .env.development to .env so Vite loads it
RUN cp .env.development .env

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Serve the static files using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# To run this locally on docker -
# docker build . -t ordernow-cust-frontend .
# docker run -p 3000:80 ordernow-cust-frontend