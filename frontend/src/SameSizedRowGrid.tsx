import * as React from "react";
import { ReactNode } from "react";
import Grid from "@mui/joy/Grid";

export type FixedSizeRow2 = [ReactNode, ReactNode];
export type FixedSizeRow4 = [ReactNode, ReactNode, ReactNode, ReactNode];

interface Props2 {
    rows: FixedSizeRow2[];
    hiddenColumns?: number[];
}

interface Props4 {
    rows: FixedSizeRow4[];
    hiddenColumns?: number[];
}

export function SameSizedRowGrid({ rows, hiddenColumns }: Props2): ReactNode;
export function SameSizedRowGrid({ rows, hiddenColumns }: Props4): ReactNode;
export function SameSizedRowGrid({
    rows,
    hiddenColumns = [],
}: Props2 | Props4) {
    const numColumns = rows.filter((row) => row !== null)[0].length;
    const hiddenColumnsSet = new Set(hiddenColumns);

    return (
        <Grid
            container
            columns={numColumns - hiddenColumnsSet.size}
            columnSpacing={1}
            rowSpacing={2}
            alignItems="center"
            sx={{ flexGrow: 1 }}
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
