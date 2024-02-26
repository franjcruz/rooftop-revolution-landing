import { ClientDTO } from "../dto";
import ClientsData from "../data/clients.json";

export const ClientApiService = {
  async getClients(): Promise<ClientDTO[]> {
    const clients = await getClientsData();

    return clients;
  },
  async getClient(cups: string): Promise<ClientDTO | null> {
    const clients = await getClientsData();
    const client = clients.find((client) => client.cups === cups);

    return client || null;
  },
};

// This is a implementation to get the clients data from a json file, if we want to get data from http, we can create a "util" to request GET, POST, PUT, DELETE, etc.
const getClientsData = async () => {
  try {
    const response = ClientsData;

    return response;
  } catch (error) {
    console.error("Failed to fetch clients data");
    throw error;
  }
};
