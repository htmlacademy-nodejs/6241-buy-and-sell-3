'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME} = require(`../../constants`);
const apiRoutes = require(`./routes/api`);

const app = express();
app.use(express.json());
app.use(`/api`, apiRoutes);

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number(customPort, 10) || DEFAULT_PORT;

    let mock = [];
    try {
      const fileContent = await fs.readFile(FILE_NAME);
      mock = JSON.parse(fileContent);
    } finally {
      app.locals.data = mock;
      app.listen(DEFAULT_PORT, () => console.info(chalk.green(`Awaiting connections on port ${port}`)));
    }
  }
};
