import * as React from "react";
import { BudgetInput } from "./BudgetInput";

interface Props {
    resourceBudget: number;
    setResourceBudget: (value: number) => void;
    capacityBudget: number;
    setCapacityBudget: (value: number) => void;
    currentFleetSupply: number;
    setCurrentFleetSupply: (value: number) => void;
    maxFleetSupply: number;
    setMaxFleetSupply: (value: number) => void;
}

export function BudgetModeInputs({
    resourceBudget,
    setResourceBudget,
    capacityBudget,
    setCapacityBudget,
    currentFleetSupply,
    setCurrentFleetSupply,
    maxFleetSupply,
    setMaxFleetSupply,
}: Props) {
    return (
        <>
            <BudgetInput
                label="Resource Budget"
                value={resourceBudget}
                onChange={setResourceBudget}
            />
            <BudgetInput
                label="Capacity Budget"
                value={capacityBudget}
                onChange={setCapacityBudget}
            />
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
    );
}
