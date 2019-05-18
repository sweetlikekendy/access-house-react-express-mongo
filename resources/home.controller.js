const crudControllers = require("../utils/crud");
const Home = require("./home.model");

module.exports = crudControllers(Home);
