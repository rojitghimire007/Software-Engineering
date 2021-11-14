const populate_date = require('../data/populate');

exports.user_role = `CREATE TABLE user_role(
  uname TEXT NOT NULL,
  role_name TEXT NOT NULL,
  PRIMARY KEY(uname, role_name)
)`;

exports.pipe_coat = `CREATE TABLE pipe_coat(
  coat TEXT NOT NULL,
  color TEXT NOT NULL,
  PRIMARY KEY(coat)
)`;

exports.pipe_heat = `CREATE TABLE pipe_heat(
  pipe_heat_id SERIAL NOT NULL,
  heat_number TEXT NOT NULL,
  manufacture TEXT NOT NULL,
  file_path TEXT DEFAULT NULL,
  PRIMARY KEY(pipe_heat_id)
)`;

exports.purchase_number = `CREATE TABLE purchase_number(
  po_number TEXT NOT NULL,
  manufacture TEXT,
  file_path TEXT DEFAULT NULL,
  PRIMARY KEY(po_number)
)`;

exports.pipe_grade = `CREATE TABLE pipe_grade(
  grade TEXT NOT NULL,
  strength INT NOT NULL,
  PRIMARY KEY(grade)
)`;

exports.populate_grade = `INSERT INTO pipe_grade(grade, strength)
VALUES
${populate_date.grade}
`;

exports.pipe_ref = `CREATE TABLE pipe_ref(
  pipe_ref_id SERIAL NOT NULL,
  diameter TEXT NOT NULL,
  schedule TEXT NOT NULL,
  thickness FLOAT NOT NULL,
  PRIMARY KEY(pipe_ref_id)
)`;

exports.populate_ref = `INSERT INTO pipe_ref(diameter, schedule, thickness)
VALUES
${populate_date.schedule}
`;

exports.pipe_shared_info = `CREATE TABLE pipe_shared_info(
  pipe_shared_id TEXT NOT NULL,
  coat TEXT DEFAULT NULL,
  grade TEXT DEFAULT NULL,
  pipe_heat_id INT NOT NULL,
  pipe_ref_id INT NOT NULL,
  po_number TEXT DEFAULT NULL,
  material_type TEXT DEFAULT NULL,
  created_on DATE DEFAULT CURRENT_DATE,
  created_by TEXT NOT NULL,
  PRIMARY KEY(pipe_shared_id),
  FOREIGN KEY(coat) REFERENCES pipe_coat(coat),
  FOREIGN KEY(grade) REFERENCES pipe_grade(grade),
  FOREIGN KEY(pipe_heat_id) REFERENCES pipe_heat(pipe_heat_id),
  FOREIGN KEY(pipe_ref_id) REFERENCES pipe_ref(pipe_ref_id),
  FOREIGN KEY(po_number) REFERENCES purchase_number(po_number)
)`;

exports.pipe = `CREATE TABLE pipe(
  id TEXT NOT NULL,
  pipe_shared_id TEXT NOT NULL,
  plength FLOAT,
  updated_by TEXT DEFAULT NULL,
  updated_on DATE DEFAULT NULL,
  plocation TEXT DEFAULT NULL,
  coil_number TEXT DEFAULT NULL,
  comment TEXT DEFAULT NULL,
  is_void BOOLEAN DEFAULT FALSE,
  is_used BOOLEAN DEFAULT FALSE,
  is_cut BOOLEAN DEFAULT FALSE,
  parent TEXT DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(pipe_shared_id) REFERENCES pipe_shared_info(pipe_shared_id)
)`;

exports.fitting_heat = `CREATE TABLE fitting_heat(
  fitting_heat_id SERIAL NOT NULL,
  heat_number TEXT NOT NULL,
  manufacture TEXT NOT NULL,
  file_path TEXT,
  PRIMARY KEY(fitting_heat_id)
)`;

exports.fitting_shared_info = `CREATE TABLE fitting_shared_info(
  fitting_shared_id TEXT NOT NULL,
  fitting_heat_id INT NOT NULL,
  po_number TEXT DEFAULT NULL,
  grade TEXT DEFAULT NULL,
  ftype TEXT DEFAULT NULL,
  coat TEXT DEFAULT NULL,
  fdescription TEXT DEFAULT NULL,
  material_type TEXT DEFAULT NULL,
  thickness FLOAT,
  created_on DATE DEFAULT CURRENT_DATE,
  created_by TEXT NOT NULL,
  PRIMARY KEY(fitting_shared_id),
  FOREIGN KEY(fitting_heat_id) REFERENCES fitting_heat(fitting_heat_id),
  FOREIGN KEY(po_number) REFERENCES purchase_number(po_number)
)`;

exports.fitting = `CREATE TABLE fitting(
  id TEXT NOT NULL,
  fitting_shared_id TEXT NOT NULL,
  flength FLOAT,
  dimension TEXT,
  style TEXT,
  updated_by TEXT DEFAULT NULL,
  updated_on DATE DEFAULT NULL,
  flocation TEXT,
  comment TEXT,
  is_void BOOLEAN DEFAULT FALSE,
  is_used BOOLEAN DEFAULT FALSE,
  parent TEXT DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(fitting_shared_id) REFERENCES fitting_shared_info(fitting_shared_id)
)`;

exports.stringing = `CREATE TABLE stringing(
  item_id TEXT,
  station_number FLOAT NOT NULL,
  next_item TEXT,
  prev_item TEXT,
  start_pipe TEXT NOT NULL,
  PRIMARY KEY(item_id)
)`;

exports.sequences = `CREATE TABLE sequences(
  start_station FLOAT UNIQUE NOT NULL,
  item_id TEXT UNIQUE NOT NULL,
  PRIMARY KEY (start_station),
  FOREIGN KEY(item_id) REFERENCES stringing(item_id)
)`;

exports.bend = `CREATE TABLE bend(
  bend_id TEXT NOT NULL,
  degree FLOAT NOT NULL,
  bdirection TEXT NOT NULL,
  blength TEXT DEFAULT NULL,
  bdate DATE DEFAULT CURRENT_DATE,
  created_by TEXT NOT NULL,
  PRIMARY KEY(bend_id)
)`;

exports.pipe_bend = `CREATE TABLE pipe_bend(
  id  TEXT NOT NULL,
  bend_id TEXT NOT NULL,
  PRIMARY KEY (id, bend_id),
  FOREIGN KEY(id) REFERENCES pipe(id),
  FOREIGN KEY(bend_id) REFERENCES bend(bend_id) ON DELETE CASCADE
)`;