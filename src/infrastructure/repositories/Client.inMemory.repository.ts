import { ClientRepository } from "@/domain/repositories";
import { Client } from "@/domain/entities";
import { ClientApiService } from "../api";
import { ClientDTO } from "../dto";

export const InMemoryClientRepository: ClientRepository = {
  async getById(cups: string): Promise<Client | null> {
    const client: ClientDTO | null = await ClientApiService.getClient(cups);

    return client ? mapClient(client) : null;
  },
  async getAll(): Promise<Client[]> {
    const clients: ClientDTO[] = await ClientApiService.getClients();

    return clients.map((client: ClientDTO) => mapClient(client));
  },

  //   async create(clientData: Client): Promise<Client> {
  //     const newClient = { ...clientData, id: this.clients.length + 1 };
  //     this.clients.push(newClient);
  //     return newClient;
  //   }

  //   async update(id: number, clientData: Client): Promise<Client | null> {
  //     const index = this.clients.findIndex((client) => client.id === id);
  //     if (index !== -1) {
  //       const updatedClient = { ...clientData, id };
  //       this.clients[index] = updatedClient;
  //       return updatedClient;
  //     }
  //     return null;
  //   }

  //   async delete(id: number): Promise<boolean> {
  //     const index = this.clients.findIndex((client) => client.id === id);
  //     if (index !== -1) {
  //       this.clients.splice(index, 1);
  //       return true;
  //     }
  //     return false;
  //   }
};

const mapClient = (client: ClientDTO): Client => {
  return {
    cups: client.cups,
    fullname: client.full_name,
    address: client.address,
    buildingType: client.building_type,
    role: client.role,
  };
};
