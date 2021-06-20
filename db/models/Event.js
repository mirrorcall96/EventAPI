module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Event",
    {
      organizer: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [0, 20],
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notContains: "event",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numOfSeats: {
        type: DataTypes.INTEGER,

        validate: {
          min: 0,
        },
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
        validate: {
          customValidator(value) {
            if (value > this.numOfSeats) {
              throw new Error("bookedSeats: can't be greater than numOfSeats");
            }
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          customValidator(value) {
            if (value > new Date()) {
              throw new Error("startDate: should be after today's date,");
            }
            if (this.endDate && !value) {
              throw new Error("startDate can't be null");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          customValidator(value) {
            if (this.startDate && !value) {
              throw new Error("endDate can't be null");
            }
          },
        },
      },
    },
    { createdAt: false, updatedAt: false }
  );
