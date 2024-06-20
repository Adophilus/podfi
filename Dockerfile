FROM node:slim

WORKDIR /usr/src/app

COPY ./@podfi/server/build .
COPY ./@podfi/server/bin bin
COPY ./@podfi/server/assets assets

ENTRYPOINT [ "./bin/entrypoint.sh" ]

