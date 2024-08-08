import * as React from "react";
import { ReactNode } from "react";
import Grid, { GridProps } from "@mui/joy/Grid";

interface Props {
    rows: (ReactNode[] | null)[];
    hiddenColumns?: number[];
    gridProps: GridProps;
}

export function SameSizedRowGrid({
    rows,
    hiddenColumns = [],
    gridProps,
}: Props) {
    const rowLengths = new Set(
        rows.filter((row) => row !== null).map((row) => row.length)
    );

    if (rowLengths.size !== 1) {
        throw new Error(
            `Must provide at least one row, and each row must have the same number of elements`
        );
    }

    const [numColumns] = Array.from(rowLengths);
    const hiddenColumnsSet = new Set(hiddenColumns);

    return (
        <Grid
            container
            columns={numColumns - hiddenColumnsSet.size}
            {...gridProps}
        >
            {rows.flatMap((row, rowNum) => {
                return row?.map(
                    (cell, colNum) =>
                        !hiddenColumnsSet.has(colNum) && (
                            <Grid xs={1} key={`${rowNum}${colNum}`}>
                                {cell}
                            </Grid>
                        )
                );
            })}
        </Grid>
    );
}
