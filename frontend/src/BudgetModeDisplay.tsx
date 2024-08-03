import {
    getFighterCount,
    getFleetSupplyRemaining,
    getTotalCost,
    BudgetFilter,
    sumUnitCounts,
    UnitCounts,
} from "./data";
import { DisplayField } from "./DisplayField";

interface Props {
    budgetFilters: Set<BudgetFilter>;
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
    budgetFilters,
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
            visible: budgetFilters.has(BudgetFilter.RESOURCES),
        },
        {
            label: "Production Capacity Remaining",
            value: capacityBudget - sumUnitCounts(unitCounts),
            visible: budgetFilters.has(BudgetFilter.PRODUCTION_LIMIT),
        },
        {
            label: "Fleet Supply Remaining",
            value: getFleetSupplyRemaining(
                currentFleetSupply,
                maxFleetSupply,
                unitCounts,
                unsupportedFighters
            ),
            visible: budgetFilters.has(BudgetFilter.FLEET_SUPPLY),
        },
        {
            label: "Fighter Capacity Remaining",
            value: unsupportedFighters ? 0 : fighterCapacityRemaining,
            visible: budgetFilters.has(BudgetFilter.SHIP_CAPACITY),
        },
    ].map(DisplayField);
}
