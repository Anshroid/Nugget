import type {NextApiRequest, NextApiResponse} from 'next'
import {cpus, totalmem, freemem} from "os";
import systemInformation from "systeminformation";

export type Data = {
    cpu: number,
    memory: number,
    temp: number,
}

const sum = (arr: number[]) => arr.reduce((val, item) => val + item, 0);
const average = (arr: number[]) => sum(arr) / arr.length;

let old = cpus().map(cpu => (cpu.times));
let temp = 0;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let current = cpus().map(cpu => (cpu.times));

    systemInformation.cpuTemperature().then((data) => {
        temp = average(data.socket?.slice(4) ?? [data.main])
    });

    res.status(200).json(
        {
            cpu: (1 -
                average(current.map((cpuTimes, cpuIndex) =>
                    ((cpuTimes.idle - old[cpuIndex].idle) /
                        sum(Object.keys(cpuTimes).map(time => cpuTimes[time as keyof typeof cpuTimes] - old[cpuIndex][time as keyof typeof cpuTimes])))))
            ) * 100,
            memory: 100 - Math.round(100 * freemem() / totalmem()),
            temp: temp,
        });

    old = current;
}
