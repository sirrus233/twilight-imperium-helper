import * as React from "react";
import { useState } from "react";
import Box from "@mui/joy/Box";
import { ModeToggle } from "./ModeToggle";
import {
    Unit,
    Mode,
    getUnitCost,
    getImgPath,
    UnitCounts,
    BudgetFilter,
} from "./data";
import { UnitCounter } from "./UnitCounter";
import { BudgetModeDisplay } from "./BudgetModeDisplay";
import { BudgetModeInputs } from "./BudgetModeInputs";
import { CalculatorModeDisplay } from "./CalculatorModeDisplay";
import BudgetFilters from "./BudgetFilters";

export default function ProductionHelper() {
    const [unitCounts, setUnitCounts] = useState<UnitCounts>(
        new Map(Object.values(Unit).map((unit) => [unit, 0]))
    );
    const [mode, setMode] = useState(Mode.CALCULATOR);
    const [budgetFilters, setBudgetFilters] = useState(
        new Set([BudgetFilter.RESOURCES, BudgetFilter.PRODUCTION_LIMIT])
    );
    const [resourceBudget, setResourceBudget] = useState(0);
    const [capacityBudget, setCapacityBudget] = useState(0);
    const [currentFleetSupply, setCurrentFleetSupply] = useState(0);
    const [maxFleetSupply, setMaxFleetSupply] = useState(0);
    const [isFighterUpgraded, setIsFighterUpgraded] = useState(false);
    const [shipCapacityUsed, setShipCapacityUsed] = useState(0);
    const [maxShipCapacity, setMaxShipCapacity] = useState(0);
    const [spaceDockFighterBonus, setSpaceDockFighterBonus] = useState(0);

    function handleModeChange() {
        switch (mode) {
            case Mode.CALCULATOR:
                return setMode(Mode.BUDGET);
            case Mode.BUDGET:
                return setMode(Mode.CALCULATOR);
        }
    }

    function handleUnitCountChange(count: number, unit: Unit) {
        const newState = new Map(unitCounts);
        newState.set(unit, count);
        setUnitCounts(newState);
    }

    function handleBudgetFiltersChange(
        checked: boolean,
        budgetFilter: BudgetFilter
    ) {
        const newState = new Set(budgetFilters);

        if (checked) newState.add(budgetFilter);
        else newState.delete(budgetFilter);

        setBudgetFilters(newState);
    }

    function Calculator() {
        switch (mode) {
            case Mode.CALCULATOR:
                return (
                    <Box>
                        <CalculatorModeDisplay unitCounts={unitCounts} />
                    </Box>
                );
            case Mode.BUDGET:
                return (
                    <Box>
                        <BudgetFilters
                            budgetFilters={budgetFilters}
                            onChange={handleBudgetFiltersChange}
                        />
                        <BudgetModeDisplay
                            budgetFilters={budgetFilters}
                            resourceBudget={resourceBudget}
                            capacityBudget={capacityBudget}
                            currentFleetSupply={currentFleetSupply}
                            maxFleetSupply={maxFleetSupply}
                            unitCounts={unitCounts}
                            isFighterUpgraded={isFighterUpgraded}
                            shipCapacityUsed={shipCapacityUsed}
                            maxShipCapacity={maxShipCapacity}
                            spaceDockFighterBonus={spaceDockFighterBonus}
                        />
                        <BudgetModeInputs
                            budgetFilters={budgetFilters}
                            resourceBudget={resourceBudget}
                            setResourceBudget={setResourceBudget}
                            capacityBudget={capacityBudget}
                            setCapacityBudget={setCapacityBudget}
                            currentFleetSupply={currentFleetSupply}
                            setCurrentFleetSupply={setCurrentFleetSupply}
                            maxFleetSupply={maxFleetSupply}
                            setMaxFleetSupply={setMaxFleetSupply}
                            isFighterUpgraded={isFighterUpgraded}
                            setIsFighterUpgraded={setIsFighterUpgraded}
                            shipCapacityUsed={shipCapacityUsed}
                            setShipCapacityUsed={setShipCapacityUsed}
                            maxShipCapacity={maxShipCapacity}
                            setMaxShipCapacity={setMaxShipCapacity}
                            spaceDockFighterBonus={spaceDockFighterBonus}
                            setSpaceDockFighterBonus={setSpaceDockFighterBonus}
                        />
                    </Box>
                );
        }
    }

    return (
        <div>
            <ModeToggle mode={mode} onChange={handleModeChange} />
            <Calculator />
            {Object.values(Unit).map((unit, i) => (
                <UnitCounter
                    key={i}
                    unit={unit}
                    unitCost={getUnitCost(unit)}
                    unitCount={unitCounts.get(unit) || 0}
                    imgPath={getImgPath(unit)}
                    onChange={handleUnitCountChange}
                />
            ))}
        </div>
    );
}
