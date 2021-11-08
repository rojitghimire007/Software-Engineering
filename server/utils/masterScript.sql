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
  project_number TEXT NOT NULL,
  pname TEXT NOT NULL,
  company TEXT,
  company_address TEXT,
  company_phone TEXT,
  company_email TEXT,
  work_number TEXT UNIQUE,
  work_site_phone TEXT,
  plocation TEXT,
  start_date DATE,
  end_date DATE,
  notes TEXT,
  dbname TEXT UNIQUE NOT NULL,
  PRIMARY KEY(project_number)
);

CREATE TABLE roles
(
  role_name TEXT NOT NULL,
  stringing INT DEFAULT 0,
  coating INT DEFAULT 0,
  bending INT DEFAULT 0,
  welding INT DEFAULT 0,
  inventory INT DEFAULT 0,
  PRIMARY KEY(role_name)
);

CREATE TABLE user_project
(
  uname TEXT NOT NULL,
  project_number TEXT NOT NULL,
  PRIMARY KEY(uname, project_number),
  FOREIGN KEY(uname) REFERENCES users(uname),
  FOREIGN KEY(project_number) REFERENCES projects(project_number)
);