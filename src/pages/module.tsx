import Typography from "@mui/material/Typography";
import {GetServerSidePropsContext} from "next";
import Head from "next/head";
import {ModuleMetadata} from "@/ModuleDef";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;

    if (!id || typeof id !== "string") {
        throw new Error("Invalid module ID provided");
    }

    const fs = require("fs");

    try {
        let thisModule = JSON.parse(fs.readFileSync(`./modules/${id}/metadata.json`));
        return {
            props: {
                id: id,
                icon: thisModule.icon
            }
        }
    } catch (e) {
        throw new Error(`Module ${id} not found`, {cause: e});
    }
}

export interface ModuleInfo {
    id: string;
    icon: string;
}

export default function Module({id, icon, description}: ModuleMetadata) {
    return (
        <>
            <Head>
                <title>{id} | Nugget</title>
            </Head>
            <Typography>{id}</Typography>
        </>
    )
};

