const routes = [
    require('./src/domain/contact').router,
];

const configure = (app) => {
    for (let route of routes) {
        route.config(app);
    }
}

module.exports = {
    configure
}
