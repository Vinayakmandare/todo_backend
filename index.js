// require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const app = express()
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://vinayakmandare21:ZaolhK5sA3OqcY61@cluster0.8dewo.mongodb.net/todolist";
console.log('MongoDB URI:', uri); // Debugging
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

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
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);
    
        const { id } = req.params;
        const { task } = req.body;
    
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(id, { task }, { new: true });
            if (!updatedTodo) {
                console.error('Todo not found:', id);
                return res.status(404).send('Todo not found');
            }
            console.log('Successfully updated:', updatedTodo);
            res.json(updatedTodo);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error updating task');
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

