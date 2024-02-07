FROM oven/bun:1.0.25 as base

WORKDIR /app

COPY package.json package.json

RUN bun install

FROM oven/bun:1.0.25

WORKDIR /app

COPY --from=base /app/node_modules node_modules
COPY --from=base /app/package.json package.json

COPY . .

RUN bun run tailwind:build

ENV NODE_ENV production
ENV ENV production

RUN cp .fly/entrypoint.sh /entrypoint \
    && chmod +x /entrypoint

EXPOSE 3000

CMD ["/entrypoint"]
