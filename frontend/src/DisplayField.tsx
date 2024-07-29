import * as React from "react";
import Typography from "@mui/joy/Typography";

interface Props {
    label: string;
    value: number;
}

export function DisplayField({ label, value }: Props) {
    const style = value < 0 ? { sx: { color: "red" } } : {};

    return (
        <Typography level="h4" {...style} key={label}>
            {`${label}: ${value}`}
        </Typography>
    );
}
