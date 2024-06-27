import homeController from './home/home.controller.js';
import profileController from './profile/profile.controller.js';

export default (app) => {
  app.configure(homeController);
  app.configure(profileController)
};
