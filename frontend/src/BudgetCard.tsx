import * as React from "react";
import Card from "@mui/joy/Card";
import Checkbox from "@mui/joy/Checkbox";
import Grid from "@mui/joy/Grid";
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
import { GridCell } from "./GridCell";
import { BudgetRow } from "./BudgetRow";

interface Props {
    unitCounts: UnitCounts;
    budgetFilters: Set<BudgetFilter>;
    resourceBudget: number;
    setResourceBudget: (value: number) => void;
    capacityBudget: number;
    setCapacityBudget: (value: number) => void;
    currentFleetSupply: number;
    setCurrentFleetSupply: (value: number) => void;
    maxFleetSupply: number;
    setMaxFleetSupply: (value: number) => void;
    isFighterUpgraded: boolean;
    setIsFighterUpgraded: (value: boolean) => void;
    shipCapacityUsed: number;
    setShipCapacityUsed: (value: number) => void;
    maxShipCapacity: number;
    setMaxShipCapacity: (value: number) => void;
    spaceDockFighterBonus: number;
    setSpaceDockFighterBonus: (value: number) => void;
}

export function BudgetCard({
    unitCounts,
    budgetFilters,
    resourceBudget,
    setResourceBudget,
    capacityBudget,
    setCapacityBudget,
    currentFleetSupply,
    setCurrentFleetSupply,
    maxFleetSupply,
    setMaxFleetSupply,
    isFighterUpgraded,
    setIsFighterUpgraded,
    shipCapacityUsed,
    setShipCapacityUsed,
    maxShipCapacity,
    setMaxShipCapacity,
    spaceDockFighterBonus,
    setSpaceDockFighterBonus,
}: Props) {
    const fighterCapacityRemaining =
        maxShipCapacity +
        spaceDockFighterBonus -
        shipCapacityUsed -
        getFighterCount(unitCounts);

    const unsupportedFighters =
        isFighterUpgraded && fighterCapacityRemaining < 0
            ? Math.abs(fighterCapacityRemaining)
            : 0;

    const inAdvancedMode =
        budgetFilters.has(BudgetFilter.FLEET_SUPPLY) ||
        budgetFilters.has(BudgetFilter.SHIP_CAPACITY);

    const numColumns = 4;

    const hiddenColumns: Set<number> = inAdvancedMode
        ? new Set()
        : new Set([2]);

    return (
        <Card sx={{ mb: 2, maxWidth: "600px" }} variant="plain">
            <Grid
                container
                columnSpacing={1}
                rowSpacing={2}
                columns={numColumns - hiddenColumns.size}
                alignItems="center"
                sx={{ flexGrow: 1 }}
            >
                {
                    <>
                        <BudgetRow hiddenColumns={hiddenColumns}>
                            <div />
                            <HeaderLabel text="Budget" />
                            <HeaderLabel text="Reserved" />
                            <HeaderLabel text="Remaining" />
                        </BudgetRow>

                        {budgetFilters.has(BudgetFilter.RESOURCES) && (
                            <BudgetRow hiddenColumns={hiddenColumns}>
                                <HeaderLabel text="Resources" />
                                <BudgetInput
                                    label="Resource Budget"
                                    isLabelVisible={false}
                                    value={resourceBudget}
                                    onChange={setResourceBudget}
                                />
                                <div />
                                <OverUnderNumber
                                    value={
                                        resourceBudget -
                                        getTotalCost(unitCounts)
                                    }
                                />
                            </BudgetRow>
                        )}

                        {budgetFilters.has(BudgetFilter.PRODUCTION_LIMIT) && (
                            <BudgetRow hiddenColumns={hiddenColumns}>
                                <HeaderLabel text="Production Limit" />
                                <BudgetInput
                                    label="Production Limit Budget"
                                    isLabelVisible={false}
                                    value={capacityBudget}
                                    onChange={setCapacityBudget}
                                />
                                <div />
                                <OverUnderNumber
                                    value={
                                        capacityBudget -
                                        sumUnitCounts(unitCounts)
                                    }
                                />
                            </BudgetRow>
                        )}

                        {budgetFilters.has(BudgetFilter.FLEET_SUPPLY) && (
                            <BudgetRow hiddenColumns={hiddenColumns}>
                                <HeaderLabel text="Fleet Supply" />
                                <BudgetInput
                                    label="Fleet Supply Budget"
                                    isLabelVisible={false}
                                    value={maxFleetSupply}
                                    onChange={setMaxFleetSupply}
                                />
                                <BudgetInput
                                    label="Reserved Fleet Supply"
                                    isLabelVisible={false}
                                    value={currentFleetSupply}
                                    onChange={setCurrentFleetSupply}
                                />
                                <OverUnderNumber
                                    value={getFleetSupplyRemaining(
                                        currentFleetSupply,
                                        maxFleetSupply,
                                        unitCounts,
                                        unsupportedFighters
                                    )}
                                />
                            </BudgetRow>
                        )}

                        {budgetFilters.has(BudgetFilter.SHIP_CAPACITY) && (
                            <BudgetRow hiddenColumns={hiddenColumns}>
                                <HeaderLabel text="Fighter Capacity" />
                                <BudgetInput
                                    label="Fighter Capacity Budget"
                                    isLabelVisible={false}
                                    value={maxShipCapacity}
                                    onChange={setMaxShipCapacity}
                                />
                                <BudgetInput
                                    label="Reserved Fighter Capacity"
                                    isLabelVisible={false}
                                    value={shipCapacityUsed}
                                    onChange={setShipCapacityUsed}
                                />
                                <OverUnderNumber
                                    value={
                                        unsupportedFighters
                                            ? 0
                                            : fighterCapacityRemaining
                                    }
                                />
                            </BudgetRow>
                        )}

                        {inAdvancedMode &&
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
                                    value={spaceDockFighterBonus}
                                    onChange={setSpaceDockFighterBonus}
                                />,
                            ].map((cellContent, i) => (
                                <GridCell
                                    colSpan={Math.floor(numColumns / 2)}
                                    key={i}
                                >
                                    {cellContent}
                                </GridCell>
                            ))}
                    </>
                }
            </Grid>
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
