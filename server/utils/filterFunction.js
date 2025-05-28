const filterFunction = (filter, textSearch = false) => {
  const keys = Object.keys(filter).filter((item) => filter[item].length > 0);

  const operator = textSearch ? '$and' : '$or';
  let filterQuery = {};
  let priceQuery = {};
  if (filter.price?.length > 0) {
    let parsedIntArray = stringArrayToInt(filter.price);
    for (let i = 0; i < parsedIntArray.length; i += 2) {
      if (parsedIntArray[i] == Math.max(parsedIntArray)) {
        // se for o maior, não há com o que ser menor, pois é o ultimo valor
        priceQuery = { $gte: parsedIntArray[i] };
      } else {
        priceQuery = {
          $gte: Math.min(...parsedIntArray),
          $lte: Math.max(...parsedIntArray),
        };
      }
    }
  }

  for (let key of keys) {
    if (key === 'price') {
      filterQuery[key] = priceQuery;
    } else {
      filterQuery[key] = { $in: filter[key] };
    }
  }
  const filterResult = { [operator]: [filterQuery] };

  return filterResult;
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
