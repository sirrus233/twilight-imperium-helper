import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { Unit } from "./data";
import { InputStepper } from "./InputStepper";
import tradeGoodImgPath from "./assets/trade-good.png";

interface Props {
    unit: Unit;
    unitCost: number;
    unitCount: number;
    imgPath: string;
    onChange: (count: number, unit: Unit) => void;
}

export function UnitCounter({
    unit,
    unitCost,
    unitCount,
    imgPath,
    onChange,
}: Props) {
    return (
        <Stack direction="row" spacing={1} alignItems="center" height="44px">
            <Box
                component="img"
                alt={unit}
                src={imgPath}
                maxWidth={44}
                minWidth={20}
            />
            <Typography
                level="body-xs"
                minWidth={80}
                display={{ xs: "none", sm: "block" }}
            >
                {unit}
            </Typography>
            <Cost cost={unitCost} />
            <InputStepper
                value={unitCount}
                min={0}
                max={99}
                step={1}
                onChange={(value) => onChange(value, unit)}
            />
        </Stack>
    );
}

function Cost(props: { cost: number }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            height="44px"
            overflow="hidden"
        >
            <Typography
                level="body-md"
                textAlign="right"
                maxWidth="3em"
                minWidth="2em"
            >
                {`${props.cost}`}
            </Typography>
            <Box
                component="img"
                alt={"resources"}
                src={tradeGoodImgPath}
                maxWidth={44}
                minWidth={20}
            />
        </Stack>
    );
}
