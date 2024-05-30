import React, { FC } from "react";
import { Shipment } from "@utils/typings/types/shipments/shipments.types";

type ShipmentItemProps = {
    shipment: Shipment;
    pricePerUnit: number;
}

const ShipmentItem:FC<ShipmentItemProps> = () => {
    return (
        <div>

        </div>
    );
};

export default ShipmentItem;