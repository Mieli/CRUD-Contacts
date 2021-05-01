const app = require('./src/cmd/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server runing http://localhost:${PORT}`));