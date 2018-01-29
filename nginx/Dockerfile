# Build the react app first
# FROM node:carbon as builder
#
# WORKDIR /app
# COPY ./app-source app/
#
# RUN npm install
# RUN npm run build

# Use it
FROM nginx:latest

# COPY --from=builder /app/build /usr/share/nginx/www

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
