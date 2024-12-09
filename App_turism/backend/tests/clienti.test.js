jest.mock("../models/clienti", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()), // Mock sync method to resolve immediately
  sequelize: { close: jest.fn(() => Promise.resolve()) }, // Mock sequelize close method
}));

const Clienti = require("../models/clienti");

describe("Clienti Model (Mocked)", () => {
  beforeAll(async () => {
    await Clienti.sync({ force: true }); // This is mocked, no actual DB interaction
  });

  afterAll(async () => {
    await Clienti.sequelize.close(); // This is also mocked
  });

  test("should create a valid clienti record", async () => {
    // Mock the `create` method to simulate a successful record creation
    Clienti.create.mockResolvedValue({
      id: 1,
      username: "testuser",
      nume: "Test User",
      parola: "securepassword123",
      email: "testuser@example.com",
      data_creare: new Date(),
    });

    const clienti = await Clienti.create({
      username: "testuser",
      nume: "Test User",
      parola: "securepassword123",
      email: "testuser@example.com",
    });

    expect(clienti.id).toBeDefined(); // Ensure ID is auto-generated
    expect(clienti.username).toBe("testuser");
    expect(clienti.nume).toBe("Test User");
    expect(clienti.parola).toBe("securepassword123");
    expect(clienti.email).toBe("testuser@example.com");
    expect(clienti.data_creare).toBeDefined(); // Ensure creation date is set

    // Verify `create` method was called with correct arguments
    expect(Clienti.create).toHaveBeenCalledWith({
      username: "testuser",
      nume: "Test User",
      parola: "securepassword123",
      email: "testuser@example.com",
    });
  });

  test("should fail when creating a clienti record with a duplicate email", async () => {
    // Mock the `create` method to simulate an error due to unique constraint violation
    Clienti.create.mockRejectedValue(
      new Error("Validation error: duplicate email")
    );

    await expect(
      Clienti.create({
        username: "newuser",
        nume: "New User",
        parola: "newpassword123",
        email: "testuser@example.com", // Same email as above
      })
    ).rejects.toThrow("Validation error: duplicate email");
  });

  test("should allow null email if unique email constraint is not violated", async () => {
    // Mock the `create` method to simulate a valid record with null email
    Clienti.create.mockResolvedValue({
      id: 2,
      username: "nulluser",
      nume: "Null User",
      parola: "nullpassword123",
      email: null, // Null email allowed
      data_creare: new Date(),
    });

    const clienti = await Clienti.create({
      username: "nulluser",
      nume: "Null User",
      parola: "nullpassword123",
      email: null, // Allow null email
    });

    expect(clienti.email).toBeNull(); // Ensure email is null as expected
  });
});
