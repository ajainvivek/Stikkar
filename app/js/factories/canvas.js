'use strict';

function CanvasFactory() {

  const factory = {};

  factory.canvas = {};

  //Once DOM is loaded instantiate canvas
  angular.element(document).ready(function () {
      factory.canvas = new fabric.Canvas("play_board");
  });

  //getter for canvas
  factory.getCanvas = function() {
    return this.canvas;
  };

  return factory;
}

export default {
  name: 'CanvasFactory',
  fn: CanvasFactory
};