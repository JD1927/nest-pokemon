<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Folder Structure

> May not be accurate due to the changes but it helps getting the way things are built here.

```
└── 📁nest-pokemon
    └── 📁public
        └── 📁css
            └── styles.css
        └── index.html
    └── 📁src
        └── app.module.ts
        └── main.ts
        └── 📁pokemon -> Modules
            └── 📁dto -> DTO's
                └── create-pokemon.dto.ts
                └── update-pokemon.dto.ts
            └── 📁entities
                └── pokemon.entity.ts
            └── pokemon.controller.ts
            └── pokemon.module.ts
            └── pokemon.service.ts
    └── 📁test
        └── app.e2e-spec.ts
        └── jest-e2e.json
    └── .gitignore
    └── .prettierrc
    └── docker-compose.yaml
    └── eslint.config.mjs
    └── nest-cli.json
    └── package.json
    └── pnpm-lock.yaml
    └── README.md
    └── tsconfig.build.json
    └── tsconfig.json
```

## Used Stack

- MongoDB
- NestJS

## First steps

```bash
$ pnpm add -g @nestjs/cli
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

> Must have installed docker with MongoDB

```bash
# In .nest-pokemon/ run to create the Database:
$ docker-compose up -d
```

## Environment Variables

Clone file `.env.template` to `.env` to run things smoothly.

```bash
MONGO_DB=mongodb://localhost:27017/nest-pokemon
MONGO_DB_NAME=nest_pokemon_db
PORT=3000
DEFAULT_LIMIT=5
```

## Production Build

1. Must have file `.env.prod` created
1. Set environment variables for PROD file
1. Create a new image (containing app and database) -> Will take some time ⏳

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

> Once you've created the build image you can now execute this command in order to avoid having the process in the console.

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Execute seed request

> Must have MongoDB up and running

Execute seed request

```bash
$ {{host}}/api/v2/seed to get the pokemons
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
