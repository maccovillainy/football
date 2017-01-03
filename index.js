let express = require('express');
let expressValidator = require('express-validator');
let app = express();
let hbs = require('express-handlebars');
let path = require('path');
/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, DELETE, POST")
  next();
})
*/

app.use(require('body-parser').urlencoded({ extended: true }));
// Установка механизма представления handlebars
app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/public/views/layouts'
}))

app.set('views', path.join(__dirname + '/public', 'views'))
app.set('view engine', 'hbs');

app.use(expressValidator());

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);




app.get('/', (req, res) =>{
	res.render('index',{title: 'football'})
}) 

// пользовательская страница 404
app.use(function(req, res){
res.type('text/plain');
res.status(404);
res.send(404);
});
// пользовательская страница 500
app.use(function(err, req, res, next){
console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send(500);
});

app.listen(app.get('port'), function(){
console.log( 'Express запущен на http://localhost:' +
app.get('port') + '; нажмите Ctrl+C для завершения.' );
});




