const Accounts = require('./app/controllers/accounts.js');
const Points = require('./app/controllers/points');

module.exports = [
    { method: 'GET', path: '/{param*}', handler: {directory: {path: './public'}},options:{auth:false}},
    { method: 'GET', path: '/home', config: Points.home },
    { method: 'GET', path: '/homeAdmin', config: Points.homeAdmin},
    { method: 'GET', path: '/report', config: Points.showPoints },
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/loginAdmin', config: Accounts.showLoginAdmin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'GET', path: '/addPoint', config: Points.point },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/signupAdmin', config: Accounts.signupAdmin },
    { method: 'POST', path: '/login', config: Accounts.loginUser },
    { method: 'POST', path: '/loginAdmin', config: Accounts.loginAdmin },
    { method: 'POST', path: '/addPoint', config: Points.addPoint },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },
    { method: 'GET', path: '/pointDelete/{id}', config: Points.pointDelete },
    { method: 'POST', path: '/pointEdit', config: Points.updatePoint },
    { method: 'GET', path: '/testHelp', config: Points.testHelp},
    { method: 'GET', path: '/pointEdit', config: Points.viewEditPoint},
    { method: 'GET', path: '/pointView/{id}', config: Points.showPoint}
];

//  { method: 'GET', path: '/', config: Controller.index},
//     { method: 'GET', path: '/', config: Points.index },
//    { method: 'GET', path: '/report', config: Points.report },