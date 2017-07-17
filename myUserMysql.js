'use strict';
var express = require('express');
var router = express.Router();
//var User = require('./app/models/users_sql');
var mysql   = require('mysql');
var con = mysql.createConnection({
	 host:"localhost",
	 user:"root",
	 password:"xxxxx",
	 database:"mydatabase"
});
con.connect(function(err){
	if(err){
		console.log('connecting error');
		return;
	}
	console.log('connecting success');
	
});



	
router.get('/', function(req, res) {
	// Send a plain text response
	res.send('Welcome to User Route!');
});

router.get('/newuser', function(req, res) {
	// Send a plain text response
	res.send('New User');
});
router.get('/getAllUsers',function(req,res){

	var sql = "SELECT * FROM mydatabase.users";
    con.query(sql,function(err,result){
    	if(err)throw err;
    	
    	res.json(result);
    });
	
		
			
	
	
}).
get('/getUsersByID/:id',function(req,res){
	var id = req.url.slice(14);
	var sql = "SELECT * FROM mydatabase.users WHERE id="+id;
    con.query(sql,function(err,result){
    	if(err)throw err;
    	
    	res.json(result);
    });
	
	
}).

post('/',function(req,res){

			    	var sql_seed="SELECT * FROM mydatabase.seed_id";
			    	con.query(sql_seed,function(err,result){
			    		if(err)throw err;
			    		var seed_id = result[0].id;

			    		//the object gonna be inserted
			    		 
			             var newid = seed_id+1;
               
                         console.log(newid);
			    		var sql = "INSERT INTO mydatabase.users (id,fName,lName,title,sex,age) VALUES ('"
                + newid + "','"
                + req.body.fName + "','"
                + req.body.lName + "','"
                + req.body.title + "','"
                + req.body.sex + "','"
                + req.body.age + "')";
			    		con.query(sql,function(err,result){
			    			if(err)throw err;
			    			
			    		});
			    		var sql_change_seed = "UPDATE mydatabase.seed_id SET id = '"+ newid+"'";
    
      
                   con.query(sql_change_seed,function(err,result){
    	              if(err)throw err;
    	
    	              res.send("change seed_id work");
                      });

			    	});
	
}).
put('/updateByID/:id',function(req,res){


	var id = req.url.slice(12);
	console.log(id);
	var fName =req.body.fName;
	var lName = req.body.lName;
	var title = req.body.title;
	var sex = req.body.sex;
	var age = req.body.age;
             //UPDATE `mydatabase`.`users` SET `fName`='Kenny11', `lName`='Ma', `title`='singer22', `sex`='male1' WHERE `id`='7';
	var sql = "UPDATE mydatabase.users SET fName = '"+ fName+"', lName= '"+lName+"', title= '"+title+"', sex= '"+sex+"',age= '"+age+"' WHERE id= '"+id+"'";
    
    console.log(sql);
    con.query(sql,function(err,result){
    	if(err)throw err;
    	
    	res.json("work");
    });
	

     
}).
delete('/deleteUsersByID/:id',function(req,res){


	var id = req.url.slice(17);
    var sql = "Delete FROM mydatabase.users WHERE id="+id;
    con.query(sql,function(err,result){
    	if(err)throw err;
    	
    	res.json("work");
    });
	


})

router.get('/DeleteUser', function(req, res) {
	res.render('Delete User');
});


 module.exports = router;

