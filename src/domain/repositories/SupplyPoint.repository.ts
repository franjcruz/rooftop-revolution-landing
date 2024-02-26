import { SupplyPoint } from "@/domain/entities";

export interface SupplyPointRepository {
  getById(cups: string): Promise<SupplyPoint | null>;
  getAll(): Promise<SupplyPoint[]>;
}
