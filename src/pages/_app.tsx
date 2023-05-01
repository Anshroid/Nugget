import '@/styles/globals.css'
import AppBar from "@/components/AppBar";
import MiniDrawer, {DrawerHeader} from "@/components/MiniDrawer";
import NewModuleDialog from "@/components/NewModuleDialog";
import theme from "@/components/theme";

import {createModule, getModules} from "@/api";

import type {AppProps} from 'next/app'

import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Box, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

import React from "react";

export default function App({Component, pageProps}: AppProps) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [newModuleDialogOpen, setNewModuleDialogOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{display: 'flex'}}>
                    <AppBar position="fixed" open={drawerOpen}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => {
                                    setDrawerOpen(true)
                                }}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(drawerOpen && {display: 'none'}),
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Nugget Control Panel
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <MiniDrawer open={drawerOpen} setOpen={setDrawerOpen}
                                selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                                modules={getModules()} newModuleCallback={() => setNewModuleDialogOpen(true)}
                    />

                    <Box component="main" sx={{flexGrow: 1, p: 3}}>
                        <DrawerHeader/>
                        <Component {...pageProps} />
                    </Box>
                </Box>
            </ThemeProvider>

            <NewModuleDialog open={newModuleDialogOpen} setOpen={setNewModuleDialogOpen} submitCallback={(id) => {
                setNewModuleDialogOpen(false);
                createModule(id);
            }}/>
        </>
    )
}
