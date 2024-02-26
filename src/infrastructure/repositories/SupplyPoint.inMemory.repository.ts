import { SupplyPoint } from "@/domain/entities";
import { SupplyPointRepository } from "@/domain/repositories";
import { SupplyPointDTO } from "../dto";
import { SupplyPointApiService } from "../api";

export const InMemorySupplyPointRepository: SupplyPointRepository = {
  async getById(cups: string): Promise<SupplyPoint | null> {
    const supplyPoint: SupplyPointDTO | null =
      await SupplyPointApiService.getSupplyPoint(cups);

    return supplyPoint ? mapSupplyPoint(supplyPoint) : null;
  },
  async getAll(): Promise<SupplyPoint[]> {
    const supplyPoints: SupplyPointDTO[] =
      await SupplyPointApiService.getSupplyPoints();

    return supplyPoints.map((supplyPoint: SupplyPointDTO) =>
      mapSupplyPoint(supplyPoint)
    );
  },
};

const mapSupplyPoint = (supplyPoint: SupplyPointDTO): SupplyPoint => {
  return {
    cups: supplyPoint.cups,
    tariff: supplyPoint.tariff,
    invoicedAmount: parseFloat(supplyPoint.invoiced_amount),
    power: {
      p1: parseFloat(supplyPoint.power?.p1),
      p2: parseFloat(supplyPoint.power?.p2),
    },
    neighbors: supplyPoint.neighbors,
  };
};
