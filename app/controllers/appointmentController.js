const db = require("../models");
const Appointment = db.Appointment;
const Op = db.Sequelize.Op;
var _ = require("underscore");

const times = [
  {
    id: 1,
    time: "09:00",
  },
  {
    id: 2,
    time: "10:00",
  },
  {
    id: 3,
    time: "11:00",
  },
  {
    id: 4,
    time: "12:00",
  },
  {
    id: 5,
    time: "13:00",
  },
  {
    id: 6,
    time: "14:00",
  },
  {
    id: 7,
    time: "15:00",
  },
  {
    id: 8,
    time: "16:00",
  },
  {
    id: 9,
    time: "17:00",
  },
];

exports.create = (req, res) => {
  let body = {
    date: req.body.date,
    time: req.body.time,
    customer_id: req.body.userData.id,
    employee_id: req.body.employee_id,
  };

  let appointment_date = req.body.date;
  let appointment_time = req.body.time;
  Appointment.findAll({
    where: {
      date: appointment_date,
    },
  }).then(function (appointment) {
    if (appointment == null) {
      Appointment.create(body).then(function (appointment) {
        res.json(appointment.toJSON());
      }),
        function (e) {
          res.status(500).send();
        };
    } else {
      Appointment.findOne({
        where: {
          date: appointment_date,
          time: appointment_time,
        },
      }).then(function (appointment) {
        if (appointment == null) {
          Appointment.create(body).then(function (appointment) {
            res.json(appointment.toJSON());
          }),
            function (e) {
              res.status(500).send();
            };
        } else {
          res.status(404).send({ message: "unavailable hours" });
        }
      });
    }
  });

  console.log(body);
};

exports.findAll = (req, res) => {
  Appointment.findAll().then(function (appointment) {
    res.json(appointment);
  });
};

exports.findOne = (req, res) => {
  let appointment_id = req.params.id;
  Appointment.findOne({
    where: {
      id: appointment_id,
    },
  }).then(function (appointment) {
    res.json(appointment);
  });
};

exports.findExistTimesbyDate = (req, res) => {
  let req_date = req.body.date;
  let req_employee = req.body.employee_id;
  Appointment.findAll({
    where: {
      date: req_date,
      employee_id: req_employee
    },
  }).then(function (exist_times) {
    if (Object.keys(exist_times).length === 0) {
      
      res.json({
        status: "all times available",
        data: times,
      });
    } else {
     
      res.json({
        status: "available times",
        data: exist_times,
      });
    }
  });
};

exports.delete = (req, res) => {
  let appointment_id = req.params.id;
  Appointment.destroy({
    where: {
      id: appointment_id,
    },
  }).then(
    function (appointment) {
      if (appointment === 0) {
        res.status(404).send({
          error: "id not found...",
        });
      } else {
        res.status(204).send();
      }
    },
    function () {
      res.status(500).send();
    }
  );
};
