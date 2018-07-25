/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var schedule = require('node-schedule')

module.exports = {

  // TODO: implement sort parameters where necessary

  list: function (req, res) {
    Event.find({}).sort().paginate(req.params.pg, 20).exec(function (err, events) {
      if (err) {
        console.log("Error in Event -> List");
        console.log("Error 000:", err);
      }

      res.view('pages/eventlist', { events: events });
    });
  },

  mylist: function (req, res) {
    Event.find({ host: req.params.host }).exec(function (err, events) {
      if (err) {
        console.log("Error in Event -> MyList");
        console.log("Error 000:", err);
      }

      res.view('pages/manageevents', { events: events });
    });
  },

  view: function (req, res) {
    Event.findOne({ id: req.params.id }).exec(function (err, event) {
      if (err) {
        console.log("Error in Event -> View");
        console.log("Error 000", err);
      }

      res.view('pages/viewevent', { event: event });
    });
  },

  create: function (req, res) {
    var location = req.body.location;
    var food = req.body.food;
    var host = req.body.host;
    var now = new Date();
    var dateString = now.toDateString();
    var timeString = now.toLocaleTimeString();

    // var tomorrow = new Date();
    // tomorrow.setDate(now.getDate() + 1);

    // var job = schedule.scheduleJob(tomorrow, function () {
    //   Event.destroy({ location: location, food: food, host: host, day: day }).exec(function (err) {
    //     if (err) {
    //       console.log("Error in Event -> Create");
    //       console.log("Error 001", err);
    //     }
    //   });
    // });

    Event.create({ location: location, food: food, host: host, date: dateString, time: timeString }).fetch().exec(function (err, event) {
      if (err) {
        console.log("Error in Event -> Create");
        console.log("Error 000:", err);
      }

      res.view('pages/viewevent', { event: event });
    });
  },

  delete: function (req, res) {
    Event.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        console.log("Error in Event -> Destroy");
        console.log("Error 000:", err);
      }
    });

    res.redirect('/event/mylist/' + req.params.id);
  },
};

