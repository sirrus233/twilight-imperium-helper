import { getTotalCost, sumUnitCounts, UnitCounts } from "./data";
import { DisplayField } from "./DisplayField";

interface Props {
    unitCounts: UnitCounts;
}

export function CalculatorModeDisplay({ unitCounts }: Props) {
    return [
        {
            label: "Total Cost",
            value: getTotalCost(unitCounts),
        },
        {
            label: "Total Capacity",
            value: sumUnitCounts(unitCounts),
        },
    ].map(DisplayField);
}
