# We label the stage as 'builder'
FROM tiangolo/node-frontend:10 as builder
LABEL maintainer="kareem.mohllal@gmail.com"

## tiangolo/node-frontend:10
ENV API_URL=https://api.voyship.com/api/v0/

# Create project directory (workdir)
WORKDIR /app

# Add package.json to WORKDIR and install dependencies
COPY package.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

### STAGE 2: Setup ###
FROM nginx:1.15

## Copy our default nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

CMD ["nginx", "-g", "daemon off;"]
