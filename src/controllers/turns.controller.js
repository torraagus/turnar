const turnsCtrl = {};
const Turn = require("../models/Turn");

const code = {
  DUPLICATED_VALUE: "11000",
};

turnsCtrl.getTurns = async (req, res) => {
  const turns = await Turn.find(req.query);
  res.json(turns);
};

turnsCtrl.createTurn = async (req, res) => {
  const turn = new Turn(req.body);
  await turn.save((err) => {
    if (err) {
      const message =
        err.code == code.DUPLICATED_VALUE
          ? `The turnname ${err.keyValue.turnname} is already in use`
          : `${err}`;
      res.json({ message: message });
      return console.log(message);
    }
    res.json({ message: "Turn saved" });
  });
};

turnsCtrl.getTurn = async (req, res) => {
  const turn = await Turn.findById(req.params.id);
  if (!turn) {
    res.json({ message: "Turn not found" });
    return console.log("Turn not found");
  }
  res.json(turn);
  return console.log(turn);
};

turnsCtrl.updateTurn = async (req, res) => {
  await Turn.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true },
    (err, doc) => {
      if (err) {
        res.json({ message: `${err}` });
        return console.log(`${err}`);
      }
      res.json({ message: "Turn updated" });
    }
  ).catch(() => {}); //Here i catch the promise. Async functions always return a promise.
};

turnsCtrl.deleteTurn = async (req, res) => {
  const turn = await Turn.findByIdAndDelete(req.params.id);
  if (!turn) {
    res.json({ message: "Turn not found" });
    return console.log("Turn not found");
  }
  res.json({ message: "Turn deleted" });
};

module.exports = turnsCtrl;
