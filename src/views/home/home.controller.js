import routes from '../routes.js';

const getHome = (req, res) => {
  res.render('home/home', {
    message: 'Hello World!',
    isAuthenticated: req.oidc.isAuthenticated()
  });
};

export default (app) => {
  app.route(routes.HOME).get(getHome);
};
