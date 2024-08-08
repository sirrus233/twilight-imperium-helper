import { CssVarsProvider, extendTheme } from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";
import React from "react";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductionHelper from "./ProductionHelper";

const theme = extendTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 230,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default function App() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <DrawerNavigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
    );
}

function Home() {
    return (
        <div>
            <ProductionHelper />
        </div>
    );
}

function DrawerNavigation() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <IconButton
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{ mb: 2, p: 1 }}
            >
                Menu
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List
                    size="lg"
                    component="nav"
                    sx={{
                        flex: "none",
                        fontSize: "xl",
                    }}
                >
                    <ListItemButton
                        component={Link}
                        to="/"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
}
