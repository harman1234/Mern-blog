const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('ZBLOG','root','root',{
    host:'localhost',
    dialect:'mysql'
});


module.exports = sequelize;