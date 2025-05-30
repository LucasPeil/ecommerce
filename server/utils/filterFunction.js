const stringArrayToInt = (array) => {
  const parsedIntArray = [];
  if (array?.length > 0) {
    for (let i = 0; i < array.length; i++) {
      parsedIntArray.push(...array[i].split(' - ').map((num) => parseInt(num)));
    }
  }
  return parsedIntArray;
};
const filterFunction = (filter, searchText = '') => {
  const keys = Object.keys(filter).filter((item) => filter[item].length > 0);
  let checkboxFilterQuery = {};
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
      checkboxFilterQuery[key] = { ...priceQuery };
    } else {
      checkboxFilterQuery[key] = { $in: filter[key] };
    }
  }
  // Campo de texto - gera condições para name, description, category
  let searchConditions = [];
  if (searchText) {
    const fields = ['category', 'description', 'name'];
    searchConditions = fields.map((field) => ({
      [field]: { $regex: searchText, $options: 'i' },
    }));
  }

  // Combinações finais
  const finalQuery = {};

  if (
    searchConditions.length > 0 &&
    Object.keys(checkboxFilterQuery).length > 0
  ) {
    finalQuery['$and'] = [checkboxFilterQuery, { $or: searchConditions }];
  } else if (searchConditions.length > 0) {
    finalQuery['$or'] = searchConditions;
  } else {
    Object.assign(finalQuery, checkboxFilterQuery);
  }

  return finalQuery;
};

module.exports = { filterFunction };
//Texto sempre vai ser o $
//Checkbox sempre vai ser o $and
// externo que vai ser um externo que sera and quando tiver texto e or quando nao viter
/* {$or:[{ category: "Sala"}, {description:"Sala"}, {name: "Sala"}, {$or:[{name:/Produto1/}]} ]} */
