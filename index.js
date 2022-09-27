const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override')

//route
// const employeeRoutes = require('./routes/employees');

//app object of express
const app = express();

app.use(express.static('public'));

//Connect mongoose with localhost:27017
mongoose.connect('mongodb://localhost:27017/EmployeeDB');

//working with body-parser
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// app.use(employeeRoutes);

//set port number
const port = 2000;

//exports schema
const employee = require("./model/employee");

const e = require('express');
const { MONGO_CLIENT_EVENTS } = require('mongodb');

//set ejs engine
app.set("view engine", "ejs");

//get index.ejs file
app.get('/', (req,res) =>{
    res.render("index");
})

//post the form values in the database
app.post('/', async(req,res) =>{
    const data = new employee(req.body)
    await data.save()
    res.send("Data Saved")
})





//Edit Employee
//
app.get('/show', async(req,res)=>{
    const items = await employee.find({})
    res.render('show', {items :items})
})

app.get('/show/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const items = await employee.findById(id)
    res.render('edit', {items})
})

// app.get('/show/:name', async(req,res)=>{
//     const {name} = req.params;
//     const items = await employee.find(name)
//     res.render('show', {items})
// })

app.put('/show/:id', async(req,res)=>{
    const {id} = req.params;
    const items = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    res.redirect('/')
})


//Delete Employee

app.delete('/show/:id', async(req,res)=> {
    const {id} = req.params;
    const deleteItem = await employee.findByIdAndDelete(id);
    res.redirect("/show");
    
})

//Search

app.get('/search', (req,res) =>{
    res.render('search', {item: ""});
})

app.get('/searchdb', (req,res) =>{
    let search = {name: req.query.name};
    employee.findOne(search)
        .then(item => {
            res.render('search', {item:item});
        })
        .catch(err =>{
            res.redirect('/');
        });
})

app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})
// app.get('/show/:name', async(req,res)=>{
//     const {name} = req.body.name;
//     const items = await employee.find(name);
//     res.render('edit', {items})
// })
// app.get('/search', (req,res) =>{
//     res.render('search', {employee:""});
// });




    // const query = req.query;
    // const params = req.params;

    // var searchQuery = {id: req.query.id};
// app.get('/search', (req,res)=> {
//     let searchQuery = {id : req.params.id};
//     employee.findOne(searchQuery, {set: {
//         name: req.body.name,
//         email: req.body.email,
//         gender: req.body.gender,
//         department: req.body.department,
//         salary: req.body.salary
//     }})
//         .then(items => {
//             res.render('search', {items : items});
//         })
//         .catch(err => {
//             // req.flash('error_msg', 'ERROR: '+err)
//             res.redirect('/');
//             console.log(err);
//         });
//     console.log(searchQuery);
// });






// app.get('/search', async(req,res)=>{
//     const searchfield = document.getElementById('searchfield').value; 
//     console.log(req.body.searchfield);
//     found = await employee.find({[req.body.searchfield]: req.body.search});
//     res.render('search', {searchitems :found})
// })












// app.get('/search', async(req,res)=>{
//     const items = await employee.find({})
//     res.render('search', {items :items})
// })

