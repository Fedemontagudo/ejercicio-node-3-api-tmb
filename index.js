require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("mi-app:principal");
const { program } = require("commander");
const morgan = require("morgan");

program.option("-p, --puerto <puerto>", "Puerto para nuestro servidor");
program.parse(process.argv);
const options = program.opts();

const app = express();

const puerto = options.puerto || process.env.puerto || 5000;

const urlAPI = process.env.TMB_LINEAS_API;
const appId = process.env.TMB_API_APP_ID;
const appKey = process.env.TMB_API_APP_KEY;

const server = app.listen(puerto, () => {
  debug(`servidor escuchando en el puerto ${chalk.green(puerto)}.`);
});

server.on("error", err => {
  debug(chalk.red("Ha ocurrido un error al levantar el servidor"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red(`El puerto ${puerto} está ocupado`));
  }
});

app.use(morgan("dev"));
app.use(express.static("public"));
app.get("/metro/lineas", (req, res, next) => {
  res.json({
    id: 2,
    linea: "L2",
    descripcion: "Descripción de la línea"
  });
});
app.get("/metro/lineas/L2", (req, res, next) => {
  res.json({
    linea: "L2",
    descripcion: "Descripción de la línea",
    paradas: [
      {
        id: 1,
        nombre: "Nombre parada"
      },
    ]
  });
});
app.post("/", (req, res, next) => {
  res.status(403).json({ error: true, mensaje: "Te pensabas que podías hackerme" });
});
app.use((req, res, next) => {
  res.status(404).json({ error: true, mensaje: "Recurso no encontrado" });
});
