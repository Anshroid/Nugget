import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MonitorIcon from '@mui/icons-material/Monitor';
import TerminalIcon from '@mui/icons-material/Terminal';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AbcIcon from '@mui/icons-material/Abc';
import {Add} from "@mui/icons-material";

export const drawerWidth = 240;

// From https://mui.com/components/drawers/#mini-variant-drawer

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(
    ({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    })
);

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({open, setOpen, selectedIndex, setSelectedIndex, modules, newModuleCallback}) {
    const theme = useTheme();

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={() => {
                    setOpen(false)
                }}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </DrawerHeader>

            <Divider/>

            <List>
                {['Dashboard', 'Terminal', 'Nugget API'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{display: 'block'}}>
                        <ListItemButton selected={index === selectedIndex} onClick={() => {
                            setSelectedIndex(index)
                        }}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {[<MonitorIcon/>, <TerminalIcon/>, <SettingsApplicationsIcon/>][index]}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider/>

            <List>
                {modules.map((text, index) => (
                    <ListItem key={text} disablePadding sx={{display: 'block'}}>
                        <ListItemButton selected={index === selectedIndex - 3} onClick={() => {
                            setSelectedIndex(index + 3)
                        }}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {<AbcIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}

                <ListItem key="New" disablePadding sx={{display: 'block'}}>
                        <ListItemButton onClick={newModuleCallback}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {<Add/>}
                            </ListItemIcon>
                            <ListItemText primary="New Module..." sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
            </List>
        </Drawer>
    )
}