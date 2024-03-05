import { z } from "zod";

import {
    CreateSupplierDtoSchema,
    CreateSupplyDtoSchema,
    GetStatisticsDtoSchema,
    SupplierSchema,
    SupplyProductSchema
} from "@utils/typings/schemas/supplier/supplier.schema";

export type Supplier = z.infer<typeof SupplierSchema>;

export type CreateSupplierDto = z.infer<typeof CreateSupplierDtoSchema>;

export type CreateSupplyDto = z.infer<typeof CreateSupplyDtoSchema>;

export type SupplyProduct = z.infer<typeof SupplyProductSchema>;

export type GetStatisticsDto = z.infer<typeof GetStatisticsDtoSchema>;
