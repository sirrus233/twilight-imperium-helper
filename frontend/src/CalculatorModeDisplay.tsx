import * as React from "react";
import Typography from "@mui/joy/Typography";
import { getTotalCapacity, getTotalCost, UnitCounts } from "./data";

interface Props {
    unitCounts: UnitCounts;
}

export function CalculatorModeDisplay({ unitCounts }: Props) {
    return (
        <>
            <Typography level="h4">
                {`Total Cost: ${getTotalCost(unitCounts)}`}
            </Typography>
            <Typography level="h4">
                {`Total Capacity: ${getTotalCapacity(unitCounts)}`}
            </Typography>
        </>
    );
}
