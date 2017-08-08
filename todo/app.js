var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var services = require('./services');
var baseUrl = 'http://dev.ggoyal.co.in/';

var app = express();

// serve static assets
app.use(express.static('public'));

/* Using sessions */
app.use(session({secret: 'todotopsecret'}))


/* The to do list and the form are displayed */
.get('/todo', function(req, res) {
  services.get(baseUrl + 'todo-items', callback);
  function callback(todolist, err) {
    res.render('todo.ejs', {todolist: todolist});
  }
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
  var endpoint = '/entity/node';
  var method = 'POST';
  if (req.body.title) {
    var data = {
      '_links': {
        'type': {
          'href': baseUrl + 'rest/type/node/todo'
        }
      },
      'type': {
        'target_id': "todo"
      },
      'title': {
        'value': req.body.title
      },
      'body' : [
        {
          'value': req.body.description,
          'format': 'basic_html'
        }
      ],
      'field_status': {
        'value': (req.body.status == 'on') ? 1 : 0
      }
    }
    if (req.body.key !== undefined) {
      data.nid = {
        'value' : req.body.key
      },
      data._links.self = {
        'href' : baseUrl + 'node/' + req.body.key + '?_format=hal_json'
      }
      endpoint = baseUrl + 'node/' + req.body.key + '?_format=hal_json';
      method = 'PATCH';
    }
    services.createTodo(endpoint, method, data, redirect);
  }
  function redirect(data) {
    res.redirect('/todo');
  }

})

.get('/todo/add-task', function(req, res) {
  res.render('todoAdd.ejs');
})

/* Edit an item in the to do list */
.get('/todo/edit/:id', function(req, res) {
    if (req.params.id != '') {
      services.get(baseUrl + 'node/' + req.params.id, editCallback);
    }
    function editCallback(data, err) {
      res.render('todoAdd.ejs', {data: data});
    }
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
  if (req.params.id != '') {
    endpoint = baseUrl + 'node/' + req.params.id + '?_format=hal_json';
    method = 'DELETE';
    var data = {
      '_links': {
        'type': {
          'href': baseUrl + 'rest/type/node/todo'
        }
      }
    };
    services.createTodo(endpoint, method, data, redirect);
  }
  function redirect() {
    res.redirect('/todo');
  }
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
  var value = req.path;
  var regex = /^\/assets/;
  if (!regex.test(value)) {
    res.redirect('/todo');
  }
})

.listen(process.env.PORT || process.argv[2]);
