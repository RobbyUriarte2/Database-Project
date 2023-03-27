const express = require("express");
const cors = require("cors");

const app = express();


var corsOptions = {
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json('Database Project')
});

require("./src/backend/routes/events.routes.js")(app);
require("./src/backend/routes/university.routes.js")(app);
require("./src/backend/routes/users.routes.js")(app);
require("./src/backend/routes/rating.routes.js")(app);
require("./src/backend/routes/rso.routes.js")(app);
require("./src/backend/routes/comment.routes.js")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});