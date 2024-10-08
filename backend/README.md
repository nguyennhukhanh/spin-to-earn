# Description

## Spin to earn is a web application for ...

- [Nest](https://docs.nestjs.com) is a framework for building efficient, scalable Node.js server-side applications.

## Documentation of some libraries I used

- [TypeORM](https://typeorm.io/) is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES2021).

# Installation

```bash
# install
$ yarn
```

# Note before running the project

- Create '.env' file in the project's root folder. (For example: /root/.env).
- Create a folder named 'logs' in the root folder of the project. In the 'logs' folder create a file named 'error.txt'. (For example: /root/logs/error.txt).

```bash
# Generate logs
$ yarn generate:logs
```

# Watch mode

```bash
# watch mode
$ yarn dev

# run seed
$ yarn seed
```

# Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

# Build & Production mode

```bash
# build
$ yarn build

# start app
$ yarn start:prod

# run seed if you want to seed some data
$ yarn seed
```

# Using docker

```bash
# build
$ docker-compose up -d

# start
$ docker-compose start

# restart
$ docker-compose restart
```

# License

Nest is [MIT licensed](LICENSE).
