import { Client } from "@/domain/entities";

export interface ClientRepository {
  getById(cups: string): Promise<Client | null>;
  getAll(): Promise<Client[]>;
}
