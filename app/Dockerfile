FROM node:carbon

# Optimized npm install as a cached layer.
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

COPY . /app
WORKDIR /app

EXPOSE 3000

CMD ["npm","build"]
