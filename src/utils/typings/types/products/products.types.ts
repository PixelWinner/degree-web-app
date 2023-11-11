import { z } from "zod";

import { ProductSchema } from "@utils/typings/schemas/products/products.schemas";

export type Product = z.infer<typeof ProductSchema>;
