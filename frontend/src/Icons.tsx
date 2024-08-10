import * as React from "react";
import Box from "@mui/joy/Box";

export function PlusIcon() {
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

export function MinusIcon() {
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
