import { getPriceFilterLimit, getDefaultFilterValue } from '../config.js';

const getMapFilterElements = (filterForm) => ({
  type: filterForm.querySelector('#housing-type'),
  price: filterForm.querySelector('#housing-price'),
  rooms: filterForm.querySelector('#housing-rooms'),
  guests: filterForm.querySelector('#housing-guests'),
});

const priceLimits = getPriceFilterLimit();

const getCheckedFeatures = (filterForm) =>  filterForm.querySelectorAll('[name="features"]:checked');

const checkFilterItem = (elementValue, filterValue) => (filterValue === getDefaultFilterValue() || String(filterValue) === String(elementValue));

const checkPriceFilter = (elementValue, filterValue) => {
  switch (filterValue) {
    case 'any': return true;
    case 'low': return elementValue < priceLimits[filterValue].MAX;
    case 'middle': return (elementValue >= priceLimits[filterValue].MIN && elementValue < priceLimits[filterValue].MAX);
    case 'high': return elementValue >= priceLimits[filterValue].MIN;
    default: return false;
  }
};

const createCheckFiltredElement = (filterForm) => (element) => {
  const filterElements = getMapFilterElements(filterForm);
  return (
    checkFilterItem(element.offer.type, filterElements.type.value) &&
    checkPriceFilter(element.offer.price, filterElements.price.value) &&
    checkFilterItem(element.offer.rooms, filterElements.rooms.value) &&
    checkFilterItem(element.offer.guests, filterElements.guests.value));
};

const createFeatureRange = (filterForm) => (element) => {
  const selectedFeatures = getCheckedFeatures(filterForm);
  let placeFeatureRank = 0;
  selectedFeatures.forEach((feature) => {
    if (element.offer.features) {
      if (element.offer.features.includes(feature.value)) {
        placeFeatureRank += 1;
      }
    }
  });
  return placeFeatureRank;
};

const createIsFeaturesEqual = (filterForm) => (element) => {
  const selectedFeatures = getCheckedFeatures(filterForm);
  if (element.offer.features) {
    for (let i = 0; i < selectedFeatures.length; i++) {
      if (element.offer.features.indexOf(selectedFeatures[i].value) === -1) { return false; }
    }
    return true;
  }
};

const createCompareFeaturesRank = (filterForm) => {
  const getFeaturesRank = createFeatureRange(filterForm);

  return (offerA, offerB) => {
    const offerRankA = getFeaturesRank(offerA);
    const offerRankB = getFeaturesRank(offerB);
    return offerRankB - offerRankA;
  };
};

const createFilteredDataset = (filterForm) => {
  const isFeaturesEqual = createIsFeaturesEqual(filterForm);
  const filter = createCheckFiltredElement(filterForm);
  const rankFeatures = createCompareFeaturesRank(filterForm);
  return (dataset) => dataset.filter(filter).filter(isFeaturesEqual).sort(rankFeatures);
};

const resetMapFilter = (mapFilter) => {
  const changeEvent = new Event('change');
  mapFilter.reset();
  mapFilter.dispatchEvent(changeEvent);
};

export { createFilteredDataset, resetMapFilter };
