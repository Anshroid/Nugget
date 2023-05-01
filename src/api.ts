export async function getModules() {
    const res = await fetch("http://localhost:3000/api/getModules")
    if (!res.ok) {
        throw new Error(res.statusText)
    }

    const data = await res.json()

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