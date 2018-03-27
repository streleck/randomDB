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
        Main.create(document).exec(function(err, newThing){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            console.log(newThing);
            res.redirect("/main/view");
        })
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
            //console.log(entry);
            for(field in entry){
                var newField = [];
                newField.push(field);
                newField.push(entry[field]);
                dataSet.push(newField);
            }

            res.view("edit", {id:req.params.id,entry:entry});

            return false;
        })
    },
    update:function(req,res){
        //
        var data = {};
        console.log(req.body);
        var keys = req.body.key;
        var values = req.body.value;
        if(Array.isArray(keys)){
            for(var i=0; i<keys.length; i++){
                data[keys[i]] = values[i];
            }
        }
        else{
            data[keys] = values;
        }
        Main.update({id: req.params.id}, data).exec(function(err, updated){
            if(err){
                res.send(500, {error: "Database Error"});
            }
            console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
            console.log(updated);
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            res.redirect("/main/view");
        });
    }
};
