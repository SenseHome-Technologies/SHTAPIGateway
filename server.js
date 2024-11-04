const app = require("./config/app.conf");
const config = require("./config/config");

app.listen(config.port, () => {
    console.log('Server is listening on http://localhost:' + config.port);
});