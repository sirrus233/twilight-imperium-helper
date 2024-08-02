import * as React from "react";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import { BudgetFilter } from "./data";

interface Props {
    budgetFilters: Set<BudgetFilter>;
    onChange: (checked: boolean, budgetFilter: BudgetFilter) => void;
}

export default function BudgetFilters({ budgetFilters, onChange }: Props) {
    return (
        <Box pt={2} pb={2}>
            <Typography>Help me with:</Typography>
            <List
                orientation="horizontal"
                wrap
                sx={{
                    "--List-gap": "8px",
                    "--ListItem-radius": "20px",
                }}
            >
                {Object.values(BudgetFilter).map((budgetFilter) => {
                    const checked = budgetFilters.has(budgetFilter);
                    return (
                        <ListItem key={budgetFilter}>
                            <Checkbox
                                disableIcon
                                label={budgetFilter}
                                variant={checked ? "soft" : "outlined"}
                                overlay
                                checked={checked}
                                onChange={() =>
                                    onChange(!checked, budgetFilter)
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
