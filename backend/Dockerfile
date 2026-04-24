#Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .

#Stage 2: Production
FROM node:20-alpine AS production 
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/package.json .
COPY --from=builder /app/src ./src
RUN npm install --omit=dev

RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 3000
CMD ["node", "src/index.js"]
