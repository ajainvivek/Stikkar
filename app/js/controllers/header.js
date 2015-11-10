'use strict';

function HeaderCtrl($scope, CanvasFactory, ngDialog, $rootScope, $timeout) {

  // ViewModel
  const vm = this;

  vm.name = "";
  vm.isEdited = false;

  var getCanvasObjects = function () {
  	let canvas = CanvasFactory.getCanvas();
  	return canvas.getObjects();
  }

  var download = function (url, name) {
  	angular.element('<a>').attr({href:url,download:name})[0].click();
  }

  var exportAs = function (name) {
  	let canvas = CanvasFactory.getCanvas();
  	download(canvas.toDataURL(), name+'.png');
  }

  //Listener for object added
  $rootScope.$on('objectAdded', function (e) {
  	$timeout(function () { //trigger digest cycle
  		vm.isEdited = true;
  	}, 0);
  });

  //Listener for object removed
  $rootScope.$on('objectRemoved', function (e) {
  	let objects = getCanvasObjects();
  	if (objects.length === 0) {
  		$timeout(function () { //trigger digest cycle
	  		vm.isEdited = false;
	  	}, 0);
  	}
  });

  //Export API
  vm.export = function (name, form) {
  	if (form.$valid) { //if form is valid perform action
		exportAs(name);
		form.$setPristine();
		form.$setUntouched();
		vm.name = ""; //Reset the name
		ngDialog.close();
	}	
  };

  //open download dialog
  vm.openDownloadDialog = function () {
  	let objects = getCanvasObjects();
  	if (objects.length !== 0) {
  		ngDialog.open({
	        template: 'downloadDialog.html',
	        closeByDocument: true,
	        closeByEscape: true,
	        scope: $scope
	    });
  	} else {
  		alert("Nothing on sticker board!!");
  	}
    
  };

}

export default {
  name: 'HeaderCtrl',
  fn: HeaderCtrl
};