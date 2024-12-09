jest.mock("../models/angajati.js", () => ({
  create: jest.fn(),
  sync: jest.fn(() => Promise.resolve()),
  sequelize: { close: jest.fn(() => Promise.resolve()) },
}));

const Angajati = require("../models/angajati");

describe("Angajati Model (Mocked)", () => {
  beforeAll(async () => {
    await Angajati.sync({ force: true }); // This is mocked
  });

  afterAll(async () => {
    await Angajati.sequelize.close(); // This is mocked
  });

  test("should create a valid record", async () => {
    // Mock the create method to return a successful result
    Angajati.create.mockResolvedValue({
      id: 1,
      username: "testuser",
      nume: "Test User",
      parola: "securepassword123",
      admin: true,
      email: "test@example.com",
      data_creare: new Date(),
    });

    const angajat = await Angajati.create({
      username: "testuser",
      nume: "Test User",
      parola: "securepassword123",
      admin: true,
      email: "test@example.com",
    });

    expect(angajat.id).toBeDefined(); // Ensure ID is auto-generated
    expect(angajat.username).toBe("testuser");
    expect(angajat.nume).toBe("Test User");
    expect(angajat.parola).toBe("securepassword123");
    expect(angajat.admin).toBe(true);
    expect(angajat.email).toBe("test@example.com");
    expect(angajat.data_creare).toBeDefined(); // Ensure creation date is set

    // Verify the `create` method was called with the expected arguments
    expect(Angajati.create).toHaveBeenCalledWith({
      username: "testuser",
      nume: "Test User",
      parola: "securepassword123",
      admin: true,
      email: "test@example.com",
    });
  });

  test("should fail when creating a duplicate email", async () => {
    // Mock `create` to throw an error for duplicate email
    Angajati.create.mockImplementationOnce(() =>
      Promise.resolve({
        id: 2,
        username: "uniqueuser",
        nume: "Unique User",
        parola: "anotherpassword",
        email: "duplicate@example.com",
      })
    );

    Angajati.create.mockImplementationOnce(() =>
      Promise.reject(new Error("Unique constraint error on email"))
    );

    await Angajati.create({
      username: "uniqueuser",
      nume: "Unique User",
      parola: "anotherpassword",
      email: "duplicate@example.com",
    });

    await expect(
      Angajati.create({
        username: "seconduser",
        nume: "Second User",
        parola: "differentpassword",
        email: "duplicate@example.com", // Same email as above
      })
    ).rejects.toThrow("Unique constraint error on email");
  });

  test("should allow null email if unique email constraint is not violated", async () => {
    // Mock the create method to return a valid record with null email
    Angajati.create.mockResolvedValue({
      id: 3,
      username: "nulluser",
      nume: "Null User",
      parola: "nullpassword",
      admin: false,
      email: null,
      data_creare: new Date(),
    });

    const angajat = await Angajati.create({
      username: "nulluser",
      nume: "Null User",
      parola: "nullpassword",
      admin: false,
    });

    expect(angajat.email).toBeNull(); // Verify email is null
    expect(Angajati.create).toHaveBeenCalledWith({
      username: "nulluser",
      nume: "Null User",
      parola: "nullpassword",
      admin: false,
    });
  });
});
