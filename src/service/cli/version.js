'use strict';

const {ExitCode} = require(`../../constants`);

const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(packageJson.version);
    process.exit(ExitCode.success);
  }
};
