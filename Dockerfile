FROM node:lts-alpine
WORKDIR /app
ENV MONGO_URI=mongodb+srv://rapzki03:mongodb183461@nasa-project-instance.zllly.mongodb.net/nasa?retryWrites=true&w=majority
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN yarn global add pnpm
COPY client/package.json client/
COPY client/pnpm-lock.yaml client/
RUN pnpm -C ./client install -P
COPY server/package.json server/
COPY server/pnpm-lock.yaml server/
RUN pnpm -C ./server install -P
COPY client/ client/
RUN pnpm -C ./client run build
COPY server/ server/
USER node
CMD ["node", "server/src/server.js"]
EXPOSE 8000