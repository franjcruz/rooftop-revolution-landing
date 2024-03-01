import { SupplyPoint } from "@/domain/entities";
import { SupplyPointRepository } from "@/domain/repositories";
import { SupplyPointDTO } from "../dto";
import { SupplyPointApiService } from "../api";

/**
 * In-memory implementation of the SupplyPointRepository interface.
 */
export const SupplyPointRepositoryImplementation: SupplyPointRepository = {
  /**
   * Retrieves a supply point by its cups identifier.
   * @param cups - The cups identifier of the supply point.
   * @returns A Promise that resolves to the found supply point, or null if not found.
   */
  async getById(cups: string): Promise<SupplyPoint | null> {
    const supplyPoint: SupplyPointDTO | null =
      await SupplyPointApiService.getSupplyPoint(cups);

    return supplyPoint ? mapSupplyPoint(supplyPoint) : null;
  },

  /**
   * Retrieves all supply points.
   * @returns A Promise that resolves to an array of all supply points.
   */
  async getAll(): Promise<SupplyPoint[]> {
    const supplyPoints: SupplyPointDTO[] =
      await SupplyPointApiService.getSupplyPoints();

    return supplyPoints.map((supplyPoint: SupplyPointDTO) =>
      mapSupplyPoint(supplyPoint)
    );
  },
};

/**
 * Maps a SupplyPointDTO object to a SupplyPoint object.
 * @param supplyPoint - The SupplyPointDTO object to be mapped.
 * @returns The mapped SupplyPoint object.
 */
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
