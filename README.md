# 3ntertain's Backend

This repo contains our Backend code that we decided to fully open-source to the community, to help other builder to craft an 3ntertaining future with us.

## GrizzlyThon

This project has been coded in one month and is a technical MVP submitted for the Solana GrizzlyThon.
A lot has yet to improve.

We have taken all the shortcuts in order to ship a live and functionnal product, as fast as possible, with the greatest UX.

## User first

Our approach has always been to place the user at the center of every decision we take. We are experienced in building digital products and we know how important are user feedbacks.

## Reduce the time to market

We are an agile team, inspired by the Agile principles and working with a very mature Scrum framework application. We are focused on small and meaningful iterations, building "real things" fast, and adapting the plan as soon as we are making new learnings on the way.

## A journey to decentralization

Our journey will bring us to a fully decentralized service. This is where we aim, and today, only Solana is making this dream possible. Our approach is pragmatic and we are adapting the techs we chose to the stage of development we are in.

In its current stage, 3ntertain takes advantage of the power of Solana and relays on the best web2 technologies. We will step by step integrate more decentralized primitives.

## Current stack

| Web3                  | Backend | Frontend    | IT     |
| --------------------- | ------- | ----------- | ------ |
| Mobile Wallet Adapter | Nest    | React       | Heroku |
| Metaplex              | GraphQL | Next        | Git    |
| ThirdWeb              | TypeORM | Material UI | AWS    |
| Quicknode             | MySQL   | Apollo      | S3     |

## Run the back end

- Clone the repo
- install `npm i`
- Run locally the server `npm run start:dev`

You will need to configure an env file

```
PORT=5000
PRIVATE_KEY=xxx
NETWORK=devnet
APP_URL=https://3ntertain.io

DB_HOST=
DB_PORT=3306
DB_DATABASE=
DB_USER=
DB_PASSWORD=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_REGION=
AWS_BUCKET_NAME=
```
