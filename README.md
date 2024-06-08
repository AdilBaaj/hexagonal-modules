## Installation

```bash
$ pnpm install
```

## Dev dependencies

```bash
docker compose -f docker-compose.dependencies.yml up
```

## Seed database

```bash
# development
$ pnpm db:seed
```

## Running the app

```bash
# development
$ pnpm start:dev

# production
$ pnpm start:prod
```

## Create new migration

```bash
$ pnpm migration:create
```

## Delete migration

```bash
$ pnpm migration:drop
```

## Prototype / Push

```bash
# development
$ pnpm db:push:local

# production
$ pnpm db:push:prod
```

## Introspect / Pull database

```bash
# development
$ pnpm db:introspect:local

# production
$ pnpm db:introspect:prod
```
