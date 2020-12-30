const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser('cookiepassword'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

app.use(flash());

app.get('/', (req, res)=>{
  var emailError = req.flash("emailError");
  var pointsError = req.flash("pointsError");
  var nameError = req.flash("nameError");

  emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
  pointsError = (pointsError == undefined || pointsError.length == 0) ? undefined : pointsError;
  nameError = (nameError == undefined || nameError.length == 0) ? undefined : nameError;

  name = (name == undefined || name.length == 0) ? undefined : name;
  email = (email == undefined || email.length == 0) ? undefined : email;
  points = (points == undefined || points.length == 0) ? undefined : points;

  var email = req.flash("email");
  var points = req.flash("points");
  var name = req.flash("name");

  res.render('index',{emailError, pointsError, nameError, email, points, name});
});

app.post('/form', (req, res)=>{
  var{email, name, points} = req.body;

  var emailError;
  var pointsError;
  var nameError;
  
  if(email == undefined || email == ""){
    emailError = "Email invalido!";
  }

  if(points == undefined || points <20){
    pointsError = "Pontuação invalida!";
  }

  if(name == undefined || name == ""){
    nameError = "Nome não pode ser nulo!";
  }else if(name.length < 4){
    nameError = "Nome deve ter no minimo 4 caracteres!";
  }


  if(emailError != undefined || pointsError != undefined || nameError != undefined){
    req.flash("emailError", emailError);
    req.flash("pointsError", pointsError);
    req.flash("nameError", nameError);

    req.flash("email", email);
    req.flash("points", points);
    req.flash("name", name);
    

    res.redirect('/');
  }else{
    res.send("Formulário valido!");
  }

});

app.listen(3000, (req, res)=>{
    console.log('servidor rodando!');
});

