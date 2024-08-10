import * as React from "react";
import { Button } from "@mui/base/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import { MinusIcon, PlusIcon } from "./Icons";

interface Props {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

export function DecoratorStepper({ value, min, max, step, onChange }: Props) {
    const buttonStyle: React.CSSProperties = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "17px",
        height: "17px",
        cursor: "pointer",
        backgroundColor: "white",
        border: "none",
    };

    return (
        <Stack>
            <Button
                style={buttonStyle}
                onClick={() => onChange(Math.min(value + step, max))}
                aria-label="increment"
            >
                <PlusIcon />
            </Button>
            <Divider />
            <Button
                style={buttonStyle}
                onClick={() => onChange(Math.max(value - step, min))}
                aria-label="decrement"
            >
                <MinusIcon />
            </Button>
        </Stack>
    );
}
