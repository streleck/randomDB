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
    getdata:function(req,res){
        res.send({noise:"looloo"});
    }
};

