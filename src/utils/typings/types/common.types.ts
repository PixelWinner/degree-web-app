import { z } from "zod";

import { DynamicFieldSchema } from "@utils/typings/schemas/common.schemas";

export type DynamicField = z.infer<typeof DynamicFieldSchema>;