// app.get('/search', async(req,res)=>{
    // // res.render('search', {searchitems :searchitems})
    // var searchfield = document.getElementById('searchfield').value;
    // var search = document.getElementById('entersearch').value;
    // const searchitems = await employee.find({name: search}, function(err, docs){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(docs);
    //         console.log(searchitems);
    //     }
    // })
    // console.log(searchfield);
    // console.log(search);
        
    // db.inventory.find({
    //     status: {in: "parmas"}
    // })
    
    // if(searchfield == "name"){
    //     const searchitems = await employee.find({name: search}, function(err, docs){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             // app.get('/search', async(req,res)=>{
    //             console.log(docs);
    //             res.render('search', {searchitems :searchitems})
    //             // });
    //             app.get('/search/:id/edit', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findById(id)
    //                 res.render('edit', {searchitems})
    //             })
    //             app.put('/search/:id', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    //                 res.redirect('/')
    //             })
    //         }
    //     });
    // }
    // else if(searchfield == "email"){
    //     const searchitems = await employee.find({email: search}, function(err, docs){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             // app.get('/search', async(req,res)=>{
    //             console.log(docs);
    //             res.render('search', {searchitems :searchitems})
    //             // });
    //             app.get('/search/:id/edit', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findById(id)
    //                 res.render('edit', {searchitems})
    //             })
    //             app.put('/search/:id', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    //                 res.redirect('/')
    //             })
    //         }
    //     });
    // }
    // else if(searchfield == "gender"){
    //     const searchitems = await employee.find({gender: search}, function(err, docs){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             // app.get('/search', async(req,res)=>{
    //             console.log(docs);
    //             res.render('search', {searchitems :searchitems})
    //             // });
    //             app.get('/search/:id/edit', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findById(id)
    //                 res.render('edit', {searchitems})
    //             })
    //             app.put('/search/:id', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    //                 res.redirect('/')
    //             })
    //         }
    //     });
    // }
    // else if(searchfield == "department"){
    //     const searchitems = await employee.find({department: search}, function(err, docs){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             // app.get('/search', async(req,res)=>{
    //             console.log(docs);
    //             res.render('search', {searchitems :searchitems})
    //             // });
    //             app.get('/search/:id/edit', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findById(id)
    //                 res.render('edit', {searchitems})
    //             })
    //             app.put('/search/:id', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    //                 res.redirect('/')
    //             })
    //         }
    //     });
    // }
    // else if(searchfield == "salary"){
    //     const searchitems = await employee.find({salary: search}, function(err, docs){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             // app.get('/search', async(req,res)=>{
    //             console.log(docs);
    //             res.render('search', {searchitems :searchitems})
    //             // });
    //             app.get('/search/:id/edit', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findById(id)
    //                 res.render('edit', {searchitems})
    //             })
    //             app.put('/search/:id', async(req,res)=>{
    //                 const {id} = req.params;
    //                 const searchitems = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    //                 res.redirect('/')
    //             })
    //         }
    //     });
    // }
    // else{
    //     document.getElementById("searcherr").value = "No Search Results";
    // }
// })
// })





// app.put('/search/:id', async(req,res)=>{
//     const {id} = req.params;
//     const items = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
//     res.redirect('/')
// })










// app.get('/search', async(req,res)=>{
//     const items = await employee.find({})
//     res.render('search', {items :items})
// })

// app.get('/search/results', async(req,res)=>{
//     var searchfield = document.getElementById('searchfield');
//     var search = document.getElementById('entersearch');
//     // var searchterm = employee.{searchfield};
//     if (employee.find({searchfield: searchfield} = search, function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Search Available")
//         }
//     })){
//         const {id} = req.params.id;
//         const items = await employee.findById(id)
//         res.render('search', {items})
//     }
//     else{
//         console.log("No Search Results")
//     }
// })

// app.put('/search/:id', async(req,res)=>{
//     const {id} = req.params;
//     const items = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
//     res.redirect('/')
// })
// app.get('/search', (req,res) =>{
//     var searchfield = document.getElementById('searchfield').value;
//     var entersearch = document.getElementById('entersearch').value;
//     console.log(searchfield);
//     console.log(employee.searchfield);
//     const {id} = req.params;
//     employee.find({searchfield: entersearch}, function(err){
//         if(err){
//             console.log(err)
//         }
//         else{ 
//             app.get('/search', async(req,res)=>{
//                 const searchitems = await employee.find({searchfield})
//                 res.render('search', {searchitems :searchitems})
//             })
//         }
//     })

//     res.redirect("search");
// })
// app.get('/search', async(req,res)=>{
//     const searchitems = await employee.find({})
//     res.render('search', {searchitems :searchitems})
// })

// app.get('/search/:id/edit', async(req,res)=>{
//     const {id} = req.params;
//     const searchitems = await employee.findById(id)
//     res.render('edit', {searchitems})
// })

// app.put('/search/:id', async(req,res)=>{
//     const {id} = req.params;
//     const searchitems = await employee.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
//     res.redirect('/')
// })
