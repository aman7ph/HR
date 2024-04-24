const express = require("express");

const companyRouters = require("./routers/company.routers.js");
const departmentRouters = require("./routers/department.routers.js");
const candidateRouters = require("./routers/candidate.routers.js");

const app = express();
const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/company", companyRouters);
app.use("/api/department", departmentRouters);
app.use("/api/department", candidateRouters);

app.listen(port, () => console.log(`running on port 5050`));
