'use strict';

const express = require(`express`);
const path = require(`path`);
const chalk = require(`chalk`);
const {DEFAULT_SERVER_PORT, PUBLIC_DIR} = require(`../constants`);
const registerRouter = require(`./routes/register`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const searchRouter = require(`./routes/search`);

const app = express();

app.get(`/`, (req, res) => res.render(`main`));

app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);
app.use(`/search`, searchRouter);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_SERVER_PORT, () => console.info(chalk.green(`Server started on ${DEFAULT_SERVER_PORT} port`)));
