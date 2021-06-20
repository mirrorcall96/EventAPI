const { Event } = require("../db/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.eventList = async (req, res) => {
  try {
    let result;
    if (!req.body.date) {
      result = await Event.findAll({
        attributes: ["id", "name", "image"],
        order: [["startDate"], ["name"]],
      });
    } else {
      result = await Event.findAll({
        where: {
          startDate: {
            [Op.gt]: req.body.date,
          },
        },
        attributes: ["id", "name", "image"],
        order: [["startDate"], ["name"]],
      });
    }
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.eventDetails = async (req, res) => {
  try {
    const myEvent = await Event.findByPk(req.params.eventId);
    if (!myEvent) throw new Error("don't exist");
    res.status(201).json(myEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.eventCreate = async (req, res) => {
  try {
    await Event.bulkCreate(req.body.events);
    res.status(201).json();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.eventUpdate = async (req, res) => {
  try {
    const myEvent = await Event.findByPk(req.params.eventId);
    if (!myEvent) throw new Error("don't exist");
    await myEvent.update(req.body);
    res.status(201).json(myEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.eventDelete = async (req, res) => {
  try {
    const DeleteIds = [];
    if (req.params.eventId) {
      DeleteIds.push(req.params.eventId);
    }
    if (req.body.ids) {
      DeleteIds.push(...req.body.ids);
    }
    await Event.destroy({ where: { id: [...DeleteIds] } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.eventBooked = async (req, res) => {
  try {
    const result = await Event.findAll({
      where: {
        numOfSeats: {
          [Op.eq]: sequelize.col("bookedSeats"),
        },
      },
      //attributes: ["id", "name", "image"],
    });
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
