import * as React from "react";
import Chip from "@mui/joy/Chip";

interface Props {
    value: number;
}

export function OverUnderNumber({ value }: Props) {
    return (
        <Chip
            variant="solid"
            color={value < 0 ? "danger" : "success"}
            sx={{ minWidth: "40px", textAlign: "center" }}
        >
            {value}
        </Chip>
    );
}
