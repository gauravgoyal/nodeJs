var express = require('express');
var session = require('express-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var services = require('./services');
var crypto = require('crypto');
var baseUrl = 'http://dev.ggoyal.co.in/';

var app = express();

function genuuid() {
  return crypto.randomBytes(64).toString('hex');
}

function validateSession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/access-denied');
  }
}

/* Using sessions */
app.use(session({
  name: 'session',
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'toDonDLGST',
  saveUninitialized: false,
  resave: false
}));

// serve static assets
app.use(express.static('public'))


/* The to do list and the form are displayed */
.get('/todo', validateSession, function(req, res) {
  var userData = req.session.user.data;
  var currentUser = userData.current_user;
  var uid = currentUser.uid;
  services.get(baseUrl + 'todo-items/' + uid, callback);
  function callback(todolist, err) {
    res.render('todo.ejs', {todolist: todolist});
  }
})

.get('/', function(req, res) {
  res.render('login.ejs');
})

.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
})

.get('/access-denied', function(req, res) {
  res.render('accessDenied.ejs');
})

.post('/login', urlencodedParser, function(req, res) {
  var data = {
    'name': req.body.name,
    'pass': req.body.password
  }
  services.login(baseUrl, data, callback);
  function callback(cookie, data) {
    data.cookie = cookie;
    req.session.user = {data: data};
    res.redirect('/todo');
  }
})

/* Adding an item to the to do list */
.post('/todo/add/', validateSession, urlencodedParser, function(req, res) {
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
    var userData = req.session.user.data;
    var csrf = userData.csrf_token;
    var userCookie = userData.cookie;
    services.createTodo(endpoint, method, data, redirect, csrf, userCookie);
  }
  function redirect(data) {
    res.redirect('/todo');
  }

})

.get('/todo/add-task', validateSession, function(req, res) {
  res.render('todoAdd.ejs');
})

/* Edit an item in the to do list */
.get('/todo/edit/:id', validateSession, function(req, res) {
    if (req.params.id != '') {
      services.get(baseUrl + 'node/' + req.params.id, editCallback);
    }
    function editCallback(data, err) {
      res.render('todoAdd.ejs', {data: data});
    }
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', validateSession, function(req, res) {
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
    var userData = req.session.user.data;
    var csrf = userData.csrf_token;
    var userCookie = userData.cookie;
    services.createTodo(endpoint, method, data, redirect, csrf, userCookie);
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
