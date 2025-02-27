# Project Readme
## Setup
### Install App
1. Install Docker: https://www.docker.com/. `docker-compose` is used to run the
app in development.
2. In the `env` folder, change the name from `*.env.example` to `*.env`.
Change the information in `db.env` as needed (e.g. password)
3. At the root directory, run `docker-compose build` to install dependencies.
4. In the backend folder (will update this later...):
    - create a folder called `public`
    - inside `public`, create a folder called `uploads`
    - inside `uploads`, create a folder called `images`
    - after the above instructions, this path should exist: `backend/public/uploads/images`

### Run Migrations & Seeds
5. Start the db & backend containers: `docker-compose up -d backend`. This also starts the db container since the backend depends on it.
6. Migrations: run `docker-compose exec backend sh -c "npx knex migrate:latest"`
7. Seed: run `docker-compose exec backend sh -c "npx knex seed:run"`
8. Run `docker-compose down` to stop running containers

### Start The App
9. In the root directory:
  - if you have Node.js installed, you can run `npm start`
  - if not, run `docker-compose up --build -d` to start the app in detached mode

### Setup Google OAuth
https://console.developers.google.com
1. Create a New Project. If this is your first time creating a project, choose "Select a project" in the top left corner, then "NEW PROJECT"
2. In the left sidebar, choose "OAuth Consent Screen"
  - page 1: External > Create
  - page 2 (OAuth consent screen): Fill in "App name", "User support email", and "Developer contact information"
  - page 3 (Scopes): choose "Save and Continue"
  - page 4 (Test Users): choose "Save and Continue"
  - page 5: choose "Back to Dashboard"
3. In the left sidebar, choose "Credentials"
  - Create Credentials -> OAuth Client ID
  - Application Type: Web application
  - Fill in "Name"
  - Authorized JavaScript origins: http://localhost:3000
  - Authorized redirect URIs: http://localhost:3000, http://localhost:3000/auth
  - Create
4. Store the Client ID in `frontend.env` and `backend.env`

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
`docker-compose exec backend npx knex <command>`

### Create Migration
`docker-compose exec backend npx knex migrate:make <migration_name>`

### Run Migrations
`docker-compose exec backend npx knex migrate:latest`

### Rollback Migrations
`docker-compose exec backend npx knex migrate:rollback [--all]`

### Create Seed
`docker-compose exec backend npx knex seed:make <seed_name>`

### Run Seed
`docker-compose exec backend npx knex seed:run`

## Other Commands
### Remove Unreferenced Tags
`SELECT "remove_unreferenced_concept_tags"();`

# Deploy
## Droplet
### DNS
- create an A record pointing to the droplet

### Backend
- clone the repo: `git clone https://github.com/Philosocode/notebooks.git`
- install nodejs: `sudo apt install nodejs`
- rename `sudo cp ./env/backend.env.example ./env/backend.env`. Update with appropriate values
- `cd backend`
- install deps: `npm i`
- create a folder to hold images: `mkdir -p public/uploads/images`

### Database
- create database and role:
```sh
psql -U postgres
CREATE DATABASE notebooks;
\c notebooks;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE ROLE notebooks WITH LOGIN PASSWORD 'passwordFromEnvFile';
ALTER DATABASE notebooks OWNER TO notebooks;
GRANT ALL PRIVILEGES ON DATABASE notebooks TO notebooks;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO notebooks;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO notebooks;
```
- run migrations: `npx knex migrate:latest`
- seed the database: `npx knex seed:run`

### Firewall
- expose the API port:
```
sudo ufw allow 5001/tcp
```

### Caddyfile
```conf
notebooks.com {
    encode gzip

    log {
        format console
    }

    handle /api/* {
        @spaRequests host notebooks.philosocode.com
        reverse_proxy @spaRequests localhost:5001
    }

    handle {
        root * /var/www/notebooks/frontend/build
        try_files {path} /index.html
        file_server
    }
}
```

### systemd Unit File
```conf
# /etc/systemd/system/notebooks-api.service
[Unit]
Description=Notebooks API service

# Wait until PostgreSQL is running and the network is "up" before starting the service.
After=postgresql.service
After=network-online.target
Wants=network-online.target

# Configure service start rate limiting. If the service is (re)started more than 5 times
# in 600 seconds then don't permit it to start anymore.
StartLimitIntervalSec=600
StartLimitBurst=5

[Service]
Type=exec
User=phi
Group=phi
WorkingDirectory=/var/www/notebooks/backend
EnvironmentFile=/var/www/notebooks/env/backend.env
ExecStart=/usr/bin/node /var/www/notebooks/backend/server.js
# Automatically restart the service after 10 seconds.
Restart=on-failure
RestartSec=10
SyslogIdentifier=notebooks-api

[Install]
# Start the service automatically at boot time (the 'multi-user.target' describes a boot
# state when the system will accept logins).
WantedBy=multi-user.target
```

## Local
- create `/frontend/.env.production`. This is used solely for building the project
```conf
REACT_APP_STATIC_URL=/api
REACT_APP_API_URL=/api/v1

REACT_APP_OAUTH_CLIENT_ID=shouldMatchTheValueInBackendEnv

TSC_COMPILE_ON_ERROR=true
ESLINT_NO_DEV_ERRORS=true
```
```sh
cd frontend
npm i
npm run build
```

- sync the build output to the droplet:
```sh
rsync -qrP ./build ${SSH_TARGET}:~
ssh -t ${SSH_TARGET} '\
  sudo rm -rf /var/www/notebooks/frontend/build \
  && sudo mv build /var/www/notebooks/frontend/build
  && sudo systemctl restart notebooks-api
'
```
