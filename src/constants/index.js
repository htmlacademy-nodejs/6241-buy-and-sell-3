'use strict';

const DEFAULT_COMMAND = `--help`;

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;

const FILE_TITLES_PATH = `./data/titles.txt`;

const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const USER_ARGV_INDEX = 2;

const MAX_DATA_NUMBER = 1000;

const ExitCode = {
  success: 0,
  error: 1,
};

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 0,
  max: 16,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  USER_ARGV_INDEX,
  MAX_DATA_NUMBER,
  ExitCode,
  OfferType,
  SumRestrict,
  PictureRestrict
};
