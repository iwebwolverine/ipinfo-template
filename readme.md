## Installation

```
git clone repository
cd ./repository
docker compose up --build
```

For migrations connect to docker container and call command

```
npm run migrate
```

## Specs

```
npm run test
```

## API

http://localhost:8000

```
GET /api/v1/proxies/:ip/info
```
