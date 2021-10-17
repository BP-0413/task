const express = require('express');
const port = 3000;
const db = require('./config/mongoose');
const  Task  = require('./models/task');
const app = express();
app.use(express.static("./views"));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from database');
            return;
        }

        return res.render('home', {
            tittle: "Crud",
            task: task
        });
    }
)});
app.post('/create-task', function(req, res){
    
    Task.create({
        description: req.body.description,
        category: req.body.category
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        return res.redirect('back');

    });
});
app.get('/delete-task', function(req, res){
    var id = req.query;
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('Error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server `);
    }

    console.log(`Listening on port 3000`);
});