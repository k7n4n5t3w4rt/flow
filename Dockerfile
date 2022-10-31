# Instructions: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

# The first thing we need to do is define from what image we want to build from.
# NOTE: This is the same image from Docker Hub that is specified in the .gitlab-ci.yml
FROM node:14.5.0-alpine

# https://docs.docker.com/engine/reference/builder/#workdir
WORKDIR /app
#WORKDIR server

# https://docs.docker.com/engine/reference/builder/#env
# This form, ENV <key> <value>, will set a single variable to a value.
# The entire string after the first space will be treated as the <value> -
# including whitespace characters. The value will be interpreted for other
# environment variables, so quote characters will be removed if they are
# not escaped.
ENV NODE_ENV development
ENV PORT 4000

# https://docs.docker.com/engine/reference/builder/#expose
# The EXPOSE instruction does not actually publish the port.
# It functions as a type of documentation between the person
# who builds the image and the person who runs the container,
# about which ports are intended to be published. To actually
# publish the port when running the container, use the -p flag
# on docker run to publish and map one or more ports
EXPOSE 4000

# https://docs.docker.com/engine/reference/builder/#copy
# COPY [--chown=<user>:<group>] <src>... <dest>
# If <src> is a directory, the entire contents of the directory are copied
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/
COPY modernizr-config.json /app/
COPY 404.html /app/
COPY browserconfig.xml /app/
COPY favicon.ico /app/
COPY humans.txt /app/
COPY icon.png /app/
COPY index.html /app/
COPY robots.txt /app/
COPY site.webmanifest /app/
COPY tile-wide.png /app/
COPY tile.png /app/
COPY js /app/js/
COPY img /app/img/
COPY css /app/css/
COPY web_modules /app/web_modules/
COPY server /app/server/

RUN ls -al /app

# Install the node packages
RUN npm ci --only=production

ENTRYPOINT ["npm", "run", "start"]