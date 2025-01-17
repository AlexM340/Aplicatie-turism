const {sequelize} = require("./database");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Modify schema to match models
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

module.exports = syncDatabase;
