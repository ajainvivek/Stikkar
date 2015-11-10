'use strict';

function PhotosCtrl($scope, $timeout, FileReader, CanvasFactory, ImagesFactory, UtilsFactory, AppSettings) {

	// ViewModel
	const vm = this;

	vm.images = [];
	$scope.previewImages = [];
	vm.usedSpace = UtilsFactory.localStorageSpace();

	var restoredImages = ImagesFactory.getRestoredPhotoImages(vm.images);
	vm.images = restoredImages;

	//Click Upload 
	vm.clickUpload = function () {
		if (vm.usedSpace >= AppSettings.maxStorageSpace) { //if storage exceed max app provided storage space then throw error
	      alert("Exceeded max provided localstorage space. Please empty to save.");
	    } else { //trigger upload
			$timeout(function() { //Notify $digest cycle hack
				$('#photo_upload').trigger('click');
			}, 0);
		}	
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

	//on image upload
	vm.onFileUpload = function () {
		let guid = UtilsFactory.guid();
		let image = {
			guid: guid,
			src: $scope.previewImages[0]
		};
		vm.images.push(image);
		ImagesFactory.savePhotoImage(image);
		UtilsFactory.resetUsedFileStorageSpace(); //Reset the $rootScope file storage for header data update
		$scope.previewImages = [];
	};

	//Delete Sticker
	vm.deletePhoto = function (image) {
		var index = vm.images.indexOf(image);
		vm.images.splice(index, 1);
		ImagesFactory.deletePhotoImage(image); //delete from persisted localStorage
		UtilsFactory.resetUsedFileStorageSpace(); //Reset the $rootScope file storage for header data update
	};

}

export default {
  name: 'PhotosCtrl',
  fn: PhotosCtrl
};