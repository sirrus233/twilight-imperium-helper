import * as React from "react";
import { useState } from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Checkbox from "@mui/joy/Checkbox";
import Typography from "@mui/joy/Typography";
import { BudgetInput } from "./BudgetInput";
import {
    BudgetFilter,
    getFighterCount,
    getFleetSupplyRemaining,
    getTotalCost,
    sumUnitCounts,
    UnitCounts,
} from "./data";
import { OverUnderNumber } from "./OverUnderNumber";
import { InfoIcon } from "./InfoIcon";
import { SameSizedRowGrid, FixedSizeRow4 } from "./SameSizedRowGrid";

interface Props {
    unitCounts: UnitCounts;
    budgetFilters: Set<BudgetFilter>;
}

export function BudgetCard({ unitCounts, budgetFilters }: Props) {
    const [resourceBudget, setResourceBudget] = useState(0);
    const [productionLimit, setProductionLimit] = useState(0);
    const [fleetSupplyInUse, setFleetSupplyInUse] = useState(0);
    const [fleetSupplyBudget, setFleetSupplyBudget] = useState(0);
    const [isFighterUpgraded, setIsFighterUpgraded] = useState(false);
    const [fighterCapacityInUse, setFighterCapacityInUse] = useState(0);
    const [fighterCapacityBudget, setFighterCapacityBudget] = useState(0);
    const [spaceDockFighterBonus, setSpaceDockFighterBonus] = useState(0);

    const fighterCapacityRemaining =
        fighterCapacityBudget +
        spaceDockFighterBonus -
        fighterCapacityInUse -
        getFighterCount(unitCounts);

    const unsupportedFighters =
        isFighterUpgraded && fighterCapacityRemaining < 0
            ? Math.abs(fighterCapacityRemaining)
            : 0;

    const inAdvancedMode =
        budgetFilters.has(BudgetFilter.FLEET_SUPPLY) ||
        budgetFilters.has(BudgetFilter.SHIP_CAPACITY);

    const rows: FixedSizeRow4[] = [];

    rows.push([
        <div />,
        <HeaderLabel text="Budget" />,
        <Stack direction="row">
            <HeaderLabel text="In Use" />
            <InfoIcon text="Capacity already in use before beginning production" />
        </Stack>,
        <HeaderLabel text="Remaining" />,
    ]);

    if (budgetFilters.has(BudgetFilter.RESOURCES)) {
        rows.push([
            <HeaderLabel text="Resources" />,
            <BudgetInput
                label="Resource Budget"
                placeholder="$"
                value={resourceBudget}
                onChange={setResourceBudget}
            />,
            <div />,
            <OverUnderNumber
                value={resourceBudget - getTotalCost(unitCounts)}
            />,
        ]);
    }

    if (budgetFilters.has(BudgetFilter.PRODUCTION_LIMIT)) {
        rows.push([
            <HeaderLabel text="Production Limit" />,
            <BudgetInput
                label="Production Limit Budget"
                placeholder="units"
                value={productionLimit}
                onChange={setProductionLimit}
            />,
            <div />,
            <OverUnderNumber
                value={productionLimit - sumUnitCounts(unitCounts)}
            />,
        ]);
    }

    if (budgetFilters.has(BudgetFilter.FLEET_SUPPLY)) {
        rows.push([
            <HeaderLabel text="Fleet Supply" />,
            <BudgetInput
                label="Fleet Supply Budget"
                placeholder="ships"
                value={fleetSupplyBudget}
                onChange={setFleetSupplyBudget}
            />,
            <BudgetInput
                label="Fleet Supply In Use"
                placeholder="ships"
                value={fleetSupplyInUse}
                onChange={setFleetSupplyInUse}
            />,
            <OverUnderNumber
                value={getFleetSupplyRemaining(
                    fleetSupplyInUse,
                    fleetSupplyBudget,
                    unitCounts,
                    unsupportedFighters
                )}
            />,
        ]);
    }

    if (budgetFilters.has(BudgetFilter.SHIP_CAPACITY)) {
        rows.push([
            <HeaderLabel text="Fighter Capacity" />,
            <BudgetInput
                label="Fighter Capacity Budget"
                placeholder="units"
                value={fighterCapacityBudget}
                onChange={setFighterCapacityBudget}
            />,
            <BudgetInput
                label="Fighter Capacity In Use"
                placeholder="units"
                value={fighterCapacityInUse}
                onChange={setFighterCapacityInUse}
            />,
            <OverUnderNumber
                value={unsupportedFighters ? 0 : fighterCapacityRemaining}
            />,
        ]);
    }

    return (
        <Card sx={{ mb: 2, maxWidth: "600px" }} variant="plain">
            <SameSizedRowGrid
                hiddenColumns={inAdvancedMode ? [] : [2]}
                rows={rows}
            />

            {inAdvancedMode && (
                <SameSizedRowGrid
                    rows={[
                        [
                            <Checkbox
                                size="sm"
                                label="Fighter II"
                                checked={isFighterUpgraded}
                                onChange={() =>
                                    setIsFighterUpgraded(!isFighterUpgraded)
                                }
                            />,
                            <BudgetInput
                                label="Space Dock Fighter Bonus"
                                placeholder="units"
                                isLabelVisible
                                value={spaceDockFighterBonus}
                                onChange={setSpaceDockFighterBonus}
                            />,
                        ],
                    ]}
                />
            )}
        </Card>
    );
}

function HeaderLabel({ text }: { text: string }) {
    return (
        <Typography level="body-xs" fontWeight="bold">
            {text}
        </Typography>
    );
}
