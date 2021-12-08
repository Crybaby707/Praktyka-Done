let express = require('express');
let app = express();
let mysql = require('mysql');
let movie = {};
let SM = {};

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bd_movie"
});

app.listen(3000, function () {
  console.log('node express work on 3000');
}); 

//головна
app.get('/', function (req, res) {
  con.query(
    "SELECT * FROM content",    
    function(err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++){
        movie[result[i]['id']] = result[i];
        }
      console.log(movie);
      res.render('main', {
        movie : JSON.parse(JSON.stringify(movie))
      });
      });
    });

// Пошук

  app.get('/genre', function (req, res) {
    let genreID = req.query.id;
    console.log(req.query.id);
    con.query(
      "SELECT * FROM content WHERE genreID_1=? or genreID_2=? or genreID_3=? or genreID_4=? ",
      [req.query.id, req.query.id, req.query.id, req.query.id, req.query.id],
      
      function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++){
          SM[result[i]['id']] = result[i];
          }
        console.log(SM);
        res.render('genre', {
          SM : JSON.parse(JSON.stringify(SM))
        });
        });
      });

      app.get('/search', function (req, res) {
        con.query('SELECT * FROM content', function (err, result) {
          if (err) throw err;
          res.render('search', {content: JSON.parse(JSON.stringify(result))
           });
        });
      });


      app.get('/content', function (req, res) {
        console.log(req.query.id);
        con.query('SELECT * FROM content WHERE id='+req.query.id, function (err, result) {
          if (err) throw err;
          res.render('content', {content: JSON.parse(JSON.stringify(result))
           });
        });
      });

      app.post('/get-content-info', function (req, res) {
        console.log(req.body.key);
        if (req.body.key !=0){
        con.query('SELECT id,name FROM content WHERE id IN ('+req.body.key.join(',')+')', function (error, result, fields) {
          if (error) throw error;
          let content = {};
          for (let i = 0; i < result.length; i++){
            content[result[i]['id']] = result[i];
          }
          res.json(content);
        });
      }
      else{
        res.send('0');
      }
      });

      app.post('/get-search-info', function (req, res) {
        console.log(req.body.key);
        if (req.body.key !=0){
          con.query('SELECT id,name FROM content WHERE date IN ('+req.body.key.join(',')+')', function (error, result, fields) {
            if (error) throw error;
            let content = {};
            console.log(result);
            for (let i = 0; i < result.length; i++){
              content[result[i]['id']] = result[i];
            }
            res.json(content);
          });
        }
        else{
          res.send('0');
        }
        });