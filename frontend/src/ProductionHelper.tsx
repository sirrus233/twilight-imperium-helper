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
import { CalculatorModeDisplay } from "./CalculatorModeDisplay";
import BudgetFilters from "./BudgetFilters";
import { BudgetCard } from "./BudgetCard";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

export default function ProductionHelper() {
    const [unitCounts, setUnitCounts] = useState<UnitCounts>(
        new Map(Object.values(Unit).map((unit) => [unit, 0]))
    );
    const [mode, setMode] = useState(Mode.CALCULATOR);
    const [budgetFilters, setBudgetFilters] = useState(
        new Set([BudgetFilter.RESOURCES, BudgetFilter.PRODUCTION_LIMIT])
    );

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

    function handleBudgetFilterChange(
        checked: boolean,
        budgetFilter: BudgetFilter
    ) {
        const newState = new Set(budgetFilters);

        if (checked) newState.add(budgetFilter);
        else newState.delete(budgetFilter);

        setBudgetFilters(newState);
    }

    function handleClearUnitCounts() {
        setUnitCounts(new Map(Object.values(Unit).map((unit) => [unit, 0])));
    }

    return (
        <Stack spacing={2}>
            <ModeToggle mode={mode} onChange={handleModeChange} />

            {getCalculator(
                mode,
                unitCounts,
                budgetFilters,
                handleBudgetFilterChange
            )}

            <Stack>
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
            </Stack>

            <Box>
                <Button
                    color={"danger"}
                    onClick={() => handleClearUnitCounts()}
                >
                    Clear
                </Button>
            </Box>
        </Stack>
    );
}

function getCalculator(
    mode: Mode,
    unitCounts: UnitCounts,
    budgetFilters: Set<BudgetFilter>,
    handleBudgetFilterChange: (
        checked: boolean,
        budgetFilter: BudgetFilter
    ) => void
) {
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
                        onChange={handleBudgetFilterChange}
                    />
                    <BudgetCard
                        unitCounts={unitCounts}
                        budgetFilters={budgetFilters}
                    />
                </Box>
            );
    }
}
