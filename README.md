# Secret Charts

## Development

You will need to create a `.env` file to connect to the correct website. See `.envexample`.

Run `npm install` to install node modules.

Run `docker compose up` for MongoDB.

Run `npm start` to start locally.

Run `npm run server` on a new terminal to start node server.

You can also run `./server.js`.

Create image folder. For example `C:\images`, which you can use for local dev without running datjuanitagurl in Docker.

## Docker Build

You can also build the Docker image. For example, run `docker build . -t datjuanitagurl/secret-charts` to build the image. Then run `docker run --env-file ./.env datjuanitagurl/secret-charts:latest` to run it. You need to use `http://host.docker.internal:<port>` to access your local machine's localhost from within the container if you are testing a website on your local machine's localhost.

Make sure create a volume mount to the image folder location in docker-compose.
