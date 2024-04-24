CREATE TABLE Candidate (
  candidate_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  department_id INTEGER NOT NULL,
  applied_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE CASCADE
);

CREATE TABLE Company (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  website VARCHAR(255),
  industry VARCHAR(100)
);

CREATE TABLE Department (
  department_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  company_id INTEGER NOT NULL,
  FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

CREATE TABLE Employee (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  department_id INTEGER NOT NULL,
  hire_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  salary DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE RESTRICT
);

CREATE TABLE Job_Title (
  job_title_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE RESTRICT
);

CREATE TABLE Employee_Job_Title (
  employee_id INTEGER NOT NULL,
  job_title_id INTEGER NOT NULL,
  start_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITHOUT TIME ZONE,
  PRIMARY KEY (employee_id, job_title_id),
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (job_title_id) REFERENCES Job_Title(job_title_id) ON DELETE CASCADE
);

CREATE TABLE Salary_History (
  salary_history_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  effective_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE CASCADE
);

CREATE TABLE Leave_Type (
  leave_type_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  allowed_days_per_year INTEGER
);

CREATE TABLE Leave (
  leave_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  leave_type_id INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',  -- (Pending, Approved, Rejected)
  reason TEXT,
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (leave_type_id) REFERENCES Leave_Type(leave_type_id) ON DELETE RESTRICT
);

CREATE TABLE Skill (
  skill_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Employee_Skill (
  employee_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  PRIMARY KEY (employee_id, skill_id),
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES Skill(skill_id) ON DELETE CASCADE
);

CREATE TABLE Performance_Review (
  review_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  review_date DATE NOT NULL,
  review_period_start DATE,
  review_period_end DATE,
  manager_id INTEGER NOT NULL,
  self_review TEXT,
  manager_review TEXT,
  overall_rating VARCHAR(50),  -- (Exceeds Expectations, Meets Expectations, Needs Improvement)
  goals TEXT,
  FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES Employee(employee_id) ON DELETE RESTRICT
);

CREATE TABLE Job_Positions (
    position_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE CASCADE
);
--GbtDF71hI439V0f7