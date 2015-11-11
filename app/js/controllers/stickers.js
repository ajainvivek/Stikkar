'use strict';

function StickersCtrl($scope, CanvasFactory, ngDialog, $timeout, ngDragDrop, ImagesFactory, UtilsFactory, AppSettings) {

  // ViewModel
  const vm = this;

  //Images are hardcoded [TODO] Move to Service Layer
  vm.images = [{
  	title: "Gulp",
  	src: "images/gulp.png",
    isUserUploaded: false
  }, {
  	title: "Angular",
  	src:  "images/angular.png",
    isUserUploaded: false
  }, {
  	title: "Browserify",
  	src: "images/browserify.png",
    isUserUploaded: false
  }, {
    title: "FabricJS",
    src: "images/fabricjs.png",
    isUserUploaded: false
  }, {
    title: "Beard Face",
    src: "images/moustache/beard_PNG6256.png",
    isUserUploaded: false
  }, {
    title: "Beard Half Face",
    src: "images/moustache/beard_PNG6258.png",
    isUserUploaded: false
  }, {
    title: "Moustache",
    src: "images/moustache/beard_PNG6268.png",
    isUserUploaded: false
  }];

  vm.usedSpace = UtilsFactory.localStorageSpace();

  //Restore Stored Stickers
  let stickersImgs = ImagesFactory.getRestoredStickerImages(vm.images);
  vm.images = stickersImgs;

  vm.uploaded = false;
  vm.title = "";
  $scope.previewImages = [];

  //Drag & Drop Styles
  vm.styles = {
    draggables : {
      onDragging : {border: "1px dashed #000", cursor : "move"},
      onStart : {opacity: 0.5}
    },
    droppables : {
      onEnter: {border: "1px dashed #2DA43E"},
      onLeave: {border: ""}
    }
  };

  //Drag Drop Events Callbacks 
  vm.dragCallback = function (event) {
    console.log("Dragging", event);
  };

  vm.dropCallback = function (event) {
    var currDragElem = ngDragDrop.getCurrentDragElement();
    var imgSrc = currDragElem.attr("src");
    var object = {
      src : imgSrc,
      drop : true
    };
    vm.dropImage(object, event);
    console.log("Dropped", event);
  };

  vm.overCallback = function (event) {
    console.log("Drag Over", event);
  };

  //Delete Sticker
  vm.deleteSticker = function (image) {
    var index = vm.images.indexOf(image);
    vm.images.splice(index, 1);
    ImagesFactory.deleteStickerImage(image); //delete from persisted localStorage
    UtilsFactory.resetUsedFileStorageSpace(); //Reset the $rootScope file storage for header data update
  };

  //callback function once file is uploaded
  vm.onFileUpload = function () {
    vm.uploaded = true;
  };

  //submit sticker
  vm.submitSticker = function (form) {
    let guid = UtilsFactory.guid(); 
    let sticker = {
      src : $scope.previewImages[0],
      title : vm.title,
      isUserUploaded: true,
      guid : guid
    };

    if (form.$valid && $scope.previewImages.length) { //if form is valid perform action
      form.$setPristine();
      form.$setUntouched();
      vm.uploaded = false;
      vm.images.push(sticker);
      ImagesFactory.saveStickerImage(sticker); //Persist Sticker Image
      UtilsFactory.resetUsedFileStorageSpace(); //Reset the $rootScope file storage for header data update
      $scope.previewImages = []; //Reset the images 
      ngDialog.close();
    }
    
  };

  //upload sticker
  vm.uploadSticker = function () {
    $timeout(function() { //Notify $digest cycle hack
      $('#sticker_upload').trigger('click');
    }, 0);
  };

  //open upload dialog
  vm.openUploadDialog = function () {
    if (vm.usedSpace >= AppSettings.maxStorageSpace) { //if storage exceed max app provided storage space then throw error
      alert("Exceeded max provided localstorage space. Please empty to save.");
    } else { //open dialog to save
      ngDialog.open({
          template: 'stickerDialog.html',
          closeByDocument: false,
          closeByEscape: false,
          scope: $scope
      });
    } 
  };

  //Add Image to Canvas Area
  vm.dropImage = function (obj, $event) {
    let canvas = CanvasFactory.getCanvas();
    let PosX, PosY;
    if (obj.drop === true) {
      PosX = $event.clientX - $event.currentTarget.offsetLeft - 50;
      PosY = $event.clientY - $event.currentTarget.offsetTop - 54; //offset height of header
    }
    fabric.Image.fromURL(obj.src, function(oImg) {
      if (obj.drop === true) {
        oImg.set('left', PosX).set('top',PosY);
      }
      canvas.add(oImg);
    });
  };

}

export default {
  name: 'StickersCtrl',
  fn: StickersCtrl
};