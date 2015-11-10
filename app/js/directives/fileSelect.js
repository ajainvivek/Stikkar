'use strict';

function FileSelectDirective() {
  return {
    restrict: 'A',
    scope: {
      images: "=",
      fileType: "@",
      callback: '&'
    },
    link: function ($scope,el) {
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        //Handle multiple file types
        switch($scope.fileType) {
          case "image":
            var imageType = /image.*/;
            if ($scope.file.type.match(imageType)) {
              $scope.getFile();
            } else {
              alert("Invalid " + $scope.fileType + " type!");
            }
            break;
           default:
            break; 
        }
      });
    },
    controller: function ($scope, FileReader) {
      $scope.getFile = function () {
        $scope.progress = 0;
        FileReader.readAsDataUrl($scope.file, $scope)
        .then(function(result) {
          $scope.images.push(result);
          if (typeof $scope.callback === "function") {
            $scope.callback();
          }
        });
      };
    }
  };
}

export default {
  name: 'ngFileSelect',
  fn: FileSelectDirective
};
