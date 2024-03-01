import { ClientRepository } from "@/domain/repositories";
import { Client } from "@/domain/entities";
import { ClientApiService } from "../api";
import { ClientDTO } from "../dto";

/**
 * In-memory implementation of the ClientRepository interface.
 */
export const ClientRepositoryImplementation: ClientRepository = {
  /**
   * Retrieves a client by their cups identifier.
   * @param cups - The cups identifier of the client.
   * @returns A promise that resolves to the client object if found, or null if not found.
   */
  async getById(cups: string): Promise<Client | null> {
    const client: ClientDTO | null = await ClientApiService.getClient(cups);

    return client ? mapClient(client) : null;
  },

  /**
   * Retrieves all clients.
   * @returns A promise that resolves to an array of client objects.
   */
  async getAll(): Promise<Client[]> {
    const clients: ClientDTO[] = await ClientApiService.getClients();

    return clients.map((client: ClientDTO) => mapClient(client));
  },
};

/**
 * Maps a ClientDTO object to a Client object.
 * @param client - The ClientDTO object to be mapped.
 * @returns The mapped Client object.
 */
const mapClient = (client: ClientDTO): Client => {
  return {
    cups: client.cups,
    fullname: client.full_name,
    address: client.address,
    buildingType: client.building_type,
    role: client.role,
  };
};
