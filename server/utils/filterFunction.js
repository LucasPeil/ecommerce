const filterFunction = (filter, textSearch = false) => {
  const keys = Object.keys(filter);
  const operator = textSearch ? '$and' : '$or';
  let filterQuery = {};
  let priceQuery = [];
  if (filter.prices?.length > 0) {
    let parsedIntArray = stringArrayToInt(filter.prices);
    for (let i = 0; i < parsedIntArray.length; i += 2) {
      if (i == parsedIntArray.length - 1) {
        // se for o último, não há com o que ser menor, pois é o ultimo valor
        priceQuery.push({ $gte: parsedIntArray[i] });
      } else {
        priceQuery.push({
          $gte: parsedIntArray[i],
          $lte: parsedIntArray[i + 1],
        });
      }
    }
  }
  console.log(priceQuery);
  for (let key of keys) {
    if (key === 'prices') {
    } else {
      filterQuery[key] = { $in: filter[key] };
    }
  }
  const filterResult = { [operator]: [filterQuery] };
  //console.log(filterResult);
};

const stringArrayToInt = (array) => {
  const parsedIntArray = [];
  if (array?.length > 0) {
    for (let i = 0; i < array.length; i++) {
      parsedIntArray.push(...array[i].split(' - ').map((num) => parseInt(num)));
    }
  }
  return parsedIntArray;
};

module.exports = { filterFunction };

/* {$or:[{category:{$in:["Quarto", "Cozinha"]}}], $and:[{price:{$gte:100}}]} */
