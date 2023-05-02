import type {NextApiRequest, NextApiResponse} from 'next'
import {readdirSync, readFileSync} from "fs";
import {ModuleInfo} from "@/pages/module";

export type Data = {
    modules: ModuleInfo[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json(
        {
            modules: readdirSync('./modules').map((module) => (
                {
                    id: module,
                    icon: JSON.parse(readFileSync(`./modules/${module}/metadata.json`).toString()).icon
                })
            )
        });
}
