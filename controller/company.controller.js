const getConnection = require("../config/db.js");

const CreateCompany = async (req, res) => {
  const { name, website, industry } = req.body;
  let client;

  if (!name || !website || !industry) {
    return res.status(400).json("Please add all fields");
  }

  try {
    const client = await getConnection();

    const createQuery =
      "INSERT INTO Company (name, website, industry) VALUES ($1, $2, $3) RETURNING *";

    const result = await client.query(createQuery, [name, website, industry]);
    const newCompany = result.rows;

    if (!newCompany) {
      return res.status(400).json({ error: "Company not saved" });
    }
    return res.status(200).json(newCompany);
  } catch (error) {
    console.log(error);
    return res.status(400).json("server error");
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const getAllCompany = async (req, res) => {
  let client;
  try {
    client = await getConnection();

    const getQuery = "SELECT * FROM Company";

    const result = await client.query(getQuery);
    const allCompany = result.rows;

    if (!allCompany || allCompany.length === 0) {
      return res.status(400).json({ error: "No Company found" });
    }
    return res.status(200).json(allCompany);
  } catch (error) {
    console.error("Error fetching Company data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const getACompany = async (req, res) => {
  const name = req.query.name;
  let client;
  try {
    client = await getConnection();

    const getQuery = "SELECT * FROM Company WHERE name = $1";

    const result = await client.query(getQuery, [name]);
    const Companys = result.rows;

    if (!Companys || Companys.length === 0) {
      return res.status(400).json({ error: "No Company found" });
    }
    return res.status(200).json(Companys);
  } catch (error) {
    console.error("Error fetching Company data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, website, industry } = req.body;
  let client;

  try {
    client = await getConnection();

    const updateQuery = `
      UPDATE Company 
      SET 
        name = COALESCE($1, name), 
        website = COALESCE($2, website), 
        industry = COALESCE($3, industry) 
      WHERE company_id = $4
      RETURNING *
    `;

    const values = [name, website, industry, id];
    const result = await client.query(updateQuery, values);
    const updatedCompany = result.rows;

    if (!updatedCompany || updatedCompany.length === 0) {
      return res.status(400).json({ error: "Company not updated" });
    }
    return res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating Company data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;
  let client;

  try {
    const client = await getConnection();

    const deleteQuery = "DELETE FROM Company WHERE  company_id = $1";
    const result = await client.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "problem while deleting" });
    }

    return res.json({ message: "Company removed" });
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
  CreateCompany,
  getAllCompany,
  getACompany,
  updateCompany,
  deleteCompany,
};
