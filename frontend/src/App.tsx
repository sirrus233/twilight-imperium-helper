import { CssVarsProvider } from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";
import React from "react";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductionHelper from "./Calculator";

export default function App() {
    return (
        <CssVarsProvider>
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
                variant="solid"
                color="primary"
                onClick={() => setOpen(true)}
            />
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
