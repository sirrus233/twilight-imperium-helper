import {
    getFighterCount,
    getFleetSupplyRemaining,
    getTotalCost,
    sumUnitCounts,
    UnitCounts,
} from "./data";
import { DisplayField } from "./DisplayField";

interface Props {
    resourceBudget: number;
    capacityBudget: number;
    currentFleetSupply: number;
    maxFleetSupply: number;
    unitCounts: UnitCounts;
    isFighterUpgraded: boolean;
    shipCapacityUsed: number;
    maxShipCapacity: number;
    spaceDockFighterBonus: number;
}

export function BudgetModeDisplay({
    resourceBudget,
    capacityBudget,
    currentFleetSupply,
    maxFleetSupply,
    unitCounts,
    isFighterUpgraded,
    shipCapacityUsed,
    maxShipCapacity,
    spaceDockFighterBonus,
}: Props) {
    const fighterCapacityRemaining =
        maxShipCapacity +
        spaceDockFighterBonus -
        shipCapacityUsed -
        getFighterCount(unitCounts);

    return [
        {
            label: "Resources Remaining",
            value: resourceBudget - getTotalCost(unitCounts),
        },
        {
            label: "Production Capacity Remaining",
            value: capacityBudget - sumUnitCounts(unitCounts),
        },
        {
            label: "Fleet Supply Remaining",
            value: getFleetSupplyRemaining(
                currentFleetSupply,
                maxFleetSupply,
                unitCounts,
                isFighterUpgraded
                    ? Math.max(0 - fighterCapacityRemaining, 0)
                    : 0
            ),
        },
        {
            label: "Fighter Capacity Remaining",
            value: isFighterUpgraded
                ? Math.max(fighterCapacityRemaining, 0)
                : fighterCapacityRemaining,
        },
    ].map(DisplayField);
}
