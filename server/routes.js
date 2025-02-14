'use strict';

var config = require('./config/environment');
var bodyParser = require('body-parser');
var RESTful = require('./interface/RESTful_api.js');

module.exports = function (app) {

  // API
  app.use('/api/reg', require('./api/reg'));
  app.use('/api/main-dashboards', require('./api/main-dashboard'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/users', require('./api/user'));

  // Auth
  app.use('/auth', require('./auth'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  /*app.route('/reg')
      .get(RESTful.process_MXviewRegisterData)
      .post(RESTful.process_MXviewRegisterData);*/

  app.route('/getNetworkStatus')
    .get(RESTful.process_NetworkStatusData)
    .post(RESTful.process_NetworkStatusData);

  app.route('/*')
    .get(function (req, res) {
      console.log('redirect to home');

      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });


};
