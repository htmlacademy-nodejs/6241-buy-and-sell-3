'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME} = require(`../../constants`);

const app = express();
app.use(express.json());

const offersRouter = new express.Router();
offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mock = JSON.parse(fileContent);
    res.json(mock);
  } catch (e) {
    res.json([]);
  }
});

app.use(`/offers`, offersRouter);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort, 10) || DEFAULT_PORT;

    app.listen(DEFAULT_PORT, () => console.info(chalk.green(`Awaiting connections on port ${port}`)));
  }
};
