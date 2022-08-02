# Storefront Backend Project

## Description

A simple backend for a store.

## Preconditions / System Requirements

- node.js is installed
- Docker is installed and running

## Getting Started

- Clone the repository
- Create `.env` file in the root directory of the project (you can use `.env.sample` as a template, here you can also set the ports for the server and the database)
- Run `npm install` to install all dependencies
- Run `npm run db` to create and run docker container for the database (postgres)
- Run `npm run migrate-up` to create the database tables
- Run `npm start` to start the server
- Run `npm test` to run the tests

You can find the information about **API endpoints**, **data shapes** and **database schema** in the `REQUIREMENTS.md` file.

## Technologies

This application takes advantage of the following libraries, among others:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- bcrypt from npm for hashing passwords
- jest from npm for testing
