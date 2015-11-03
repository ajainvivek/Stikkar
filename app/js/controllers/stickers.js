'use strict';

function StickersCtrl() {

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

  

  vm.dropImage = function (obj, $event) {
    var canvas = new fabric.Canvas('play_board');
    fabric.Image.fromURL(obj.src, function(oImg) {
      canvas.add(oImg);
    });
  };

}

export default {
  name: 'StickersCtrl',
  fn: StickersCtrl
};