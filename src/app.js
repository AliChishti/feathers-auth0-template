// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers';
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import socketio from '@feathersjs/socketio';
import { auth } from 'express-openid-connect';

import { logger } from './logger.js';
import { logError } from './hooks/log-error.js';
import { postgresql } from './postgresql.js';

import { services } from './services/index.js';
import { channels } from './channels.js';
import handlebars from './handlebars.js';
import views from './views/index.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// Get the directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(feathers());

// Load app configuration
app.configure(configuration());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  '/public/app',
  express.static(path.join(__dirname, app.get("public"), "/app"), {
    maxAge: app.get('assets').app.maxAge
  })
);

app.use(
  '/public/deps',
  express.static(path.join(__dirname, app.get("public") + "/deps"), {
    maxAge: app.get('assets').app.maxAge
  })
);

app.use(
  '/public/vendor',
  express.static(path.join(__dirname, app.get("public") + "/deps"), {
    maxAge: app.get('assets').deps.maxAge
  })
);

// Configure services and real-time functionality
app.configure(rest());
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
);
app.configure(postgresql);

app.configure(services);
app.configure(channels);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(app.get('auth0')));

app.configure(handlebars);

app.configure(views);

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(errorHandler({ logger }));

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
});
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
});

export { app };
