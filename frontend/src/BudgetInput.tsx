import * as React from "react";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { DecoratorStepper } from "./DecoratorStepper";

interface Props {
    label: string;
    isLabelVisible?: boolean;
    value: number;
    placeholder?: string;
    onChange: (value: number) => void;
}

export function BudgetInput({
    label,
    isLabelVisible = false,
    value,
    placeholder = "",
    onChange,
}: Props) {
    const min = 0;
    const max = 999;

    return (
        <Stack spacing={1} maxWidth="100%">
            {isLabelVisible && <Typography level="body-xs">{label}</Typography>}
            <Input
                aria-label={label}
                size="sm"
                sx={{ backgroundColor: "white" }}
                placeholder={placeholder}
                value={value || ""}
                onChange={(event) => {
                    const numValue = Number(event.target.value);

                    if (
                        isNumber(numValue) &&
                        numValue >= min &&
                        numValue <= max
                    ) {
                        onChange(numValue);
                    }
                }}
                endDecorator={
                    <DecoratorStepper
                        value={value}
                        min={min}
                        max={max}
                        step={1}
                        onChange={onChange}
                    />
                }
            />
        </Stack>
    );
}

function isNumber(value: unknown) {
    return typeof value === "number";
}
