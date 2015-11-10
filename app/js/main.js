'use strict';

import $ from 'jquery';
import fabric from 'fabric';
import angular from 'angular';

// angular modules
import 'ng-file-upload';
import 'ng-dialog';
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
import './factories';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.factories',
  'app.directives',
  'ngFileUpload',
  'ngDialog',
  'ngDragDrop'
];

// mount on window for testing
window.app = angular.module('app', requires);
window.$ = $;

angular.module('app').constant('AppSettings', require('./constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app']);
