# `Project breaking bad API`

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


# User Instructions

### Example paths

```
curl http://localhost/1 -- for one
curl http://localhost:3000/?sesson=5&name=Walter%20White&portrayed=Bryan%20Cranston -- for list

```


### Requirements

In order to run this project you will need to install the LTS version of Node, found at [this link](https://nodejs.org/en/download/)

### How to run the server

First of all, run follow command below to install project's dependencies 

```bash
npm install
```

Second step, you can run the server with the following commands:

```bash
npm run start:local
```

# Architecture

The system is structured in different logic layers that have specific responssabilities, highly increasing [cohesion](<https://en.wikipedia.org/wiki/Cohesion_(computer_science)#:~:text=In%20computer%20programming%2C%20cohesion%20refers,inside%20a%20module%20belong%20together.&text=In%20contrast%2C%20low%20cohesion%20is,with%20coupling%2C%20a%20different%20concept.>).
The main goal of this architecture is to provide easy ways of unit testing it's components.
This by itself is responsible for granting the system a lot of qualities in terms of decoupling and manuntenability.

### Input Validation Layer

We are going to validate input through the use of `class-validator` anotations, and middlewares.

Every input shall be represented on request and response package annotated with validation decorators.

Including Http request's body, query and url params.

> A Proof of Concept will be created to test the idea of creating a middleware per controler method, by doing this we will be able to test url params without creating a validation class

### REST API Layer ( Presentation Layer )

In this layer we are going to use _controllers_ to:

- Handle HTTP requests and translate them into data structures that a service can understand.
- Return a response in the appropriate format

Controllers can throw errors directly, they don't need to craft error responses due to the existence of a exception layer.

Every controller has a `.controller.ts` sufix

### Service Layer ( Business Logic Layer )

All business logic is done inside services.

This is the most decoupled layer of the system, as our priority lies in testing this business logic layer to ensure no bugs are present on them.

Services have access to all other services through dependency injection.

Some considerations about services are:

- Services can assume that the input types are correct since they are going to be validated before entering the service
- Every business logic validation that fails or problem that arises should throw an Error directly ( services should not return error objects )

Every service has a `.service.ts` sufix

### Repository Layer

We use this layer to abstract persistent-data access ( in our case, database access ) in such a way that we can mock or replace this layer easily.

We will be using the Repository pattern to do this.

Every repository has a `.repository.ts` sufix

### Exception Layer

We respond to exceptions based on different error codes or exception types that are thrown.

We may define which httpStatus codes we return along with some static data based on what kind of error was thrown.

They should all be classes that extends the `BaseError ` class.

### Persistence Layer

We are going to use `type-orm` to even further abstract the database access in such a way that it's easy to define models and create queries.

Every entity has a `.entity.ts` sufix

