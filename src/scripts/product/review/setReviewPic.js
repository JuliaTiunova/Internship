function findRandomIndex(arr) {
  let number = Math.floor(Math.random() * 100).toFixed();
  while (number > arr.length - 1) {
    number = Math.floor(Math.random() * 100).toFixed();
  }
  return number;
}

export function setReviewPic() {
  let reviewPics = [
    "../img/guitar-player.png",
    "../img/guitar-player_1.png",
    "../img/pianist.png",
    "../img/saxophonist.png",
    "../img/singer.png",
    "../img/treble-clef.png",
    "../img/bass-clef.png",
    "../img/alto-clef.png",
  ];
  let index = findRandomIndex(reviewPics);
  return reviewPics[index];
}
