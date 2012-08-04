exports.index = function(req, res){
  res.render('index', { title: 'ToDos Listing' });
};

// List
//exports.listtodos = 

// Create
exports.createtodo = function(req, res){
    res.render('todos/new.jade', { d: new ToDo() });
};

// Read
exports.readtodo = function(req, res){
};

// Update
exports.updatetodo = function(req, res){
};

// Delete
exports.deletetodo = function(req, res){
};
