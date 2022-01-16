const Sequelize  = require('sequelize');

const sequelize = new Sequelize('form_sequel_db','root','',{
    dialect:"mysql",
    host:"localhost"
})

const Image = require('./Image.js')(sequelize);

module.exports = {
    sequelize: sequelize,
    image: Image,
}