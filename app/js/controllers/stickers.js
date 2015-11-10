'use strict';

function StickersCtrl($scope, CanvasFactory, ngDialog, $timeout, ngDragDrop) {

  // ViewModel
  const vm = this;


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
  }];

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
      src : imgSrc
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
  };

  //callback function once file is uploaded
  vm.onFileUpload = function () {
    vm.uploaded = true;
  };

  //submit sticker
  vm.submitSticker = function (form) {
    let sticker = {
      src : $scope.previewImages[0],
      title : vm.title,
      isUserUploaded: true
    };

    if (form.$valid) { //if form is valid perform action
      form.$setPristine();
      form.$setUntouched();
      vm.uploaded = false;
      vm.images.push(sticker);
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
    ngDialog.open({
        template: 'stickerDialog.html',
        closeByDocument: false,
        closeByEscape: false,
        scope: $scope
    });
  };

  //Add Image to Canvas Area
  vm.dropImage = function (obj, $event) {
    let canvas = CanvasFactory.getCanvas();
    fabric.Image.fromURL(obj.src, function(oImg) {
      canvas.add(oImg);
    });
  };

}

export default {
  name: 'StickersCtrl',
  fn: StickersCtrl
};