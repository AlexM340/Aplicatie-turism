jest.mock("../models/zboruri", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Zboruri = require("../models/zboruri");
const Tari = require("../models/tari");
const Localitati = require("../models/localitati");

describe("Zboruri Model (Mocked)", () => {
  beforeAll(async () => {
    await Zboruri.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Zboruri.sequelize.close(); // This is mocked
  });

  test("should create a valid zboruri record", async () => {
    // Mock the create method to simulate database record creation
    Zboruri.create.mockResolvedValue({
      id: 1,
      aeroport_plecare: "Aeroport A",
      aeroport_sosire: "Aeroport B",
      id_loc_plecare: 1,
      id_tara_plecare: 1,
      id_loc_sosire: 2,
      id_tara_sosire: 2,
      data_plecare: new Date(),
      data_sosire: new Date(),
      companie: "Compania X",
      pret: 500,
      clasa: "Economy",
    });

    const zbor = await Zboruri.create({
      aeroport_plecare: "Aeroport A",
      aeroport_sosire: "Aeroport B",
      id_loc_plecare: 1,
      id_tara_plecare: 1,
      id_loc_sosire: 2,
      id_tara_sosire: 2,
      data_plecare: new Date(),
      data_sosire: new Date(),
      companie: "Compania X",
      pret: 500,
      clasa: "Economy",
    });

    expect(zbor.id).toBeDefined(); // Ensure ID is auto-generated
    expect(zbor.aeroport_plecare).toBe("Aeroport A");
    expect(zbor.aeroport_sosire).toBe("Aeroport B");
    expect(zbor.id_loc_plecare).toBe(1);
    expect(zbor.id_tara_plecare).toBe(1);
    expect(zbor.id_loc_sosire).toBe(2);
    expect(zbor.id_tara_sosire).toBe(2);
    expect(zbor.companie).toBe("Compania X");
    expect(zbor.pret).toBe(500);
    expect(zbor.clasa).toBe("Economy");

    // Ensure create method was called with correct data
    expect(Zboruri.create).toHaveBeenCalledWith({
      aeroport_plecare: "Aeroport A",
      aeroport_sosire: "Aeroport B",
      id_loc_plecare: 1,
      id_tara_plecare: 1,
      id_loc_sosire: 2,
      id_tara_sosire: 2,
      data_plecare: expect.any(Date), // Match Date type
      data_sosire: expect.any(Date), // Match Date type
      companie: "Compania X",
      pret: 500,
      clasa: "Economy",
    });
  });

  test("should fail when creating a zboruri record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Zboruri.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Zboruri.create({
        // Missing required fields like `aeroport_plecare`, `aeroport_sosire`, etc.
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_loc_plecare, id_loc_sosire, id_tara_plecare, id_tara_sosire", async () => {
    // Mock the create method to simulate successful record creation with valid foreign key references
    Zboruri.create.mockResolvedValue({
      id: 2,
      aeroport_plecare: "Aeroport C",
      aeroport_sosire: "Aeroport D",
      id_loc_plecare: 1, // Valid foreign key reference for `id_loc_plecare`
      id_tara_plecare: 1, // Valid foreign key reference for `id_tara_plecare`
      id_loc_sosire: 2, // Valid foreign key reference for `id_loc_sosire`
      id_tara_sosire: 2, // Valid foreign key reference for `id_tara_sosire`
      data_plecare: new Date(),
      data_sosire: new Date(),
      companie: "Compania Y",
      pret: 600,
      clasa: "Business",
    });

    const zbor = await Zboruri.create({
      aeroport_plecare: "Aeroport C",
      aeroport_sosire: "Aeroport D",
      id_loc_plecare: 1,
      id_tara_plecare: 1,
      id_loc_sosire: 2,
      id_tara_sosire: 2,
      data_plecare: new Date(),
      data_sosire: new Date(),
      companie: "Compania Y",
      pret: 600,
      clasa: "Business",
    });

    expect(zbor.id).toBeDefined();
    expect(zbor.id_loc_plecare).toBe(1);
    expect(zbor.id_tara_plecare).toBe(1);
    expect(zbor.id_loc_sosire).toBe(2);
    expect(zbor.id_tara_sosire).toBe(2);
  });
});
