/* eslint-disable @typescript-eslint/no-empty-interface */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSProp } from "styled-components";

import { Theme } from "@mui/material";

declare module "styled-components" {
    declare interface DefaultTheme extends Theme {}
}

declare module "react" {
    interface DOMAttributes<T> {
        css?: CSSProp;
    }
}
