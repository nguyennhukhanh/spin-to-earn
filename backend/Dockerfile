FROM node:18-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/.gitignore /app/.gitignore
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock

RUN yarn install --frozen-lockfile

COPY --from=builder /app /app

# Generate logs and public files
RUN yarn generate:logs
RUN yarn generate:public

RUN yarn build 

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

USER nestjs

COPY --from=installer --chown=nestjs:nodejs /app/package.json /app/package.json
COPY --from=installer --chown=nestjs:nodejs /app /app
COPY --from=installer --chown=nestjs:nodejs /app/templates /app/templates

EXPOSE 3001
ENV PORT 3001

CMD ["yarn","start:prod"]