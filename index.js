import express from 'express';
import exphbs from 'express-handlebars';
// import routers
import booksRouter from './src/routers/books';
import navs from './src/config/navs';

// initialize express application 
const app = express();

// for supertest
let port = process.env.PORT || (process.argv[2] || 3000);
port = typeof port === 'number' ? port : 3000;

// when request comes in, it will execute by middleware order
// 1. check public static
// 2. check src/view
// If none of them matches the request, app will check route system`
// express built-in middleware
app.use(express.static('public'));
app.use(express.static('src/views'));

app.set('views', './src/views');
app.engine('.hbs', exphbs({
	extname: '.hbs',
	layoutsDir: './src/views/layouts',
	defaultLayout: 'application'
}));
app.set('view engine', '.hbs');

// use routers
app.use('/books', booksRouter(navs));

// simple route
app.get('/', (req, res, next) => {
	res.render('index', {
		name: 'foobar...',
		navs: navs
	})
});

if(!module.parent) {
	app.listen(port, (err) => {
		console.log('running server on port ' + port);
	});
}

