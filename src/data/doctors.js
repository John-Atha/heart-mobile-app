const getOneDoctor = () => {
    return {
        id: Math.round(Math.random()*10000),
        name: "Doctor"+Math.round(Math.random()*100),
        expertise: "Expertise"+Math.round(Math.random()*100),
    }
}

export const getDoctors = () => {
    return [
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
        getOneDoctor(),
    ]
}