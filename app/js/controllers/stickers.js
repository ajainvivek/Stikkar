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

}

export default {
  name: 'StickersCtrl',
  fn: StickersCtrl
};