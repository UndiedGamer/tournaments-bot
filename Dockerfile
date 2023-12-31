# ================ #
#    Base Stage    #
# ================ #

FROM node:20-alpine as base

WORKDIR /usr/src/app

ENV CI=true
ENV FORCE_COLOR=true

RUN apk add --no-cache dumb-init

COPY --chown=node:node yarn.lock .
COPY --chown=node:node package.json .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

ENTRYPOINT ["dumb-init", "--"]

# ================ #
#   Builder Stage  #
# ================ #

FROM base as builder

ENV NODE_ENV="development"

COPY --chown=node:node tsconfig.base.json tsconfig.base.json
COPY --chown=node:node tsup.config.ts .
COPY --chown=node:node src/ src/

RUN yarn install --immutable
RUN yarn run build

# ================ #
#   Runner Stage   #
# ================ #

FROM base AS runner

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--enable-source-maps"

COPY --chown=node:node .env .env
COPY --chown=node:node --from=builder /usr/src/app/dist dist

RUN yarn workspaces focus --all --production
RUN chown node:node /usr/src/app/

USER node

CMD [ "yarn", "run", "start" ]
