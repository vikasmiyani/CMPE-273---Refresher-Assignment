/**
 * http://usejsdoc.org/
 */

//var log = require("./log");
var mongo = require("./mongo");  
var config = require('./config.js');
var ObjectID = require('mongodb').ObjectID;


exports.handle_request = function(msg, callback){
	
	var user_id = msg.user_id;
	try{
		mongo.connect(config.mongo.dbURL, function() {
			var coll = mongo.collection('items');
			if(user_id){
				coll.find({"seller._id":{ $ne: new ObjectID(user_id)},"isSold":{ $ne: 1}}).toArray( function(err, user) {
					if(err){
						callback(err,null);
					}
					if(user){
						callback(null,user);
					}
			});
		  }else{
			  coll.find().toArray(function(err, user) {
				  	if(err){
						callback(err,null);
					}
					if(user){
						callback(null,user);
					}
			  });
		  }
		});
	}catch(e){
		console.log(e);
		callback(null,null);
	}
	
};

exports.test = function(msg,callback){
	
	var user_id = msg.user_id;
	var coll ;
		try{
		 coll = mongo.collection('items');
		}catch(e){
			console.log(e);
			callback(null,null);
		}
	
		if(user_id){
			coll.find({"seller._id":{ $ne: new ObjectID(user_id)},"isSold":{ $ne: 1}}).toArray( function(err, user) {
				if(err){
					callback(err,null);
				}
				if(user){
					callback(null,user);
				}
		});
	  }else{
		  coll.find().toArray(function(err, user) {
			  	if(err){
					callback(err,null);
				}
				if(user){
					callback(null,user);
				}
		  });
		
	  }	
};



