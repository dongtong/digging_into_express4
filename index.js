import express from 'express';

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

// simple route
app.get('/', (req, res, next) => {
	res.send('Hello Express');
});

if(!module.parent) {
	app.listen(port, (err) => {
		console.log('running server on port ' + port);
	});
}

