FROM node:12.13.0

RUN apt-get update && apt-get install -y \
    bash \
    g++ \
    inotify-tools \
    yarn

COPY ["package.json", "yarn.lock", "/code/"]
WORKDIR /code/

RUN yarn install
COPY . /code

ARG BACKEND_URL=__BACKEND_URL__
ENV BACKEND_URL ${BACKEND_URL}

RUN yarn build

EXPOSE 3000

ENTRYPOINT []
