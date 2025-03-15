const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task_details');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 

app.use(bodyParser.json());
app.use('/api/task', taskRoutes); // Use the base path here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});