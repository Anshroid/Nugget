import Typography from "@mui/material/Typography";
import {getModules} from "@/api";
import {GetServerSidePropsContext} from "next";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;

    if (!id) {
        throw new Error("No module ID provided");
    }

    if (!(await getModules()).includes(id)) {
        throw new Error(`Module ${id} not found`);
    }

    return {
        props: {
            id: id
        }
    }
}

export default function Module({id}: {id: string}) {
    return (
        <>
            <Head>
                <title>{id} | Nugget</title>
            </Head>
            <Typography>{id}</Typography>
        </>
    )
};

