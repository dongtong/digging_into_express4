import express from 'express';

// initialize express application 
const app = express();

// for supertest
let port = process.env.PORT || (process.argv[2] || 3000);
port = typeof port === 'number' ? port : 3000;

if(!module.parent) {
	app.listen(port, (err) => {
		console.log('running server on port ' + port);
	});
}

