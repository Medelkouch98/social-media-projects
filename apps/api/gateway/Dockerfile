FROM social-media:nx-base As builder

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder

COPY . .

RUN npx nx build api-gateway ${BUILD_FLAG}

FROM social-media:nx-base

WORKDIR /app

COPY --from=builder /app/builder ./

ENV NODE_ENV=$NODE_ENV

ENTRYPOINT ["node", "./dist/apps/api/gateway/main.js"]
