ARG NODE_ENV=benj
ARG PORT=3006

FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV $NODE_ENV
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE $PORT

ENV PORT $PORT

CMD ["npm", "start"]