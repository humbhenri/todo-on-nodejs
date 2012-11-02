
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var app = express();

//app.helpers(require('./flashmessages.js').helpers);
// app.dynamicHelpers(require('./flashmessages.js').dynamicHelpers);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.logger());
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.redirect('/todos');
});

app.get('/blah', function(req, res) { res.send('Node.js sucks'); });

// List
app.get('/todos', function(req, res){
    var query = ToDo.find({});
    query.sort({done : 1, priority : -1})
    query.exec(function(error, data) {
        res.render('todos/index.jade', {
            message: req.flash('info'),
            todos: data
        });
    });
});

// Create
app.get('/todos/new', routes.createtodo);

app.post('/todos/:description/new', function(req, res) {
    if (req.params.description) {
        var d = new ToDo();
        d.description = req.params.description;
        d.save(function(){
            res.redirect('/todos');
        });
    }
});

app.post('/todos/.:format?', function(req, res){
    var d = new ToDo(req.body.todo);
    d.save(function() {
        res.redirect('/todos');
    });
});

app.post('/todos/:id/save', function(req, res){
    ToDo.findOne({_id : req.params.id}, function(err, d) {
        if (!d) return next(new NotFound('ToDo not found'));
        if (req.body['done' + req.params.id] == 'on') {
            d.done = true;
        } else  {
            d.done = false;
        }
        d.modified = new Date();
        d.save(function(err) {
            res.redirect('/todos');
        });
    });
});

app.post('/todos/:id/priority_up', function(req, res){
    ToDo.findOne({_id : req.params.id}, function(err, d) {
        if (!d) return next(new NotFound('ToDo not found'));
        var priority = d.priority;
        switch(d.priority) {
            case '0':
                d.priority = '1';
                break;
            case '1':
                d.priority = '2';
                break;
        }
        d.modified = new Date();
        d.save(function(err) {
            res.redirect('/todos');
        });
    });
});

app.post('/todos/:id/priority_down', function(req, res){
    ToDo.findOne({_id : req.params.id}, function(err, d) {
        if (!d) return next(new NotFound('ToDo not found'));
        var priority = d.priority;
        switch(d.priority) {
            case '1':
                d.priority = '0';
                break;
            case '2':
                d.priority = '1';
                break;
        }
        d.save(function(err) {
            res.redirect('/todos');
        });
    });
});

app.post('/todos/:id/delete', function(req, res){
    ToDo.remove({_id : req.params.id}, function(err, d){
        req.flash('info', 'ToDo Deleted');
        res.redirect('/todos');
    });
});

// Read
// app.get('/todos/:id.:format?', routes.readtodo);

// Update
//app.put('/todos/:id.:format?', routes.updatetodo);

// Delete
//app.del('/todos/:id.:format?', routes.deletetodo);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/todo');
ToDo = require('./models.js').ToDo(db);
