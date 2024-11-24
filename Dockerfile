FROM node:22-alpine

COPY ./lib /home/app/lib
COPY ./tool /home/app/tool
COPY package.json /home/app
COPY router.js /home/app
COPY server.js /home/app

RUN cd /home/app && npm install

WORKDIR /home/app

EXPOSE 3000
CMD ["node", "server.js"]
