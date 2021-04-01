require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("mi-app:principal");
const { program } = require("commander");

program.option("-p, --puerto <puerto>", "Puerto para nuestro servidor");
program.parse(process.argv);
const options = program.opts();

const app = express();

const puerto = options.puerto || process.env.puerto || 5000;

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en el puerto ${puerto}`);
});

server.on("error", err => {
  debug(chalk.red("Ha ocurrido un error al levantar el servidor"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red(`El puerto ${puerto} está ocupado`));
  }
});
