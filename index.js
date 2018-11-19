const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(require('path').join(__dirname, '/statics')));
app.use(express.static(require('path').join(__dirname, '')));

app.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(`Express server running on port ${app.get('port')}`);
})