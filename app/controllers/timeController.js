const db=require("../models");
const time=db.time;
const Op=db.Sequelize.Op;
var _ = require("underscore");



exports.findAll=(req,res)=>{
    let employeeid = req.params.id;
    console.log(employeeid);
    db.Time.findAll({
        where: {
            employee_id:employeeid,
            available:1
        }
    }).then(function (available_times) {
        res.json(available_times);
    })
}

exports.create=(req,res)=>{
    let body = _.pick(req.body, 
        "hour",
        "available",
        "date_id",
        "employee_id"
        );
        console.log(body);
    db.Time.create(body).then(function (time) {
        res.json(time.toJSON());
    }), function (e) {
        res.status(500).send();
    }
}

exports.delete=(req,res)=>{
    let time_id = req.params.id;
    
    db.Time.destroy({
        where: {
            id: time_id
        }
    }).then(function (timeDeleted) {
        if (timeDeleted === 0) {
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

exports.update = (req, res) => {
    let time_id = req.params.id;

    let body = _.pick(req.body,
        "hour",
        "available",
        "date_id",
        "employee_id"
        );
    let attributes = {};


    if (body.hasOwnProperty("hour")) {
        attributes.hour = body.hour;
    }
    if (body.hasOwnProperty("available")) {
        attributes.available = body.available;
    }
    if (body.hasOwnProperty("date_id")) {
        attributes.date_id = body.date_id;
    }
    if (body.hasOwnProperty("employee_id")) {
        attributes.employee_id = body.employee_id;
    }
    

    db.Time.findOne({
        where: {
            id: time_id
        }
    }).then(function (time) {
        if (time) {
            time.update(attributes).then(function (time) {
                res.json(time.toJSON());
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

exports.selectHours = (req, res) => {
    let time_id = req.params.id;

    
    db.Time.findOne({
        where: {
            id:time_id
        }
    }).then(function (selectedTime) {

        let body = _.pick(selectedTime,
            "hour",
            "available",
            "date_id",
            "employee_id"
            );
        let attributes = {};

        body.hour=selectedTime.hour,
        body.available=0,
        body.date_id=selectedTime.date_id,
        body.employee_id=selectedTime.employee_id
        if (body.hasOwnProperty("hour")) {
            attributes.hour = body.hour;
        }
        if (body.hasOwnProperty("available")) {
            attributes.available = body.available;
        }
        if (body.hasOwnProperty("date_id")) {
            attributes.date_id = body.date_id;
        }
        if (body.hasOwnProperty("employee_id")) {
            attributes.employee_id = body.employee_id;
        }
        console.log(attributes.available);
        if (selectedTime) {
            selectedTime.update(attributes).then(function (selectedTime) {
                res.json(selectedTime.toJSON());
            }, function () {
                res.status(400).send();
            })
        } else {
            res.status(404).send({
                error: "id not found!"
            })
        }
    })

}

