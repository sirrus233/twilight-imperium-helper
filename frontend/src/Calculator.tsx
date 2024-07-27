import * as React from "react";
import { useState } from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Switch from "@mui/joy/Switch";

enum Unit {
    INFANTRY = "Infantry",
    FIGHTER = "Fighter",
    DESTROYER = "Destroyer",
    MECH = "Mech",
    CRUISER = "Cruiser",
    CARRIER = "Carrier",
    DREADNOUGHT = "Dreadnought",
    FLAGSHIP = "Flagship",
    WAR_SUN = "War Sun",
}

enum Mode {
    CALCULATOR,
    BUDGET,
}

function getUnitCost(unit: Unit): number {
    switch (unit) {
        case Unit.INFANTRY:
            return 0.5;
        case Unit.FIGHTER:
            return 0.5;
        case Unit.DESTROYER:
            return 1;
        case Unit.MECH:
            return 2;
        case Unit.CRUISER:
            return 2;
        case Unit.CARRIER:
            return 3;
        case Unit.DREADNOUGHT:
            return 4;
        case Unit.FLAGSHIP:
            return 8;
        case Unit.WAR_SUN:
            return 12;
    }
}

function getImgPath(unit: Unit): string {
    switch (unit) {
        case Unit.INFANTRY:
            return "";
        case Unit.FIGHTER:
            return "";
        case Unit.DESTROYER:
            return "";
        case Unit.MECH:
            return "";
        case Unit.CRUISER:
            return "";
        case Unit.CARRIER:
            return "";
        case Unit.DREADNOUGHT:
            return "";
        case Unit.FLAGSHIP:
            return "";
        case Unit.WAR_SUN:
            return "";
    }
}

function getHalfCost(count: number): number {
    return Math.ceil(count / 2);
}

function getTotalCost(state: CalculatorState): number {
    return Array.from(state).reduce(
        (acc, [a, b]) =>
            a === Unit.INFANTRY || a === Unit.FIGHTER
                ? acc + getHalfCost(b)
                : acc + getUnitCost(a) * b,
        0
    );
}

function getTotalCapacity(state: CalculatorState): number {
    return Array.from(state).reduce((acc, [, b]) => acc + b, 0);
}

function getFleetSupplyRemaining(
    currentFleetSupply: number,
    maxFleetSupply: number,
    state: CalculatorState
) {
    return Array.from(state).reduce(
        (acc, [a, b]) =>
            a === Unit.INFANTRY || a === Unit.FIGHTER || a === Unit.MECH
                ? acc
                : acc - b,
        maxFleetSupply - currentFleetSupply
    );
}

type UnitCounterProps = {
    unit: Unit;
    unitCost: number;
    unitCount: number;
    imgPath: string;
    onChange: (count: number, unit: Unit) => void;
};

type BudgetInputProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
};

function makeUnitData(
    unit: Unit,
    state: CalculatorState,
    onChange: (count: number, unit: Unit) => void
): UnitCounterProps {
    return {
        unit,
        unitCost: getUnitCost(unit),
        unitCount: state.get(unit) || 0,
        imgPath: getImgPath(unit),
        onChange: onChange,
    };
}

type CalculatorState = Map<Unit, number>;

function UnitCounter(props: UnitCounterProps) {
    return (
        <Stack direction="row" spacing={1}>
            <Box component="img" alt={props.unit} src={props.imgPath} />
            <Typography level="h4">{props.unitCost}</Typography>
            <Input
                type="number"
                value={props.unitCount}
                slotProps={{
                    input: {
                        min: 0,
                        max: 99,
                        step: 1,
                    },
                }}
                onChange={(event) =>
                    props.onChange(Number(event.target.value), props.unit)
                }
            />
        </Stack>
    );
}

function BudgetInput(props: BudgetInputProps) {
    return (
        <Stack direction="row" spacing={1}>
            <Typography level="h4">{props.label}</Typography>
            <Input
                type="number"
                value={props.value}
                onChange={(event) => props.onChange(Number(event.target.value))}
            />
        </Stack>
    );
}

export default function Calculator() {
    const [state, setState] = useState<CalculatorState>(
        new Map(Object.values(Unit).map((unit) => [unit, 0]))
    );

    const [mode, setMode] = useState(Mode.CALCULATOR);
    const [resourceBudget, setResourceBudget] = useState(0);
    const [capacityBudget, setCapacityBudget] = useState(0);
    const [currentFleetSupply, setCurrentFleetSupply] = useState(0);
    const [maxFleetSupply, setMaxFleetSupply] = useState(0);

    function handleUnitCountChange(count: number, unit: Unit) {
        const newState = new Map(state);
        newState.set(unit, count);
        setState(newState);
    }

    function getToggleColor(mode: Mode) {
        switch (mode) {
            case Mode.CALCULATOR:
                return "primary";
            case Mode.BUDGET:
                return "danger";
        }
    }

    function getToggleState(mode: Mode) {
        switch (mode) {
            case Mode.CALCULATOR:
                return false;
            case Mode.BUDGET:
                return true;
        }
    }

    function handleModeChange(mode: Mode) {
        switch (mode) {
            case Mode.CALCULATOR:
                return Mode.BUDGET;
            case Mode.BUDGET:
                return Mode.CALCULATOR;
        }
    }

    return (
        <div>
            <Switch
                color={getToggleColor(mode)}
                checked={getToggleState(mode)}
                startDecorator={<Typography>Calculator</Typography>}
                endDecorator={<Typography>Budget</Typography>}
                onChange={() => setMode(handleModeChange(mode))}
            />

            {mode === Mode.BUDGET && (
                <Box>
                    <Typography level="h4">
                        {`Resources Remaining: ${
                            resourceBudget - getTotalCost(state)
                        }`}
                    </Typography>
                    <Typography level="h4">
                        {`Capacity Remaining: ${
                            capacityBudget - getTotalCapacity(state)
                        }`}
                    </Typography>
                    <Typography level="h4">
                        {`Fleet Supply Remaining: ${getFleetSupplyRemaining(
                            currentFleetSupply,
                            maxFleetSupply,
                            state
                        )}`}
                    </Typography>

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
                </Box>
            )}

            {mode === Mode.CALCULATOR && (
                <Box>
                    <Typography level="h4">
                        {`Total Cost: ${getTotalCost(state)}`}
                    </Typography>
                    <Typography level="h4">
                        {`Total Capacity: ${getTotalCapacity(state)}`}
                    </Typography>
                </Box>
            )}

            {Object.values(Unit).map((unit, i) => (
                <UnitCounter
                    key={i}
                    {...makeUnitData(unit, state, handleUnitCountChange)}
                />
            ))}
        </div>
    );
}
