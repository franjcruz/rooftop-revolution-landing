import { ClientApiService } from "@/infrastructure/api";
import { InMemoryClientRepository } from "@/infrastructure/repositories";

jest.mock("../../src/infrastructure/api/Client.api", () => ({
  ClientApiService: {
    getClient: jest.fn(() => ({
      cups: "1234567890123456",
      full_name: "John Doe",
      address: "Fake St. 123",
      building_type: "house",
      role: "customer",
    })),
    getClients: jest.fn(() => [
      {
        cups: "1234567890123456",
        full_name: "John Doe",
        address: "Fake St. 123",
        building_type: "house",
        role: "customer",
      },
      {
        cups: "1111111111111111",
        full_name: "John Doe",
        address: "Fake St. 123",
        building_type: "house",
        role: "customer",
      },
    ]),
  },
}));

describe("InMemoryClientRepository", () => {
  it("should return a list of clients", async () => {
    const clients = await InMemoryClientRepository.getAll();
    expect(clients).toBeInstanceOf(Array);
    expect(clients).toHaveLength(2);
    expect(clients[0]).toHaveProperty("cups");
  });

  it("should return a client by its cups", async () => {
    const client = await InMemoryClientRepository.getById("1234567890123456");
    expect(client).toEqual({
      cups: "1234567890123456",
      fullname: "John Doe",
      address: "Fake St. 123",
      buildingType: "house",
      role: "customer",
    });
  });

  it("should return null due to cups is not associated to client", async () => {
    jest.spyOn(ClientApiService, "getClient").mockResolvedValueOnce(null);
    const client = await InMemoryClientRepository.getById("11111111111");
    expect(client).toBeNull();
  });
});
