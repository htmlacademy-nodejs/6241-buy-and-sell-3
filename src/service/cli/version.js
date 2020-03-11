'use strict';

const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);

const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJson.version));
    process.exit(ExitCode.success);
  }
};
