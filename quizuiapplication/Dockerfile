FROM node:8.9

# Create app directory
RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV development

# Bundle app source
COPY . /app

# Copy contents of config/template.js file into config/index.js file
RUN rm -rf /app/src/config/index.js
RUN cp /app/src/config/template.js /app/src/config/index.js


# Setup node app
RUN npm install
RUN npm run build

FROM nginx:1.15.2-alpine

# Install bash
RUN apk add --no-cache bash

RUN mkdir -p /var/www

# Copy app contents to /var/www/rezoomex-quiz
COPY --from=0 /app/build /var/www
COPY --from=0 /app/run.sh /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

# Run setup script
ENTRYPOINT ["/bin/bash", "/var/www/run.sh"]