import * as React from "react";
import Typography from "@mui/joy/Typography";

interface Props {
    label: string;
    value: number;
    visible?: boolean;
}

export function DisplayField({ label, value, visible = true }: Props) {
    const style = value < 0 ? { sx: { color: "red" } } : {};

    return (
        <Typography
            level="h4"
            display={visible ? "block" : "none"}
            {...style}
            key={label}
        >
            {`${label}: ${value}`}
        </Typography>
    );
}
