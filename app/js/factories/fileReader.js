'use strict';

/**
* Credits for refernce plunk - http://plnkr.co/edit/y5n16v?p=preview
**/

function FileReaderFactory($q) {

  const factory = {};

  let onLoad = function(reader, deferred, scope) {
      return function () {
          scope.$apply(function () {
              deferred.resolve(reader.result);
          });
      };
  };

  let onError = function (reader, deferred, scope) {
      return function () {
          scope.$apply(function () {
              deferred.reject(reader.result);
          });
      };
  };

  let onProgress = function(reader, scope) {
      return function (event) {
          scope.$broadcast("fileProgress", {
              total: event.total,
              loaded: event.loaded
          });
      };
  };

  let getReader = function(deferred, scope) {
      let reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
  };



  factory.readAsDataUrl = function (file, scope) {
      let deferred = $q.defer();
       
      let reader = getReader(deferred, scope);         
      reader.readAsDataURL(file);
       
      return deferred.promise;
  };

  return factory;
}

export default {
  name: 'FileReader',
  fn: FileReaderFactory
};