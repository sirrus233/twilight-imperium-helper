import * as React from "react";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import { Mode } from "./data";

interface Props {
    mode: Mode;
    onChange: () => void;
}

export function ModeToggle({ mode, onChange }: Props) {
    function getToggleColor(mode: Mode) {
        switch (mode) {
            case Mode.CALCULATOR:
                return "primary";
            case Mode.BUDGET:
                return "danger";
        }
    }

    function getToggleState(mode: Mode) {
        switch (mode) {
            case Mode.CALCULATOR:
                return false;
            case Mode.BUDGET:
                return true;
        }
    }

    return (
        <div>
            <Switch
                color={getToggleColor(mode)}
                checked={getToggleState(mode)}
                startDecorator={<Typography>Calculator</Typography>}
                endDecorator={<Typography>Budget</Typography>}
                onChange={() => onChange()}
            />
        </div>
    );
}
