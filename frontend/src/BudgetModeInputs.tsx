import * as React from "react";
import Checkbox from "@mui/joy/Checkbox";
import { BudgetInput } from "./BudgetInput";
import { BudgetFilter } from "./data";

interface Props {
    budgetFilters: Set<BudgetFilter>;
    resourceBudget: number;
    setResourceBudget: (value: number) => void;
    capacityBudget: number;
    setCapacityBudget: (value: number) => void;
    currentFleetSupply: number;
    setCurrentFleetSupply: (value: number) => void;
    maxFleetSupply: number;
    setMaxFleetSupply: (value: number) => void;
    isFighterUpgraded: boolean;
    setIsFighterUpgraded: (value: boolean) => void;
    shipCapacityUsed: number;
    setShipCapacityUsed: (value: number) => void;
    maxShipCapacity: number;
    setMaxShipCapacity: (value: number) => void;
    spaceDockFighterBonus: number;
    setSpaceDockFighterBonus: (value: number) => void;
}

export function BudgetModeInputs({
    budgetFilters,
    resourceBudget,
    setResourceBudget,
    capacityBudget,
    setCapacityBudget,
    currentFleetSupply,
    setCurrentFleetSupply,
    maxFleetSupply,
    setMaxFleetSupply,
    isFighterUpgraded,
    setIsFighterUpgraded,
    shipCapacityUsed,
    setShipCapacityUsed,
    maxShipCapacity,
    setMaxShipCapacity,
    spaceDockFighterBonus,
    setSpaceDockFighterBonus,
}: Props) {
    return (
        <>
            {budgetFilters.has(BudgetFilter.RESOURCES) && (
                <BudgetInput
                    label="Resource Budget"
                    value={resourceBudget}
                    onChange={setResourceBudget}
                />
            )}
            {budgetFilters.has(BudgetFilter.PRODUCTION_LIMIT) && (
                <BudgetInput
                    label="Capacity Budget"
                    value={capacityBudget}
                    onChange={setCapacityBudget}
                />
            )}
            {budgetFilters.has(BudgetFilter.FLEET_SUPPLY) && (
                <>
                    <BudgetInput
                        label="Current Fleet Supply"
                        value={currentFleetSupply}
                        onChange={setCurrentFleetSupply}
                    />
                    <BudgetInput
                        label="Max Fleet Supply"
                        value={maxFleetSupply}
                        onChange={setMaxFleetSupply}
                    />
                </>
            )}
            {budgetFilters.has(BudgetFilter.SHIP_CAPACITY) && (
                <>
                    <BudgetInput
                        label="Ship Capacity Used"
                        value={shipCapacityUsed}
                        onChange={setShipCapacityUsed}
                    />
                    <BudgetInput
                        label="Max Ship Capacity"
                        value={maxShipCapacity}
                        onChange={setMaxShipCapacity}
                    />
                    <BudgetInput
                        label="Space Dock Fighter Bonus"
                        value={spaceDockFighterBonus}
                        onChange={setSpaceDockFighterBonus}
                    />
                </>
            )}
            {(budgetFilters.has(BudgetFilter.FLEET_SUPPLY) ||
                budgetFilters.has(BudgetFilter.SHIP_CAPACITY)) && (
                <Checkbox
                    label="Fighter II"
                    checked={isFighterUpgraded}
                    onChange={() => setIsFighterUpgraded(!isFighterUpgraded)}
                />
            )}
        </>
    );
}
