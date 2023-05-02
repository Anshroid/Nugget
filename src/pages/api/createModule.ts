import type { NextApiRequest, NextApiResponse } from 'next'
import {appendFileSync, existsSync, mkdirSync} from "fs";

import {ModuleMetadata} from "@/ModuleDef";

type Data = {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.body.id;

  if (existsSync(`./modules/${id}`)) {
    res.status(400).json({error: "Module already exists"});
    return;
  }

  mkdirSync(`./modules/${id}`);
  appendFileSync(`./modules/${id}/main.py`, `import nugget`);

  let metadata: ModuleMetadata = {
    id: id,
    description: "A module",
    icon: "abc",
    triggers: []
  }
  appendFileSync(`./modules/${id}/metadata.json`, JSON.stringify(metadata));

  res.status(200).json({});
}
