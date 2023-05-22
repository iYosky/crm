export async function getClientes(){
    const response = await fetch(import.meta.env.VITE_API_URL)
    const result = await response.json()
    return(result)
}
export async function getCliente(id){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await response.json()
    return(result)
}

export async function addCliente(datos){
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {'Content-Type': 'application/json'}
        })
        await response.json()
    } catch (error) {
        console.log(error)
    }
   
}

export async function addNota(id, datos) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {'Content-Type': 'application/json'}
        })
        await response.json()
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCliente(id){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
           
        })
        await response.json()
    } catch (error) {
        console.log(error)
    }
   
}