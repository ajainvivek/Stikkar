'use strict';

function PhotosCtrl() {

  // ViewModel
  const vm = this;

  vm.images = ["images/gulp.png", "images/angular.png", "images/browserify.png"];

}

export default {
  name: 'PhotosCtrl',
  fn: PhotosCtrl
};