import Typography from "@mui/material/Typography";

export function getModules() {
    return [
        "Placeholder 1",
        "Placeholder 2",
        "Placeholder 3"
    ];
}

export function createModule(id: string) {
    return;
}

export default function Module({id}) {
    if (!getModules().includes(id)) {
        throw new Error(`Module ${id} not found`);
    }

    return (
        <>
            <Typography>Joe</Typography>
        </>
    )
};

