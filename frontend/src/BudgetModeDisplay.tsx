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

    const unsupportedFighters =
        isFighterUpgraded && fighterCapacityRemaining < 0
            ? Math.abs(fighterCapacityRemaining)
            : 0;

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
                unsupportedFighters
            ),
        },
        {
            label: "Fighter Capacity Remaining",
            value: unsupportedFighters ? 0 : fighterCapacityRemaining,
        },
    ].map(DisplayField);
}
