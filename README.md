# Project Readme
## Setup
1. Install Docker: https://www.docker.com/. `docker-compose` is used to run the
app in development.
2. In the `env` folder, change the name from `*.env.example` to `*.env`. Make
sure to change the information in `db.env` as needed.
3. At the root directory, run `npm start` to install dependencies and start the app.

## `docker-compose` Commands
``` shell
# start the app, (re)-building images as needed
docker-compose up --build

# stop the app
docker-compose down
```

## knex Commands - Migrations & Seeds
See: http://knexjs.org/#Migrations
To run `knex` commands, make sure the `db` and `backend` containers are running
and start with this as a base: 
`docker-compose exec backend knex <command>`

### Create Migration
`docker-compose exec backend knex migrate:make <migration_name>`

### Run Migrations
`docker-compose exec backend knex migrate:latest`

### Rollback Migrations
`docker-compose exec backend knex migrate:rollback [--all]`

### Create Seed
`docker-compose exec backend knex seed:make <seed_name>`

### Run Seed
`docker-compose exec backend knex seed:run`