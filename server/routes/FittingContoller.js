const { client } = require('../utils/databaseConnection');

const getFittings = (req, res, next) => {
  res.status(200).send([
    {
      id: 1234,
      inspector: 'Todd Deville',
      location: 'Shreveport',
      dimension: '20"',
      style: 'Tee',
      wall_thickness: 0.375,
      grade: 'Y65',

      heat_number: 'A15AAT',
      mfg: 'Hackney Ladish',

      coating_type: 'Bare',
      description: 'Barred',
      material: 'Steel',
      purchase_order: 6969420,
      smart_label: '',
    },
  ]);
};

module.exports = { getFittings };
