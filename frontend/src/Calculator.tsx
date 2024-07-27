import * as React from "react";
import { useState } from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

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
            a == Unit.INFANTRY || a == Unit.FIGHTER
                ? acc + getHalfCost(b)
                : acc + getUnitCost(a) * b,
        0
    );
}

function getTotalCapacity(state: CalculatorState): number {
    return Array.from(state).reduce((acc, [, b]) => acc + b, 0);
}

type UnitCounterProps = {
    unit: Unit;
    unitCost: number;
    unitCount: number;
    imgPath: string;
    onChange: (count: number, unit: Unit) => void;
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

export default function Calculator() {
    const [state, setState] = useState<CalculatorState>(
        new Map(Object.values(Unit).map((unit) => [unit, 0]))
    );

    function handleUnitCountChange(count: number, unit: Unit) {
        const newState = new Map(state);
        newState.set(unit, count);
        setState(newState);
    }

    return (
        <div>
            <Typography level="h4">{`Total Cost: ${getTotalCost(
                state
            )}`}</Typography>
            <Typography level="h4">{`Total Capacity: ${getTotalCapacity(
                state
            )}`}</Typography>
            {Object.values(Unit).map((unit) => (
                <UnitCounter
                    {...makeUnitData(unit, state, handleUnitCountChange)}
                />
            ))}
        </div>
    );
}
