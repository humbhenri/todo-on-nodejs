var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDo = new Schema({
    description : { type: String, index: true, required: true },
    priority :    { type: String, enum : ['0', '1', '2'], default: '0' },
    scheduled :   Date,
    modified :    { type: Date, default : new Date() },
    done :        { type: Boolean, default: false }
});

var User = new Schema({
    name : { type: String, index: true, required: true }
});

mongoose.model('ToDo', ToDo);
mongoose.model('User', User);

exports.ToDo = function(db) {
    return db.model('ToDo');
};

exports.User = function(db) {
    return db.model('User');
};
