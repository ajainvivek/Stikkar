'use strict';

function UtilsFactory($rootScope) {

  const factory = {};

  //Generate GUID
  factory.guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  //Calculate LocalStorage Space Used
  factory.localStorageSpace = function(){
      var allStrings = '';
      for(var key in window.localStorage){
          if(window.localStorage.hasOwnProperty(key)){
              allStrings += window.localStorage[key];
          }
      }
      return Math.round(allStrings ? 3 + ((allStrings.length*16)/(8*1024)) : 0);
  };

  //Reset used file storage space on $rootScope
  factory.resetUsedFileStorageSpace = function () {
    $rootScope.usedFileStorageSpace = factory.localStorageSpace();
  };

  return factory;
}

export default {
  name: 'UtilsFactory',
  fn: UtilsFactory
};