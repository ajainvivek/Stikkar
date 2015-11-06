'use strict';

function PhotosCtrl($scope, $timeout, FileReader, CanvasFactory) {

	// ViewModel
	const vm = this;

	$scope.images = [];

	//Click Upload 
	vm.clickUpload = function () {
		$timeout(function() { //Notify $digest cycle hack
			$('#photo_upload').trigger('click');
		}, 0);
	};

	//Add Image to Canvas Area
	vm.dropImage = function (image, $event) {
		let canvas = CanvasFactory.getCanvas();
		fabric.Image.fromURL(image, function(oImg) {
			CanvasFactory.incrementPhotos();	
			canvas.add(oImg);
			CanvasFactory.bringForwardFromBottom(oImg, CanvasFactory.photosCount);
		});
	};


}

export default {
  name: 'PhotosCtrl',
  fn: PhotosCtrl
};