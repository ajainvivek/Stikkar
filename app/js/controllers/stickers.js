'use strict';

function StickersCtrl(CanvasFactory) {

  // ViewModel
  const vm = this;

  vm.images = [{
  	title: "Gulp",
  	src: "images/gulp.png"
  }, {
  	title: "Angular",
  	src:  "images/angular.png"
  }, {
  	title: "Browserify",
  	src: "images/browserify.png"
  }];

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