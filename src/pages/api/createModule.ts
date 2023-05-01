import type { NextApiRequest, NextApiResponse } from 'next'
import {appendFileSync, existsSync, mkdirSync} from "fs";

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
  appendFileSync(`./modules/${id}/main.py`, `from ....api import nugget`);
  appendFileSync(`./modules/${id}/metadata.json`, `{"name": "${id}", "description": "A module", "icon": ""}`);

  res.status(200).json({});
}
