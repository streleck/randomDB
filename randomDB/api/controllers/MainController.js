/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view:function(req, res){
        Main.find({}).exec(function(err,entries){
            if(err){
                res.send(500, {error: "Database Error"});
            }
           res.view('view', {entries:entries});
        });
        
    },
    store:function(req, res){
        res.view('store');    
    },
    create:function(req, res){
        //console.log(req.body);
        var document = {};
        var key='';
        var value='';
        for(field in req.body){
            console.log("tick: " + field);
            if(field[0] === 'k'){
                key = req.body[field]
            }
            else{
                value = req.body[field]
                document[key] = value;
            }
        }
        Main.create({document}).exec(function(err){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            res.redirect("/main/view");
        })
        //res.redirect('/main');
    },
    getdata:function(req, res){
        Main.find({}).exec(function(err,data){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            res.send({data});
        });
        
    },
    delete:function(req,res){
        Main.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            res.redirect("/main/view");

            return false;
        })
    },
    edit:function(req,res){
        Main.findOne({id:req.params.id}).exec(function(err, entry){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            var dataSet = [];
            for(field in entry.document){
                var newField = [];
                newField.push(field);
                newField.push(entry.document[field]);
                dataSet.push(newField);
            }
            res.view("edit", {id:req.params.id,entry:dataSet});

            return false;
        })
    },
    update:function(req,res){
            
        var data = req.body;
        //data.id = req.params;
        Main.update({id: req.params}, {data}).exec(function(err){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            res.redirect("/main/view");
        });
    }
};

