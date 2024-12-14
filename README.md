# NodeJS App with Express, Typescript, Docker, TypeORM and Jest

## Description
Service that simulates a robot moving in an office space and will be cleaning the places this robot visits. The path of the robot's movement is described by the starting coordinates and move commands. After the cleaning has been done, the robot reports the number of unique places cleaned. The service will store the results into the database and return the created record in JSON format. The service listens to HTTP protocol on port 5000.

Request method: `POST`

Request path: `/clean`

Input criteria:
- 0 ≤ number of commands elements ≤ 10000
- −100 000 ≤ x ≤ 100 000, x ∈ Z
- −100 000 ≤ y ≤ 100 000, y ∈ Z
- direction ∈ {north, east, south, west}
- 0 < steps < 100000, steps ∈ Z

Request body example:
```json
{
    "start": {
        "x": 10,
        "y": 22
    },
    "commands": [
        {
            "direction": "east",
            "steps": 2
        },
        {
            "direction": "north",
            "steps": 1
        }
    ]
}
```
The resulting value will be stored in a table named **executions** together with a timestamp of insertion, number of command elements and duration of the calculation in seconds.

Stored record example:

| ID   | Timestamp                  | Commands | Result| Duration |
| ---- | -------------------------- | -------- | ----- | -------- |
| 1234 | 2018-05-12 12:45:10.851596 | 2        | 4     | 0.000123 |

## Technologies
The major technologies that were used to build this project are:

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/)
- [Express Status Monitor](https://github.com/RafalWilinski/express-status-monitor)
- [k6](https://grafana.com/docs/k6/latest/)

## Getting Started
Instructions to get the project up and running.

### Prerequisites
To run this project you will need the following dependencies

- NodeJS
- NPM
- Docker

### Environment Configuration
- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

### Development mode
Run
```
npm i
docker compose up
npm run dev
```

This will:
- install all project dependencies
- start Express server in development mode (which will restart upon any code change)
- create a PostgreSQL database server
- provide a database investigation tool named Adminer which can be accessed from http://localhost:8080

### Production mode
Run

`docker compose --profile production up`

This will create a docker container for the app and a PostgreSQL database server.

## Troubleshooting:

1. If you’re developing on a Mac, port 5000 might already be in use. The process running on this port turns out to be an AirPlay server. You can deactivate it in `System Preferences › Sharing` and uncheck AirPlay Receiver to release port 5000 or change the port in your `.env` file with something other than 5000.

2. If you receive this error
```
Error: Cannot find module @rollup/rollup-linux-arm64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828).
```
You can solve it by removing both `package-lock.json` and `node_modules` directory and run again `npm i`.

## App monitoring and load testing
### Metrics
You can use `/status` route to see realtime server metrics for the API.

![monitoring](https://github.com/user-attachments/assets/fe7d2081-b214-4178-9cb6-e87cb8a6c13d)

### Load testing
First [install](https://grafana.com/docs/k6/latest/set-up/install-k6/#install-k6) k6 locally.

You can run a stress test using the following command:
```
k6 run ./load-testing/api-test.js
```
![stress-test](https://github.com/user-attachments/assets/9e34aaf3-502e-4c4f-9e60-f4cf5794e141)
