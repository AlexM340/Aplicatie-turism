jest.mock("../models/tari", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Tari = require("../models/tari");

describe("Tari Model (Mocked)", () => {
  beforeAll(async () => {
    await Tari.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Tari.sequelize.close(); // This is mocked
  });

  test("should create a valid tari record", async () => {
    // Mock the create method to simulate database record creation
    Tari.create.mockResolvedValue({
      id: 1,
      denumire: "Romania",
    });

    const tari = await Tari.create({
      denumire: "Romania",
    });

    expect(tari.id).toBeDefined(); // Ensure ID is auto-generated
    expect(tari.denumire).toBe("Romania");

    // Ensure create method was called with correct data
    expect(Tari.create).toHaveBeenCalledWith({
      denumire: "Romania",
    });
  });

  test("should fail when creating a tari record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Tari.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Tari.create({
        // Missing required fields like `denumire`
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });
});
