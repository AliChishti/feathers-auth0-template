# egg-farm-portal

> 

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/project
    npm install
    ```

3. Start your app

    ```
    npm run migrate # Run migrations to set up the database
    npm start
    ```

## Database Setup (for MacOS)

1. Install homebrew
2. Update brew
    ```sh
    brew update
    ```
3. Install postgres
    ```sh
    brew install postgresql
    ```
4. Use the command as follows to start running the service.
    ```sh
    brew services start postgresql
    ```
5. Run the following command to configure the postgres database server
    ```sh
    psql postgres
    ```
6. Run the following commands to setup database on psql (Press enter after every command):
    ```sql
    CREATE ROLE postgres WITH LOGIN PASSWORD 'password';
    ```
    ```sql
    ALTER ROLE postgres superuser;
    ```
    ```sh
    \q
    ```
    ```sh
    psql postgres -U postgres;
    ```
    ```sql
    CREATE DATABASE db_name;
    ```
7. Set up the connection on any database client such as pgAdmin or DBeaver etc using the following configuration:
    ```
    database = db_name
    username = postgres
    password = password
    ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

### Folder Structure Guidelines

1. `src/views`:
    - Every route should be added to `routes.js`.
    - Every subfolder should handle only one route and its subroutes for example `/profile` will be handled by `profile` subfolder.
    - Every subfolder can have at most these two files: `*.controller.js` and `*.handlebars`.
    - Every route should be registered in `index.js`.

## Authentication

The project uses `Auth0` for all authentication and authorization purposes.
- Use `/login` route to login.
- Use `/logout` route to logout.
- Use `req.oidc.isAuthenticated()` to check if the user is authenticated.
- Use `req.oidc.user` to fetch the details of logged in user. 
- Use `requiresAuth()` from `express-oidc-connect` package as middleware to protect routes. (Example: `src/views/profile`).

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
