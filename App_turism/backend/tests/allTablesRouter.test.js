const request = require("supertest");
const express = require("express");
const allTablesRoutes = require("../routes/allTablesRoutes");
const {
  getCamere,
  getCazare,
  getPachete,
  getZboruri,
} = require("../controllers/allTablesController");

jest.mock("../controllers/allTablesController");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use("/api", allTablesRoutes); // Use the routes in the app

describe("All Tables Routes", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("GET /api/camere - should call getCamere controller", async () => {
    // Mock the response of the controller
    getCamere.mockImplementation((req, res) => {
      res.status(200).json([
        { id: 1, name: "Camere 1" },
        { id: 2, name: "Camere 2" },
      ]);
    });

    const response = await request(app).get("/api/camere");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Camere 1" },
      { id: 2, name: "Camere 2" },
    ]);
    expect(getCamere).toHaveBeenCalled();
  });

  it("GET /api/cazare - should call getCazare controller", async () => {
    getCazare.mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, name: "Cazare 1" }]);
    });

    const response = await request(app).get("/api/cazare");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Cazare 1" }]);
    expect(getCazare).toHaveBeenCalled();
  });

  it("GET /api/pachete - should call getPachete controller", async () => {
    getPachete.mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, name: "Pachet 1" }]);
    });

    const response = await request(app).get("/api/pachete");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Pachet 1" }]);
    expect(getPachete).toHaveBeenCalled();
  });

  it("GET /api/zboruri - should call getZboruri controller", async () => {
    getZboruri.mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, name: "Zbor 1" }]);
    });

    const response = await request(app).get("/api/zboruri");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Zbor 1" }]);
    expect(getZboruri).toHaveBeenCalled();
  });

  it("GET /api/unknown - should return 404 for unknown routes", async () => {
    const response = await request(app).get("/api/unknown");

    expect(response.status).toBe(404); // Supertest automatically verifies 404
  });
});
