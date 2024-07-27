import * as React from "react";
import Typography from "@mui/joy/Typography";
import {
    getFleetSupplyRemaining,
    getTotalCapacity,
    getTotalCost,
    UnitCounts,
} from "./data";

interface Props {
    resourceBudget: number;
    capacityBudget: number;
    currentFleetSupply: number;
    maxFleetSupply: number;
    unitCounts: UnitCounts;
}

export function BudgetModeDisplay({
    resourceBudget,
    capacityBudget,
    currentFleetSupply,
    maxFleetSupply,
    unitCounts,
}: Props) {
    return (
        <>
            <Typography level="h4">
                {`Resources Remaining: ${
                    resourceBudget - getTotalCost(unitCounts)
                }`}
            </Typography>
            <Typography level="h4">
                {`Capacity Remaining: ${
                    capacityBudget - getTotalCapacity(unitCounts)
                }`}
            </Typography>
            <Typography level="h4">
                {`Fleet Supply Remaining: ${getFleetSupplyRemaining(
                    currentFleetSupply,
                    maxFleetSupply,
                    unitCounts
                )}`}
            </Typography>
        </>
    );
}
