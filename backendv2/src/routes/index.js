const fs = require('fs');
const path = require('path');

const routes = fs
    .readdirSync(path.join(__dirname))
    .filter(file => file !== 'index.js')
    .reduce((routes, file) => {
        const routeName = file.replace('.js', '');
        routes[routeName] = require(path.join(__dirname, file));
        return routes;
    }, {});

module.exports = routes;
