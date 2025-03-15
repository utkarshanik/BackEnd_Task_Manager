const express = require('express');
const router = express.Router();
const connection = require('../db.js');

// Middleware to connect to the database
router.use((req, res, next) => {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      res.status(500).send({error:'Database connection error'});
      return;
    }
    next();
  });
});

// Route to insert a new task
router.post('/add', (req, res) => {
  const { task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status } = req.body;
  const insertQuery = `INSERT INTO task (task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const taskData = [task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status];

  connection.query(insertQuery, taskData, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      res.status(500).send({error:'Please Insert A Valid Data'});
      return;
    }
    res.status(201).send({message:'Task Added Suceesfully'});
  });
});

// Route to View all tasks
router.get('/view', (req, res) => {
  const selectQuery = 'SELECT * FROM task';
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send({error:'Error In Fetching Data'});
      return;
    }
    res.status(200).json(results);
  });
});

//Route to delete the tasks
router.delete('/delete', (req, res) => {

  const { id } = req.body;
  const deleteQuery = `DELETE FROM task WHERE task_id = ?`;

  connection.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err.stack);
      res.status(500).send({error:'Error While Deleting data'});
      return;
    }
    res.status(200).send({message:'Task deleted Suceesfully'});
  });
});

// Rout to show the selected task
router.post('/updateShow',(req,res)=>{
  const{id}=req.body;
  let querry=`SELECT * FROM task where task_id= ?`;

  connection.query(querry,id,(err,result)=>{
    if(err)
    {
      console.error('Error showing updating data:', err.stack);
      res.status(500).send({error:'Error While Showing The Data'});
      return;
    }
    res.status(200).json(result);
  })

})

// Route to update the tasks
router.put('/updatedata', (req, res) => {
  // const { id } = req.params;
  const { task_owner,id, task_name, task_detail, start_date, end_date, reminder, priority, status } = req.body;
  const updateQuery = `UPDATE task SET task_owner = ?, task_name = ?, task_detail = ?, start_date = ?, end_date = ?, reminder = ?, priority = ?, status = ? WHERE task_id = ?`;
  const taskData = [task_owner, task_name, task_detail, start_date, end_date, reminder, priority, status, id];

  connection.query(updateQuery, taskData, (err, results) => {
    if (err) {
      console.error('Error updating data:', err.stack);
      res.status(500).send({error:'Error While Updating The Data'});
      return;
    }
    res.status(200).send({message:'Task Updated Suceesfully'});
  });
});


module.exports = router;
