function save_todo(todo_id) {
    document.forms[0].action='/todos/' + todo_id + '/save';
    document.forms[0].submit();
}


function create_todo() {
    var description = $("[name='new_todo']").val();
    if (description) {
        document.forms[0].action='/todos/' + description + '/new';
        document.forms[0].submit();
    }
}

function set_priority_up(todo_id) {
    document.forms[0].action='/todos/' + todo_id + '/priority_up';
    document.forms[0].submit();
}

function set_priority_down(todo_id) {
    document.forms[0].action='/todos/' + todo_id + '/priority_down';
    document.forms[0].submit();
}

function delete_todo(todo_id) {
    var answer = confirm('Delete it?');
    if (answer) {
        document.forms[0].action='/todos/' + todo_id + '/delete';
        document.forms[0].submit();
    }
}