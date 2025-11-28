const formatPriceFilter = (array) => {
  const parsedIntArray = [];

  if (array?.length > 0) {
    for (let i = 0; i < array.length; i++) {
      const pricesRange = array[i].split(' - ');

      parsedIntArray.push({
        price: {
          $gte: parseInt(pricesRange[0]),
          $lte: parseInt(pricesRange[1]),
        },
      });
    }
  }
  return parsedIntArray;
};
const filterFunction = (filter, searchText = '') => {
  const keys = Object.keys(filter).filter((item) => filter[item].length > 0);
  let checkboxFilterQuery = {};
  const priceFilter = formatPriceFilter(filter.price);

  for (let key of keys) {
    if (key === 'price') {
      checkboxFilterQuery['$or'] = priceFilter;
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
