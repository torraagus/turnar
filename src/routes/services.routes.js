const { Router } = require("express");
const router = Router();

const {
  getServices,
  createService,
  getService,
  updateService,
  deleteService,
} = require("../controllers/services.controller");

router.route("/").get(getServices).post(createService);

router.route("/:id").get(getService).put(updateService).delete(deleteService);

module.exports = router;
