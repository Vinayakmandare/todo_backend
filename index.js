// require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')
const TodoModel = require('./Models/Todo')
const app = express()
// app.use(cors())
app.use(express.json())
const cors = require('cors');
app.use(cors({ origin: '*' })); // Allow all origins (or specify your frontend's URL)
require('dotenv').config();
// const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3002;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


    app.get('/get', (req, res) => {
        TodoModel.find()
            .then(result => {
                console.log('Fetched data:', result); // Debugging
                res.json(result);
            })
            .catch(err => {
                console.error('Error fetching data:', err); // Debugging
                res.status(500).json(err);
            });
    });
    
    app.put('/edit/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { task } = req.body;
    
            console.log('Incoming request:', { id, task });
    
            if (!task) {
                console.error('Task is missing in the request body');
                return res.status(400).json({ error: 'Task is required' });
            }
    
            const updatedTask = await TodoModel.findByIdAndUpdate(
                id,
                { task },
                { new: true }
            );
    
            if (!updatedTask) {
                console.error(`No task found with ID: ${id}`);
                return res.status(404).json({ error: 'Task not found' });
            }
    
            res.status(200).json(updatedTask);
        } catch (err) {
            console.error('Error updating task:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
app.put('/update/:id',(req,res)=>{
const {id} = req.params;
TodoModel.findByIdAndUpdate({_id:id},{done:true})
.then(result => res.json(result))
.catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add',(req, res)=>{
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
      .catch(err => res.json(err))
})

app.listen(3001, ()=>{
    console.log("server is running")
})

