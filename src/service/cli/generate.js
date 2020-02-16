'use strict';
const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {
  SumRestrict,
  OfferType,
  PictureRestrict,
  ExitCode,
  FILE_NAME,
  DEFAULT_COUNT,
  MAX_DATA_NUMBER,
} = require(`../../constants`);
const {
  titles: TITLES,
  categories: CATEGORIES,
  sentences: SENTENCES
} = require(`../../constants/data.json`);

const getPictureFileName = (count) => `item${count}.jpg`;

const getCategoriesNames = (library, number) => {
  const arr = (new Array(number)).fill(undefined);
  const maximum = library.length - 1;

  const getCategoryName = () => {
    const newItem = library[getRandomInt(0, maximum)];
    if (arr.includes(newItem)) {
      return getCategoryName();
    }
    return newItem;
  };

  arr.forEach((cur, index) => {
    arr[index] = getCategoryName();
  });
  return arr;
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: getCategoriesNames(CATEGORIES, getRandomInt(1, CATEGORIES.length)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_DATA_NUMBER) {
      console.error(`No more than ${MAX_DATA_NUMBER} ads`);
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  }
};
