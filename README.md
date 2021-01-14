# Project Readme
## Setup
### Install App
1. Install Docker: https://www.docker.com/. `docker-compose` is used to run the
app in development.
2. In the `env` folder, change the name from `*.env.example` to `*.env`.
Change the information in `db.env` as needed (e.g. password)
run `npm start` to install dependencies and start the app.
3. At the root directory, run `docker-compose --build` to install dependencies.

### Run Migrations & Seeds
4. Start the db & backend containers: `docker-compose up -d backend`. This also starts the db container since the backend depends on it.
5. Migrations: run `docker-compose exec backend sh -c "cd db && npx knex migrate:latest"`
6. Seed: run `docker-compose exec backend sh -c "cd db && npx knex seed:run"`
7. Run `docker-compose down` to stop running containers

### Start The App
8. In the root directory:
  - if you have Node.js installed, you can run `npm start`
  - if not, run `docker-compose up --build -d` to start the app in detached mode


## `docker-compose` Commands
``` shell
# start the app, (re)-building images as needed
# add -d to start in detached mode
docker-compose up --build [-d]

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