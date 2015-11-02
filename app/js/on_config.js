'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
  	url : "/",
    views : {
    	'canvas' : {
		    controller: 'ExampleCtrl as home',
		    templateUrl: 'home.html',
		    title: 'Home'
    	},
    	'header' : {
		    templateUrl: 'header.html'
    	}
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;