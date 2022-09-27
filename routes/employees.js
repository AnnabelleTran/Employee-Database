const express = require('express');
const employees = require('../model/employee');
const router = express.Router();


const Employee = require('../model/employee');

router.get('/', (req,res)=>{
    Employee.find({})
        .then(employees =>{
            res.render('index', {employees: employees});
        })
        .catch(err =>{
            res.redirect('/');
        });
})



router.get('/new', (req,res)=>{
    res.render('new');
});

router.get('/show', async (req,res)=>{
    employees.find({name: employees.name});
    res.render('show', {documents: employees});
    console.log(employees.name);    
    // var filter = req.query.name;
    // var result = req.query.result;
    // if(filter !=undefined){
    //     let employees;
    //     switch(filter){
    //         case "name":
    //             employees = await Employee.find({name: result});
    //             break;
    //     }
        // res.render('search', {documents: employees});
    // }
    // else{
    //     res.redirect('/');
    // }
});

    router.get('/employee', (req,res)=>{
        let searchQuery = {name: req.query.name};
    Employee.findOne(searchQuery)
        .then(employee =>{
            res.render('show', {employee: employee});
        })
        .catch(err => {
            req.rediret('/');
        })
    });


router.get('edit/:id', (req,res) =>{
    let searchQuery = {_id : req.params.id};
    Employee.findOne(searchQuery)
        .then(employee =>{
            res.render('edit', {employee:employee});
        })
        .catch(err => {
            res.redirect('/');
        });
});

router.post('/employee/new', (req,res) =>{
    let newEmployee = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary
    };

    Employee.create(newEmployee)
        .then(employee => {
            res.redirect('/');
        })
        .catch(err =>{
            res.redirect('/')
        })
})

router.put('/edit/:id', (req,res)=> {
    let searchQuery = {_id : req.params.id};

    Employee.updateOne(searchQuery, {$set: {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary
    }})
    .then(employee => {
        res.redirect('/');
    })
    .catch(err =>{
        res.redirect('/');
    })
})

router.delete('/delete/:id', (req,res) =>{
    let searchQuery = {_id : req.params.id};

    Employee.deleteOne(searchQuery)
        .then(employee =>{
            res.redirect('/');
        })
        .catch(employee =>{
            res.redirect('/');
        })
})

module.exports = router;