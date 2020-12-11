FROM node:12-slim AS builder


RUN npm config set registry http://10.0.1.25:4873

# cache node_modules
COPY ./servers/server/package.json /tmp
COPY ./servers/server/.npmrc /tmp
WORKDIR /tmp
RUN npm install

# build
COPY ./servers/server /src
COPY ./protos /protos
WORKDIR /src
RUN cp -r /tmp/node_modules . \
  && npm run build \
  && mkdir -p /api/server \
  && mv dist config package.json /api/server


FROM node:12-slim

ENV NODE_ENV=production
WORKDIR /workspace

COPY ./protos /protos
COPY --from=builder /api .

WORKDIR /workspace/server

CMD ["node", "dist/index.js"]

EXPOSE 3001
