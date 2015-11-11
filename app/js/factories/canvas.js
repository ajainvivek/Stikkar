'use strict';

function CanvasFactory($rootScope) {

  const factory = {};

  factory.canvas = {};
  factory.stickersCount = 0;
  factory.photosCount = 0;

  //Once DOM is loaded instantiate canvas
  angular.element(document).ready(function () {
      factory.canvas = new fabric.Canvas("play_board");

      //Event Listeners for canvas
      factory.canvas.on({
          'object:moving': function(e) {
            $rootScope.$broadcast('objectMoving', e);
          },
          'object:selected': function (e) {
            $rootScope.$broadcast('objectSelected', e);
          }, 
          'selection:cleared': function (e) {
            $rootScope.$broadcast('objectCleared', e);
          },
          'object:modified': function(e) {
            $rootScope.$broadcast('objectModified', e);
          },
          'object:added': function(e) {
            $rootScope.$broadcast('objectAdded', e);
          },
          'object:removed': function(e) {
            $rootScope.$broadcast('objectRemoved', e);
          },
          'path:created': function(e) {
            $rootScope.$broadcast('pathCreated', e);
          }
      });

      factory.restoreCanvas();

  });

  //Save Canvas State
  factory.saveCanvas = function (canvas) {
    canvas.deactivateAll();
    canvas.deactivateAllWithDispatch();
    let obj = {
      data: JSON.stringify(canvas),
      count: {
        photos: factory.photosCount,
        stickers: factory.stickersCount
      }
    };
    localStorage.setItem('stikkar-save-canvas-state', "");
    localStorage.setItem('stikkar-save-canvas-state', JSON.stringify(obj));
  };

  //Restore Canvas State
  factory.restoreCanvas = function () {
    let canvas = factory.canvas;
    let stickerSavedState = localStorage.getItem('stikkar-save-canvas-state') ? JSON.parse(localStorage.getItem('stikkar-save-canvas-state')) : {};
    let editedData = stickerSavedState.data ? stickerSavedState.data : {};
    canvas.clear();
    canvas.loadFromJSON(editedData, canvas.renderAll.bind(canvas));
    factory.photosCount = stickerSavedState.count ? stickerSavedState.count.photos : 0;
    factory.stickersCount = stickerSavedState.count ? stickerSavedState.count.stickers : 0;
  };

  //getter for canvas
  factory.getCanvas = function() {
    return this.canvas;
  };

  //increment stickers count
  factory.incrementStickers = function () {
    factory.stickersCount++;
  };

  //decrement stickers count
  factory.decrementStickers = function () {
    factory.stickersCount--;
  };

  //increment photos count
  factory.incrementPhotos = function () {
    factory.photosCount++;
  };

  //decrement stickers count
  factory.decrementPhotos = function () {
    factory.photosCount--;
  };

  //factory push to respective index
  factory.bringForwardFromBottom = function (obj, index) {
    factory.canvas.sendToBack(obj);
    for (let i = 1; i < index; i++) {
      factory.canvas.bringForward(obj, false);
    }
  };

  return factory;
}

export default {
  name: 'CanvasFactory',
  fn: CanvasFactory
};