const scheduleAndClassData = require('../data/schedule&class.json');

const getScheduleAndThickness = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: scheduleAndClassData[req.body.diameter] });
};

module.exports = { getScheduleAndThickness };
