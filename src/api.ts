import {Data as GetModulesData} from "@/pages/api/getModules";
import {Data as GetResourcesData} from "@/pages/api/getResources";

export async function getModules() {
    const res = await fetch("http://localhost:3000/api/getModules")
    if (!res.ok) {
        throw new Error(res.statusText)
    }

    const data: GetModulesData = await res.json()

    return data.modules;
}

export async function createModule(id: string) {
    const res = await fetch("http://localhost:3000/api/createModule", {
        method: "POST",
        body: JSON.stringify({id}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function getResources() {
    const res = await fetch("http://localhost:3000/api/getResources")
    if (!res.ok) {
        throw new Error(res.statusText)
    }

    const data: GetResourcesData = await res.json()

    return data;
}