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
import Module, {getModules} from "./Module.tsx";

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
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                                setOpen(true)
                            }}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Nugget Control Panel
                        </Typography>
                    </Toolbar>
                </AppBar>

                <MiniDrawer open={open} setOpen={setOpen}
                            selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                            modules={getModules()}
                />

                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader />
                    {[<Dashboard/>, <Terminal/>, <APIDashboard/>].concat()[selectedIndex]}
                </Box>
            </Box>
        </>
    );
}
