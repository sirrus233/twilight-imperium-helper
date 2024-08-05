import * as React from "react";
import Grid from "@mui/joy/Grid";

interface Props {
    children?: React.ReactNode;
    visible?: boolean;
    colSpan?: number;
}

export function GridCell({ visible = true, colSpan = 1, children }: Props) {
    return visible && <Grid xs={colSpan}>{children}</Grid>;
}
