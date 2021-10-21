export function countRatings(newSet) {
  let ratings = newSet.map((item) => {
    return item.rating;
  });
  let sum = 0;
  let zeros = 0;
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] !== 0) {
      sum += ratings[i];
    } else {
      zeros += 1;
    }
  }
  ratings = sum / (ratings.length - zeros);

  return ratings;
}
