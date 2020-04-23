'use strict';

const DEFAULT_COMMAND = `--help`;

const DEFAULT_COUNT = 1;

const DEFAULT_PORT = 3000;

const DEFAULT_SERVER_PORT = 8080;

const PUBLIC_DIR = `public`;

const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;

const FILE_TITLES_PATH = `./data/titles.txt`;

const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const FILE_COMMENTS_PATH = `./data/comments.txt`;

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

const CommentsRestrict = {
  min: 0,
  max: 20,
};

const HttpCode = {
  OK: 200,
  OK_CREATED: 201,
  OK_NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  DEFAULT_SERVER_PORT,
  PUBLIC_DIR,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  USER_ARGV_INDEX,
  MAX_DATA_NUMBER,
  ExitCode,
  OfferType,
  SumRestrict,
  PictureRestrict,
  CommentsRestrict,
  HttpCode
};
