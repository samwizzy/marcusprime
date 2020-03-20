FROM node:10-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --update \
python \
python-dev \
py-pip \ 
build-base \ 
&& pip install virtualenv \ 
&& rm -rf /var/cache/apk/*
RUN npm install
COPY . .

CMD ["npm", "start"]