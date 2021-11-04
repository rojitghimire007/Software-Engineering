/* Master Database */

CREATE TABLE users
(
  uname TEXT NOT NULL,
  fname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  pass TEXT NOT NULL,
  PRIMARY KEY(uname)
);

CREATE TABLE projects
(
  projectNumber TEXT NOT NULL,
  pname TEXT NOT NULL,
  company TEXT,
  workNumber TEXT UNIQUE,
  plocation TEXT,
  startDate DATE,
  endDate DATE,
  dbName TEXT UNIQUE NOT NULL,
  PRIMARY KEY(projectNumber)
);

CREATE TABLE roles
(
  roleName TEXT NOT NULL,
  stringing INT DEFAULT 0,
  coating INT DEFAULT 0,
  bending INT DEFAULT 0,
  welding INT DEFAULT 0,
  inventory INT DEFAULT 0,
  PRIMARY KEY(roleName)
);

CREATE TABLE user_project
(
  uname TEXT NOT NULL,
  projectNumber TEXT NOT NULL,
  PRIMARY KEY(uname, projectNumber),
  FOREIGN KEY(uname) REFERENCES users(uname),
  FOREIGN KEY(projectNumber) REFERENCES projects(projectNumber)
);

/* Project Database */

CREATE TABLE user_role
(
  uname TEXT NOT NULL,
  roleName TEXT NOT NULL,
  PRIMARY KEY(uname, roleName)
);

CREATE TABLE pipe_coat
(
  coat TEXT NOT NULL,
  color TEXT NOT NULL,
  PRIMARY KEY(coat)
);

CREATE TABLE pipe_heat
(
  pipeHeatId SERIAL NOT NULL,
  heatNumber TEXT NOT NULL,
  manufacture TEXT NOT NULL,
  filePath TEXT DEFAULT NULL,
  PRIMARY KEY(pipeHeatId)
);

CREATE TABLE purchase_number
(
  poNumber TEXT NOT NULL,
  manufacture TEXT,
  filePath TEXT DEFAULT NULL,
  PRIMARY KEY(poNumber)
);

CREATE TABLE pipe_grade
(
  grade TEXT NOT NULL,
  strength INT NOT NULL,
  PRIMARY KEY(grade)
);

CREATE TABLE pipe_ref
(
  pipeRefId SERIAL NOT NULL,
  diameter TEXT NOT NULL,
  schedule TEXT NOT NULL,
  thickness FLOAT NOT NULL,
  PRIMARY KEY(pipeRefId)
);

CREATE TABLE pipe_shared_info
(
  pipeSharedId TEXT NOT NULL,
  coat TEXT DEFAULT NULL,
  grade TEXT DEFAULT NULL,
  pipeHeatId INT NOT NULL,
  pipeRefId INT NOT NULL,
  poNumber TEXT DEFAULT NULL,
  materialType TEXT DEFAULT NULL,
  createdOn DATE DEFAULT CURRENT_DATE,
  createdBy TEXT NOT NULL,
  PRIMARY KEY(pipeSharedId),
  FOREIGN KEY(coat) REFERENCES pipe_coat(coat),
  FOREIGN KEY(grade) REFERENCES pipe_grade(grade),
  FOREIGN KEY(pipeHeatId) REFERENCES pipe_heat(pipeHeatId),
  FOREIGN KEY(pipeRefId) REFERENCES pipe_ref(pipeRefId),
  FOREIGN KEY(poNumber) REFERENCES purchase_number(poNumber)
);

CREATE TABLE pipe
(
  id TEXT NOT NULL,
  pipeSharedId TEXT NOT NULL,
  plength FLOAT,
  updatedBy TEXT DEFAULT NULL,
  updatedOn DATE DEFAULT NULL,
  plocation TEXT DEFAULT NULL,
  coilNumber TEXT DEFAULT NULL,
  comment TEXT DEFAULT NULL,
  isVoid BOOLEAN DEFAULT FALSE,
  isUsed BOOLEAN DEFAULT FALSE,
  parent TEXT DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(pipeSharedId) REFERENCES pipe_shared_info(pipeSharedId)
);

CREATE TABLE fitting_heat
(
  fittingHeatId SERIAL NOT NULL,
  heatNumber TEXT NOT NULL,
  manufacture TEXT NOT NULL,
  filePath TEXT,
  PRIMARY KEY(fittingHeatId)
);

CREATE TABLE fitting_shared_info
(
  fittingSharedId TEXT NOT NULL,
  fittingHeatId INT NOT NULL,
  poNumber TEXT DEFAULT NULL,
  grade TEXT DEFAULT NULL,
  ftype TEXT DEFAULT NULL,
  coat TEXT DEFAULT NULL,
  fdescription TEXT DEFAULT NULL,
  materialType TEXT DEFAULT NULL,
  thickness FLOAT,
  createdOn DATE DEFAULT CURRENT_DATE,
  createdBy TEXT NOT NULL,
  PRIMARY KEY(fittingSharedId),
  FOREIGN KEY(fittingHeatId) REFERENCES fitting_heat(fittingHeatId),
  FOREIGN KEY(poNumber) REFERENCES purchase_number(poNumber)
);

CREATE TABLE fitting(
  id TEXT NOT NULL,
  fittingSharedId TEXT NOT NULL,
  flength FLOAT,
  dimension TEXT,
  style TEXT,
  updatedBy TEXT DEFAULT NULL,
  updatedOn DATE DEFAULT NULL,
  flocation TEXT,
  comment TEXT,
  isVoid BOOLEAN DEFAULT FALSE,
  isUsed BOOLEAN DEFAULT FALSE,
  parent TEXT DEFAULT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(fittingSharedId) REFERENCES fitting_shared_info(fittingSharedId)
);

CREATE TABLE stringing(
  itemId TEXT,
  stationNumber FLOAT NOT NULL,
  nextItem TEXT,
  prevItem TEXT,
  startPipe TEXT NOT NULL,
  PRIMARY KEY(itemId)
);

CREATE TABLE sequences(
  startStation FLOAT UNIQUE NOT NULL,
  itemId TEXT UNIQUE NOT NULL,
  PRIMARY KEY (startStation),
  FOREIGN KEY(itemId) REFERENCES stringing(itemId)
);