const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: String,
    surname: String,
    company:String,
    siret:Number,
    mail:String,
    telephone:String,
    company_adress:String,
    company_citycode:String,
    company_city:String,
    website:String,
    login:String,
    password:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
