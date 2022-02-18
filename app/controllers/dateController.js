const db = require("../models");
const date = db.Date;
const Op = db.Sequelize.Op;
var _ = require("underscore");

exports.findAll=(req,res)=>{
    db.Date.findAll().then(function (date) {
        res.json(date);
    })
}

exports.create = (req, res) => {
    let body = _.pick(req.body,
        "date",
        "dayName"
    );
    db.Date.create(body).then(function (response_date) {
        res.json(response_date.toJSON());
    }), function (e) {
        res.status(500).send();
    }

}

exports.update=(req,res)=>{
    let date_id = req.params.id;
    
    let body = _.pick(req.body, 
        "date",
        "dayName");
    let attributes = {};


    if (body.hasOwnProperty("date")) {
        attributes.date = body.date;
    }
    if (body.hasOwnProperty("dayName")) {
        attributes.dayName = body.dayName;
    }
    
    db.Date.findOne({
        where: {
            id: date_id
        }
    }).then(function (date) {
        if (date) {
            date.update(attributes).then(function (date) {
                res.json(date.toJSON());
            }, function () {
                res.status(400).send();
            })
        } else {
            res.status(404).send({
                error: "id not found!"
            })
        }
    }, function () {
        res.status(500).send();
    })

}

exports.delete = (req, res) => {
    let date_id = req.params.id;
    console.log(date_id);
    db.Date.destroy({
        where: {
            id: date_id
        }
    }).then(function (dateDeleted) {
        if (dateDeleted === 0) {
            res.status(404).send({
                error: "id not found..."
            });
        } else {
            res.status(204).send({ message: 'deleting success' });
        }
    }, function () {
        res.status(500).send();
    })

}