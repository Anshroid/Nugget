import Head from "next/head";
import {Box, Card, LinearProgress, Stack, Unstable_Grid2 as Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import LinearProgressWithLabel from "@/components/LinearProgressWithLabel";
import {getResources} from "@/api";

export default function Dashboard({}) {
    const [cpu, setCpu] = React.useState(0);
    const [memory, setMemory] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getResources().then((res) => {
                setCpu(res.cpu);
                setMemory(res.memory);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head>
                <title>Nugget Dashboard</title>
            </Head>
            <Grid container m={2} spacing={2}>
                <Grid xs={6}>
                    <Card sx={{p: 2}}>
                        <Typography variant="h5" component="h2">Resources</Typography>
                        <LinearProgressWithLabel variant="determinate" color="secondary" label="CPU" value={cpu}
                                                 sx={{my: 1}}/>
                        <LinearProgressWithLabel variant="determinate" label="RAM" value={memory} sx={{my: 1}}/>
                    </Card>
                </Grid>
                <Grid xs={6}>
                    <Card sx={{p: 2}}>
                        <Typography>hi</Typography>
                    </Card>
                </Grid>

                <Grid xs={12}>
                    <Card sx={{p: 2}}>
                        <Typography>hi</Typography>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
};

