'use strict';

function CanvasCtrl($scope, $rootScope, CanvasFactory, $timeout) {

  // ViewModel
  const vm = this;

  vm.isObjectSelected = false;

  //on object selection
  $rootScope.$on("objectSelected", function () {
  	$timeout(function () {
  		vm.isObjectSelected = true;
  	}, 0);
  });

  //on object cleared
  $rootScope.$on("objectCleared", function () {
  	$timeout(function () {
  		vm.isObjectSelected = false;
  	}, 0);
  });

  //delete selected object
  vm.deleteSelectedObject = function () {
  	let canvas = CanvasFactory.getCanvas();
  	let activeObject = canvas.getActiveObject();
  	canvas.remove(activeObject);
  };

  //add text
  vm.addText = function () {
  	let canvas = CanvasFactory.getCanvas();
  	let text = "Sample Text";
    let fontColor = "#000";
    let fontFamily = "Allerta+Stencil";
    let textSample = new fabric.IText(text, {
        left: fabric.util.getRandomInt(10, 100),
        top: fabric.util.getRandomInt(10, 200),
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#000000',
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: '',
        hasRotatingPoint: true
    });
    canvas.add(textSample);
    canvas.item(canvas.item.length - 1).hasRotatingPoint = true;
    canvas.setActiveObject(textSample);
  };

  //paint the canvas
  vm.paintBrush = function () {
  	alert("Sorry :( not yet implemented...");
  };

  //reset the board
  vm.resetBoard = function () {
  	let canvas = CanvasFactory.getCanvas();
  	canvas.clear();
  };
}

export default {
  name: 'CanvasCtrl',
  fn: CanvasCtrl
};