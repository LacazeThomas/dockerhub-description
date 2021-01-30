FROM node:14-alpine

COPY dist/index.js /index.js

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
