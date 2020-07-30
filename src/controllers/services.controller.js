const servicesCtrl = {};
const { Service } = require("../models/Service");

const code = {
  DUPLICATED_VALUE: "11000",
};

servicesCtrl.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

servicesCtrl.createService = async (req, res) => {
  const service = new Service(req.body);
  await service.save((err) => {
    if (err) {
      const message =
        err.code == code.DUPLICATED_VALUE
          ? `The servicename ${err.keyValue.servicename} is already in use`
          : `${err}`;
      res.json({ message: message });
      return console.log(message);
    }
    res.json({ message: "Service saved" });
  });
};

servicesCtrl.getService = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.json({ message: "Service not found" });
    return console.log("Service not found");
  }
  res.json(service);
  return console.log(service);
};

servicesCtrl.updateService = async (req, res) => {
  await Service.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true },
    (err, doc) => {
      if (err) {
        res.json({ message: `${err}` });
        return console.log(`${err}`);
      }
      res.json({ message: "Service updated" });
    }
  ).catch(() => { }); //Here i catch the promise. Async functions always return a promise.
};

servicesCtrl.deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    res.json({ message: "Service not found" });
    return console.log("Service not found");
  }
  res.json({ message: "Service deleted" });
};

module.exports = servicesCtrl;
