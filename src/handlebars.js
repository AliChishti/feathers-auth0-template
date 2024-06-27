import handlebars from 'handlebars';
import exphbs from 'express-handlebars';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2);
        case '===':
            return (v1 === v2);
        case '!=':
            return (v1 != v2);
        case '!==':
            return (v1 !== v2);
        case '<':
            return (v1 < v2);
        case '<=':
            return (v1 <= v2);
        case '>':
            return (v1 > v2);
        case '>=':
            return (v1 >= v2);
        case '&&':
            return (v1 && v2);
        case '||':
            return (v1 || v2);
        default:
            return true; // Default to true
    }
});

export default (app) => {
  app.engine('handlebars', exphbs.engine({ handlebars: handlebars }));
  app.set('view engine', 'handlebars');
  app.set('views', __dirname + '/views');
}
