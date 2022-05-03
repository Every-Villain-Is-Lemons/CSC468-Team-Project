FROM node:4-slim

RUN npm install http-server -g

COPY webui/files/ /files/
COPY webui/ /
CMD ["http-server", "/trial.html"]
EXPOSE 80
