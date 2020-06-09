const express = require('express');

const app = express();

app.get('/', (req, res)=>{
	res.send('this is working');
})

app.listen(3000, ()=>{
	console.log("app is runnin on port 3000");
})


/*
/ --> res = this is working
/signup --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET =userv 
/image --> PUT --> user


*/