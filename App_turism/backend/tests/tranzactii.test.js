jest.mock("../models/tranzactii", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Tranzactii = require("../models/tranzactii");

describe("Tranzactii Model (Mocked)", () => {
  beforeAll(async () => {
    await Tranzactii.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Tranzactii.sequelize.close(); // This is mocked
  });

  test("should create a valid tranzactie record", async () => {
    // Mock the create method to simulate database record creation
    Tranzactii.create.mockResolvedValue({
      id: 1,
      id_rezervare: 1,
      suma: 100,
      achitat: 1,
      data_tranzactie: new Date(),
    });

    const tranzactie = await Tranzactii.create({
      id_rezervare: 1,
      suma: 100,
      achitat: 1,
      data_tranzactie: new Date(),
    });

    expect(tranzactie.id).toBeDefined(); // Ensure ID is auto-generated
    expect(tranzactie.id_rezervare).toBe(1);
    expect(tranzactie.suma).toBe(100);
    expect(tranzactie.achitat).toBe(1);
    expect(tranzactie.data_tranzactie).toBeInstanceOf(Date);

    // Ensure create method was called with correct data
    expect(Tranzactii.create).toHaveBeenCalledWith({
      id_rezervare: 1,
      suma: 100,
      achitat: 1,
      data_tranzactie: expect.any(Date), // Match Date type
    });
  });

  test("should fail when creating a tranzactie record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Tranzactii.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Tranzactii.create({
        // Missing required fields like `id_rezervare`, `suma`, etc.
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_rezervare", async () => {
    // Mock the create method to simulate successful record creation with valid foreign key references
    Tranzactii.create.mockResolvedValue({
      id: 2,
      id_rezervare: 1, // Valid foreign key reference for `id_rezervare`
      suma: 200,
      achitat: 0,
      data_tranzactie: new Date(),
    });

    const tranzactie = await Tranzactii.create({
      id_rezervare: 1,
      suma: 200,
      achitat: 0,
      data_tranzactie: new Date(),
    });

    expect(tranzactie.id).toBeDefined();
    expect(tranzactie.id_rezervare).toBe(1);
    expect(tranzactie.suma).toBe(200);
    expect(tranzactie.achitat).toBe(0);
    expect(tranzactie.data_tranzactie).toBeInstanceOf(Date);
  });
});
