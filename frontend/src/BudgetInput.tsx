import * as React from "react";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

interface Props {
    label: string;
    isLabelVisible?: boolean;
    value: number;
    onChange: (value: number) => void;
}

export function BudgetInput({
    label,
    isLabelVisible = true,
    value,
    onChange,
}: Props) {
    return (
        <Stack spacing={1} maxWidth="100%">
            {isLabelVisible && <Typography level="body-xs">{label}</Typography>}
            <Input
                aria-label={label}
                size="sm"
                type="number"
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </Stack>
    );
}
