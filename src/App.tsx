import * as React from 'react';

// @ts-ignore
import MiniDrawer, {drawerWidth, DrawerHeader} from "./MiniDrawer.tsx";
// @ts-ignore
import Dashboard from "./Dashboard.tsx";
// @ts-ignore
import Terminal from "./Terminal.tsx";
// @ts-ignore
import APIDashboard from "./APIDashboard.tsx";
// @ts-ignore
import Module, {createModule, getModules} from "./Module.tsx";
// @ts-ignore
import NewModuleDialog from "./NewModuleDialog.tsx";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {styled} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from '@mui/material/Box';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})<AppBarProps>(
    ({theme, open}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

export default function App() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [newModuleDialogOpen, setNewModuleDialogOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <>
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
                    <DrawerHeader />
                    {[<Dashboard/>, <Terminal/>, <APIDashboard/>].concat(getModules().map(id => <Module id={id} />))[selectedIndex]}
                </Box>
            </Box>

            <NewModuleDialog open={newModuleDialogOpen} setOpen={setNewModuleDialogOpen} onClose={(id) => {setNewModuleDialogOpen(false); createModule(id)}} />
        </>
    );
}
