import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

interface Props {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

export function InputStepper({ value, min, max, step, onChange }: Props) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                borderColor: "background.level1",
            }}
        >
            <IconButton
                size="sm"
                variant="outlined"
                onClick={() => onChange(Math.max(value - step, min))}
            >
                <MinusIcon />
            </IconButton>

            <Typography
                minWidth="2.5em"
                textAlign="center"
                color={value > 0 ? "primary" : "neutral"}
                variant={value > 0 ? "solid" : "plain"}
                fontWeight={value > 0 ? "bold" : "normal"}
                borderRadius={5}
            >
                {value}
            </Typography>

            <IconButton
                size="sm"
                variant="outlined"
                onClick={() => onChange(Math.min(value + step, max))}
            >
                <PlusIcon />
            </IconButton>
        </Box>
    );
}

function MinusIcon() {
    return (
        <Box
            position="absolute"
            boxSizing="border-box"
            height={0}
            width="40%"
            borderTop={"2px solid #888"}
        />
    );
}

function PlusIcon() {
    return (
        <Box
            position="absolute"
            width="40%"
            height="40%"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                position="absolute"
                height={0}
                width="100%"
                borderTop={"2px solid #888"}
            />
            <Box
                position="absolute"
                height="100%"
                width={0}
                borderLeft={"2px solid #888"}
            />
        </Box>
    );
}
