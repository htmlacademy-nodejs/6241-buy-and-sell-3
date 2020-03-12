'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
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

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    description: shuffle(SENTENCES).slice(0, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_DATA_NUMBER) {
      console.error(chalk.red(`No more than ${MAX_DATA_NUMBER} ads`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (e) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
