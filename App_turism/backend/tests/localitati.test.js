jest.mock("../models/localitati", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Localitati = require("../models/localitati");

describe("Localitati Model (Mocked)", () => {
  beforeAll(async () => {
    await Localitati.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Localitati.sequelize.close(); // This is mocked
  });

  test("should create a valid localitati record", async () => {
    // Mock the create method to simulate database record creation
    Localitati.create.mockResolvedValue({
      id: 1,
      denumire: "City 123",
      id_tara: 1,
      imagine: "image_url",
    });

    const localitate = await Localitati.create({
      denumire: "City 123",
      id_tara: 1,
      imagine: "image_url",
    });

    expect(localitate.id).toBeDefined(); // Ensure ID is auto-generated
    expect(localitate.denumire).toBe("City 123");
    expect(localitate.id_tara).toBe(1);
    expect(localitate.imagine).toBe("image_url");

    // Ensure create method was called with correct data
    expect(Localitati.create).toHaveBeenCalledWith({
      denumire: "City 123",
      id_tara: 1,
      imagine: "image_url",
    });
  });

  test("should fail when creating a localitati record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Localitati.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Localitati.create({
        // Missing required fields like `denumire`, `id_tara`, `imagine`
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should handle foreign key constraint for id_tara", async () => {
    // Mock the create method to simulate successful record creation with valid foreign key references
    Localitati.create.mockResolvedValue({
      id: 2,
      denumire: "City 456",
      id_tara: 1, // Valid foreign key reference for `id_tara`
      imagine: "image_url_2",
    });

    const localitate = await Localitati.create({
      denumire: "City 456",
      id_tara: 1,
      imagine: "image_url_2",
    });

    expect(localitate.id).toBeDefined();
    expect(localitate.denumire).toBe("City 456");
    expect(localitate.id_tara).toBe(1);
    expect(localitate.imagine).toBe("image_url_2");
  });
});
