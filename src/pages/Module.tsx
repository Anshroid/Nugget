import Typography from "@mui/material/Typography";
import {getModules} from "@/api";

export default function Module({id}: {id: string}) {
    if (!getModules().includes(id)) {
        throw new Error(`Module ${id} not found`);
    }

    return (
        <>
            <Typography>Joe</Typography>
        </>
    )
};

