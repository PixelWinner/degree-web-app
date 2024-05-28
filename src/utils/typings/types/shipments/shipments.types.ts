import { CreateShipmentDtoSchema, CreateShipmentFormSchema, ShipmentSchema, ShippedProductSchema } from "@utils/typings/schemas/shipments/shipments.schemas";
import { z } from "zod";

export type Shipment = z.infer<typeof ShipmentSchema>;

export type GetShipmentProductsQuery = {
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
    productName?: string;
}

export type CreateShipmentDto = z.infer<typeof CreateShipmentDtoSchema>;

export type CreateShipmentForm = z.infer<typeof CreateShipmentFormSchema>;

export type ShippedProduct = z.infer<typeof ShippedProductSchema>;
