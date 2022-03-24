
## Description

Person API Take home

## Installation

```bash
$ yarn
$ cp sample.env .env  

```

ENSURE database credentials are accurate for your system

```bash
$ npx prisma migrate dev
```


## Running the app

```bash
$ yarn start

```

## Postman

Postman Collection available in root directory:

PersonAPI.postman_collection.json

## Routes

```bash
get /personVersioned
requires: id and version (numbers)

get /personById
requires: id (number)

post /person
requires: firstName, lastName, email (strings)
optional: address string

delete /person
requires: id (number)

put /person
requires: id (number)
optional: firstName, lastName, email (strings)

```

## Swagger Documentation

```http
localhost:3001

```
