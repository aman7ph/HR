const getConnection = require("../config/db.js");

const createDepartment = async (req, res) => {
  const { name, company_id } = req.body;
  let client;

  if (!name || !company_id) {
    return res.status(400).json("Please add all fields");
  }

  try {
    const client = await getConnection();

    const createQuery =
      "INSERT INTO Department (name, company_id) VALUES ($1, $2) RETURNING *";

    const result = await client.query(createQuery, [name, company_id]);
    const newDepartment = result.rows;

    if (!newDepartment) {
      return res.status(400).json({ error: "Department not saved" });
    }
    return res.status(200).json(newDepartment);
  } catch (error) {
    console.log(error);
    return res.status(400).json("server error");
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const getAllDepartment = async (req, res) => {
  let client;
  try {
    client = await getConnection();

    const getQuery = "SELECT * FROM Department";

    const result = await client.query(getQuery);
    const allDepartment = result.rows;

    if (!allDepartment || allDepartment.length === 0) {
      return res.status(400).json({ error: "No Department found" });
    }
    return res.status(200).json(allDepartment);
  } catch (error) {
    console.error("Error fetching Department data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const getADepartment = async (req, res) => {
  const name = req.query.name;
  let client;
  try {
    client = await getConnection();

    const getQuery = "SSELECT * FROM Department WHERE name = $1";

    const result = await client.query(getQuery, [name]);
    const Department = result.rows;

    if (!Department || Department.length === 0) {
      return res.status(400).json({ error: "No Department found" });
    }
    return res.status(200).json(Department);
  } catch (error) {
    console.error("Error fetching Department data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, company_id } = req.body;
  let client;

  try {
    client = await getConnection();

    const updateQuery = `
      UPDATE Department 
      SET 
        name = COALESCE($1, name), 
        company_id = COALESCE($2, company_id), 
      WHERE department_id = $3
      RETURNING *
    `;

    const values = [name, company_id, id];
    const result = await client.query(updateQuery, values);
    const updatedDepartment = result.rows;

    if (!updatedDepartment || updatedDepartment.length === 0) {
      return res.status(400).json({ error: "Department not updated" });
    }
    return res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error("Error updating Department data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  let client;

  try {
    const client = await getConnection();

    const deleteQuery = "DELETE FROM Department WHERE  department_id = $1";
    const result = await client.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "problem while deleting" });
    }

    return res.json({ message: "Department removed" });
  } catch (error) {
    console.error("Error updating Company data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};
module.exports = {
  createDepartment,
  getAllDepartment,
  getADepartment,
  updateDepartment,
  deleteDepartment,
};
