const getConnection = require("../config/db.js");

const createCandidate = async (req, res) => {
  const { first_name, last_name, email, phone_number, department_id } =
    req.body;
  let client;

  if (!first_name || !last_name || !email || !phone_number || !department_id) {
    return res.status(400).json("Please add all fields");
  }

  try {
    const client = await getConnection();

    const createQuery =
      "INSERT INTO Candidate (first_name, last_name, email, phone_number, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const result = await client.query(createQuery, [
      first_name,
      last_name,
      email,
      phone_number,
      department_id,
    ]);
    const newCandidate = result.rows;

    if (!newCandidate) {
      return res.status(400).json({ error: "Candidate not saved" });
    }
    return res.status(200).json(newCandidate);
  } catch (error) {
    console.log(error);
    return res.status(400).json("server error");
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const getAllCandidate = async (req, res) => {
  let client;
  try {
    client = await getConnection();

    const getQuery = "SELECT * FROM Candidate";

    const result = await client.query(getQuery);
    const allCandidate = result.rows;

    if (!allCandidate || allCandidate.length === 0) {
      return res.status(400).json({ error: "No Candidate found" });
    }
    return res.status(200).json(allCandidate);
  } catch (error) {
    console.error("Error fetching Candidate data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const getACandidate = async (req, res) => {
  const email = req.query.email;
  let client;
  try {
    client = await getConnection();

    const getQuery = "SSELECT * FROM Candidate WHERE email = $1";

    const result = await client.query(getQuery, [email]);
    const Candidate = result.rows;

    if (!Candidate || Candidate.length === 0) {
      return res.status(400).json({ error: "No Candidate found" });
    }
    return res.status(200).json(Candidate);
  } catch (error) {
    console.error("Error fetching Candidate data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, department_id } =
    req.body;
  let client;

  try {
    client = await getConnection();

    const updateQuery = `
      UPDATE Candidate 
      SET 
        first_name = COALESCE($1, first_name), 
        last_name = COALESCE($2, last_name), 
        email = COALESCE($3, email), 
        phone_number = COALESCE($4, phone_number), 
        department_id = COALESCE($5, department_id), 
      WHERE candidate_id = $6
      RETURNING *
    `;

    const values = [
      first_name,
      last_name,
      email,
      phone_number,
      department_id,
      id,
    ];
    const result = await client.query(updateQuery, values);
    const updatedCandidate = result.rows;

    if (!updatedCandidate || updatedCandidate.length === 0) {
      return res.status(400).json({ error: "Candidate not updated" });
    }
    return res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error("Error updating Candidate data:", error);
    return res.status(500).json({ error: "Server error" });
  } finally {
    if (client) {
      await client.release();
    }
  }
};

const deleteCandidate = async (req, res) => {
  const { id } = req.params;
  let client;

  try {
    const client = await getConnection();

    const deleteQuery = "DELETE FROM Candidate WHERE  candidate_id = $1";
    const result = await client.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "problem while deleting" });
    }

    return res.json({ message: "Candidate removed" });
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
  createCandidate,
  getAllCandidate,
  getACandidate,
  updateCandidate,
  deleteCandidate,
};
