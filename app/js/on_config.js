'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
  	url : "/",
    views : {
    	'header' : {
		    templateUrl: 'header.html'
    	},
    	'canvas' : {
		    controller: 'CanvasCtrl as canvas',
		    templateUrl: 'canvas.html',
		    title: 'Canvas'
    	},
    	'stickers' : {
    		controller: 'StickersCtrl as stickers',
		    templateUrl: 'stickers.html',
		    title: 'Stickers'
    	},
    	'photos' : {
    		controller: 'PhotosCtrl as photos',
		    templateUrl: 'photos.html',
		    title: 'Photos'
    	}
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;