import * as React from "react";
import Box from "@mui/joy/Box";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";

interface Props {
    text: string;
}

export function InfoIcon({ text }: Props) {
    return (
        <Tooltip title={text} enterTouchDelay={0}>
            <Box
                borderRadius="50%"
                border="1px solid black"
                ml="5px"
                width="15px"
                height="15px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="9px"
                    sx={{ cursor: "default" }}
                >
                    i
                </Typography>
            </Box>
        </Tooltip>
    );
}
