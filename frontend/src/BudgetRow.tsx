import * as React from "react";
import { GridCell } from "./GridCell";

type FixedSizeRow = [
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode
];

interface Props {
    children: FixedSizeRow;
    hiddenColumns: Set<number>;
}

export function BudgetRow({ children, hiddenColumns }: Props) {
    return children.map((cell, i) => (
        <GridCell visible={!hiddenColumns.has(i)} key={i}>
            {cell}
        </GridCell>
    ));
}
