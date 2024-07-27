import * as React from "react";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export function BudgetInput({ label, value, onChange }: Props) {
    return (
        <Stack direction="row" spacing={1}>
            <Typography level="h4">{label}</Typography>
            <Input
                type="number"
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </Stack>
    );
}
