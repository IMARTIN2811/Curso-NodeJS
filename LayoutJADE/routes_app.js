var express = require("express");
//se crea el obejto router para crear rutas modulares
var router = express.Router();

//se crea la ruta
router.get("/", function (req,res) {
    res.render("app/home")
});

//se exporta la ruta
module.exports = router;