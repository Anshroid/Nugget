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
import {Add} from "@mui/icons-material";
import {Icon, Skeleton} from "@mui/material";
import Link from "next/link";
import {ModuleInfo} from "@/pages/module";
import {useEffect, useState} from "react";
import {getModules} from "@/api";

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

interface MiniDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    triggerReload: boolean;
    modules: ModuleInfo[];
    setModules: React.Dispatch<React.SetStateAction<ModuleInfo[]>>
    newModuleCallback: () => void;
}

export default function MiniDrawer({
                                       open,
                                       setOpen,
                                       selectedIndex,
                                       setSelectedIndex,
                                       triggerReload,
                                       modules,
                                       setModules,
                                       newModuleCallback
                                   }: MiniDrawerProps) {
    const theme = useTheme();

    const [loadingModules, setLoadingModules] = useState(false);

    useEffect(() => {
        setLoadingModules(true);
        getModules().then((modules) => {
            setModules(modules);
            setLoadingModules(false);
        });
    }, [setModules, triggerReload]);

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
                        <Link href={`/${["dashboard", "terminal", "apidashboard"][index]}`}>
                            <ListItemButton selected={index === selectedIndex} onClick={() => setSelectedIndex(index)}
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
                                    {[<MonitorIcon key="dashboard"/>, <TerminalIcon key="terminal"/>,
                                        <SettingsApplicationsIcon key="apidashboard"/>][index]}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Divider/>

            <List>
                {loadingModules ?
                    [1, 2, 3].map(i => (<Skeleton variant="circular" width={48} height={48} sx={{ml: "8px", mb: 1}}
                                                  key={i}></Skeleton>))
                    :
                    modules.map((module, index) => (
                        <ListItem key={module.id} disablePadding sx={{display: 'block'}}>
                            <Link href={`/module?id=${module.id}`}>
                                <ListItemButton selected={index === selectedIndex - 3}
                                                onClick={() => setSelectedIndex(index + 3)}
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
                                        <Icon>{module.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={module.id} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                }

                <ListItem key="New" disablePadding sx={{display: 'block'}}>
                    <ListItemButton onClick={newModuleCallback} sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}>
                        <ListItemIcon sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                            {<Add/>}
                        </ListItemIcon>
                        <ListItemText primary="New Module..." sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}