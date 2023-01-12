<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

```bash
nest update -f -t latest
```

## Preparations Swagger (Only when npm install failed to add swagger)
```bash
npm install --save @nestjs/swagger swagger-ui-express
```


## Preparations Prisma

1. Install `prisma`:

    ```bash
     npx prisma init
    ```

2. Create database using postgres or mysql (assume ane of that already installed to you machine):

    ```
    # sample databasename
     transaction
    ```

3. Update .env file based on no 2.

4. Migrate the database structure using command below:

    ```bash
    npx prisma migrate dev --name "init"
    ```

5. Fill the database records using seeder:

    ```bash
    npx prisma db seed
    ```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Resource/Endpoint Test 2

No 1

| No | Method | Endpoint | Parameters | Description |
| --- | --- | --- | --- | --- |
| 1 | POST | /print-array | {  "start": 1, "end": 100 } | Array replace value] |

No 2

| No | Method | Endpoint | Parameters | Description |
| --- | --- | --- | --- | --- |
| 1 | POST | /users | {  "email": "stringsss",  "name": "string" } | Create new user data |
| 2 | PATCH | /users/{id:} | {  "email": "stringsss",  "name": "string" } | Update partial fields |
| 3 | GET | /users/ | --- | List all user |
| 4 | GET | /users/{id:} | --- | List user by id |
| 5 | DELETE | /users/{id:} | --- | Delete user by id |
| 6 | POST | /products | {  "name": "string",  "price": 10,  "quantity": 90 } | Create new products data |
| 7 | PATCH | /products/{id:} | {  "name": "string",  "price": 10,  "quantity": 90} | Update partial fields |
| 8 | GET | /products/ | --- | List all products |
| 9 | GET | /products/{id:} | --- | List products by id |
| 10 | DELETE | /products/{id:} | --- | Delete products by id |
| 11 | POST | /payments | {  "name": "string" } | Create new payment data |
| 12 | PATCH | /users/{id:} | {  "name": "string"  } | Update partial fields |
| 13 | GET | /payments/ | --- | List all payment |
| 14 | GET | /payments/{id:} | --- | List payment by id |
| 15 | DELETE | /payments/{id:} | --- | Delete payment by id |
| 16 | POST | /transactions | {  "userId": 4,  "productId": 4,  "quantity": 1,  "paymentId": 4,  "total": 0,  "status": 0 } | Create new transaction data |
| 17 | PATCH | /users/{id:} | {  "userId": 4,  "productId": 4,  "quantity": 16, } | Update partial fields |
| 18 | GET | /transactions/ | --- | List all transaction |
| 19 | GET | /transactions/{id:} | --- | List transaction by id |
| 20 | DELETE | /transactions/{id:} | --- | Delete transaction by id |

## Transaction FLOWCHART 

<div style="width:60px ; height:60px">
![Flowchart](./assets/JannahFirdaus.pdf?raw=true "Flowchart")
<div>



<!-- ## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->


<!-- npm i -D prisma

You can initialize Prisma inside your project by running:

npx prisma init

npx prisma migrate dev --name "init"

npx prisma db seed

npx nest generate module prisma
npx nest generate service prisma

nest update -f -t latest

npm install --save @nestjs/swagger swagger-ui-express

npx nest generate resource articles

The @ApiProperty decorators are required to make the class properties visible to the SwaggerModule. More information about this is available in the NestJS docs.


npm install class-validator class-transformer
 -->
