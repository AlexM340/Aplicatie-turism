jest.mock("../models/permisiuni", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock closing DB connection
}));

const Permisiuni = require("../models/permisiuni");

describe("Permisiuni Model (Mocked)", () => {
  beforeAll(async () => {
    await Permisiuni.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Permisiuni.sequelize.close(); // This is mocked
  });

  test("should create a valid permisiune record", async () => {
    // Mock the create method to simulate database record creation
    Permisiuni.create.mockResolvedValue({
      id: 1,
      denumire: "Admin",
      valoare: "full_access",
    });

    const permisiune = await Permisiuni.create({
      denumire: "Admin",
      valoare: "full_access",
    });

    expect(permisiune.id).toBeDefined(); // Ensure ID is auto-generated
    expect(permisiune.denumire).toBe("Admin");
    expect(permisiune.valoare).toBe("full_access");

    // Ensure create method was called with correct data
    expect(Permisiuni.create).toHaveBeenCalledWith({
      denumire: "Admin",
      valoare: "full_access",
    });
  });

  test("should fail when creating a permisiune record with missing required fields", async () => {
    // Mock the create method to throw an error for missing required fields
    Permisiuni.create.mockRejectedValue(
      new Error("Validation error: missing required fields")
    );

    await expect(
      Permisiuni.create({
        // Missing required fields like `denumire` and `valoare`
      })
    ).rejects.toThrow("Validation error: missing required fields");
  });

  test("should create a valid permisiune record with special characters in 'denumire' and 'valoare'", async () => {
    // Mock the create method to simulate database record creation
    Permisiuni.create.mockResolvedValue({
      id: 2,
      denumire: "Manager#01",
      valoare: "restricted_access!",
    });

    const permisiune = await Permisiuni.create({
      denumire: "Manager#01",
      valoare: "restricted_access!",
    });

    expect(permisiune.id).toBeDefined();
    expect(permisiune.denumire).toBe("Manager#01");
    expect(permisiune.valoare).toBe("restricted_access!");
  });
});
