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
            <Typography level="h4" maxWidth="3em" minWidth="2em">
                {unitCost}
            </Typography>
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
                sx={{
                    maxWidth: "4em",
                    minWidth: "4em",
                }}
            />
        </Stack>
    );
}
