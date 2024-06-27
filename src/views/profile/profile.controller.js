import expressOid from 'express-openid-connect';
import routes from '../routes.js';


const getProfile = (req, res) => {
  res.json(req.oidc.user);
};

export default (app) => {
  app.route(routes.PROFILE).get(expressOid.requiresAuth(), getProfile);
};
