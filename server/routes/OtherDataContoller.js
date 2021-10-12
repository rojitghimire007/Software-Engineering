const scheduleAndClassData = require('../data/schedule&class.json');

const getScheduleAndThickness = (req, res, next) => {
  let mainArr = [];
  let count = 0;
  try {
    for (key in scheduleAndClassData) {
      let resArr = [];
      let arr1 = scheduleAndClassData[key][0];
      let arr2 = scheduleAndClassData[key][1];
      for (i = 0; i < arr1.length; i++) {
        resArr[i] = arr1[i] + '-' + arr2[i];
      }
      mainArr[count] = resArr;
      count++;
      //console.log(mainArr);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
  return res
    .status(200)
    .json({ success: true, data: scheduleAndClassData[req.body.diameter] });
};

module.exports = { getScheduleAndThickness };

//console.log('this is js');
