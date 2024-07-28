import * as React from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { Unit } from "./data";

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
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography
                level="body-xs"
                startDecorator={
                    <Box
                        component="img"
                        alt={unit}
                        src={imgPath}
                        maxWidth={44}
                    />
                }
            >
                {unit}
            </Typography>
            <Typography level="h4">{unitCost}</Typography>
            <Input
                type="number"
                value={unitCount}
                slotProps={{
                    input: {
                        min: 0,
                        max: 99,
                        step: 1,
                    },
                }}
                onChange={(event) => onChange(Number(event.target.value), unit)}
            />
        </Stack>
    );
}
