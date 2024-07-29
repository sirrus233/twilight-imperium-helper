import {
    getFleetSupplyRemaining,
    getTotalCapacity,
    getTotalCost,
    UnitCounts,
} from "./data";
import { DisplayField } from "./DisplayField";

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
    return [
        {
            label: "Resources Remaining",
            value: resourceBudget - getTotalCost(unitCounts),
        },
        {
            label: "Capacity Remaining",
            value: capacityBudget - getTotalCapacity(unitCounts),
        },
        {
            label: "Fleet Supply Remaining",
            value: getFleetSupplyRemaining(
                currentFleetSupply,
                maxFleetSupply,
                unitCounts
            ),
        },
    ].map(DisplayField);
}
