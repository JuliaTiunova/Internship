export function countRatings(newSet) {
  let ratings = newSet.map((item) => {
    return item.rating;
  });
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }
  ratings = sum / ratings.length;

  return ratings;
}
