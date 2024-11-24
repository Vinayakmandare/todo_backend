require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const app = express()
app.use(cors({
    origin: 'https://hilarious-gecko-d675e4.netlify.app' // Only allow this frontend to access the backend
}));

app.use(express.json())
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});



app.get('/get',(req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

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
