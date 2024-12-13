const express = require('express');
const path = require('path');

const app = express();

// Указываем папку "public" как источник всех статических файлов
app.use(express.static(path.join(__dirname, '/public')));

app.listen(7777, () => {
	console.log("Server is listening on port 7777");
});
