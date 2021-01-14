# Project Readme
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