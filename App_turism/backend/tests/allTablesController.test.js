const { query } = require("express");
const {
  getCamere,
  getCazare,
  getPachete,
  getZboruri,
} = require("../controllers/allTablesController");
const { Camere } = require("../models/camere");
const { Cazare } = require("../models/cazare");
const { Pachete } = require("../models/pachete");
const { Zboruri } = require("../models/zboruri");
const {sequelize} = require("../database").sequelize; // Import sequelize correctly

jest.mock("../models/camere", () => ({
  Camere: { findAll: jest.fn() },
}));

jest.mock("../models/cazare", () => ({
  Cazare: { findAll: jest.fn() },
}));

jest.mock("../models/pachete", () => ({
  Pachete: { query: jest.fn() },
}));

jest.mock("../models/zboruri", () => ({
  Zboruri: { findAll: jest.fn() },
}));

// Mock sequelize.query for the getPachete function
jest.mock("../database", () => ({
  sequelize: {
    query: jest.fn(),
  },
}));

describe("All Tables Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return all camere", async () => {
    // Mock the findAll method of Camere model
    Camere.findAll.mockResolvedValue([
      { id: 1, name: "Camere 1" },
      { id: 2, name: "Camere 2" },
    ]);

    const req = {}; // Mock request
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; // Mock response

    await getCamere(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "Camere 1" },
      { id: 2, name: "Camere 2" },
    ]);
  });

  it("should return all cazare", async () => {
    Cazare.findAll.mockResolvedValue([
      { id: 1, name: "Cazare 1" },
      { id: 2, name: "Cazare 2" },
    ]);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getCazare(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "Cazare 1" },
      { id: 2, name: "Cazare 2" },
    ]);
  });

  //   it("should return all pachete", async () => {
  //     const mockQueryResult = [
  //       { id: 1, pret: 100, descriere: "Pachet 1" },
  //       { id: 2, pret: 200, descriere: "Pachet 2" },
  //     ];

  //     sequelize.query.mockResolvedValue([mockQueryResult]);

  //     const req = {};
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  //     await getPachete(req, res);

  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith(mockQueryResult);
  //   });

  it("should return all zboruri", async () => {
    Zboruri.findAll.mockResolvedValue([
      { id: 1, name: "Zbor 1" },
      { id: 2, name: "Zbor 2" },
    ]);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getZboruri(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "Zbor 1" },
      { id: 2, name: "Zbor 2" },
    ]);
  });
});
