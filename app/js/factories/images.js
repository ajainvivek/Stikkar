'use strict';

function ImagesFactory() {

  const factory = {};

  //Save Sticker Images  
  factory.saveStickerImage = function (sticker) {
    let stickers = localStorage.getItem("stikkar-stickers-images") ? JSON.parse(localStorage.getItem("stikkar-stickers-images")) : [];
    stickers.push(sticker);
    localStorage.setItem("stikkar-stickers-images", JSON.stringify(stickers));
  };

  //Restore Sticker Images
  factory.getRestoredStickerImages = function (arr) {
    let stickers = localStorage.getItem("stikkar-stickers-images") ? JSON.parse(localStorage.getItem("stikkar-stickers-images")) : [];
    return arr.concat(stickers);
  };

  //Delete Sticker Images
  factory.deleteStickerImage = function (sticker) {
    let stickers = localStorage.getItem("stikkar-stickers-images") ? JSON.parse(localStorage.getItem("stikkar-stickers-images")) : [];
    let index = -1;
    for (let i = 0; i < stickers.length; i++) {
      if (sticker.guid === stickers[i].guid) {
        index = i;
      }
    }
    stickers.splice(index, 1);
    localStorage.setItem("stikkar-stickers-images", JSON.stringify(stickers));
  };

  //Save Photo Images  
  factory.savePhotoImage = function (photo) {
    let photos = localStorage.getItem("stikkar-photos-images") ? JSON.parse(localStorage.getItem("stikkar-photos-images")) : [];
    photos.push(photo);
    localStorage.setItem("stikkar-photos-images", JSON.stringify(photos));
  };

  //Restore Photos Images
  factory.getRestoredPhotoImages = function (arr) {
    let photos = localStorage.getItem("stikkar-photos-images") ? JSON.parse(localStorage.getItem("stikkar-photos-images")) : [];
    return arr.concat(photos);
  };

  //Delete Photo Images
  factory.deletePhotoImage = function (photo) {
    let photos = localStorage.getItem("stikkar-photos-images") ? JSON.parse(localStorage.getItem("stikkar-photos-images")) : [];
    let index = -1;
    for (let i = 0; i < photos.length; i++) {
      if (photo.guid === photos[i].guid) {
        index = i;
      }
    }
    photos.splice(index, 1);
    localStorage.setItem("stikkar-photos-images", JSON.stringify(photos));
  };

  return factory;
}

export default {
  name: 'ImagesFactory',
  fn: ImagesFactory
};