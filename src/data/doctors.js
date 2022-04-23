const firstNames = [
    "John",
    "George",
    "Thanos",
    "Andrew",
    "Alex",
    "Spyros",
]

const lastNames = [
    "Smith",
    "White",
    "Right",
    "Pogba",
    "Ronaldo",
    "Messi",
]

const getFirstName = () => {
    const index = Math.floor(Math.random()*firstNames.length);
    return firstNames[index];
}

const getLastName = () => {
    const index = Math.floor(Math.random()*lastNames.length);
    return lastNames[index];
}

const getDescription = () => {
    return "An excellent doctor with a huge expereience.\nHe graduated from Harvard university in 1980.\nAll his patients always say that he treats them in a unique way.\nHe is always available for the users of our app."
}


const getOneDoctor = () => {
    return {
        id: Math.round(Math.random()*10000),
        firstName: getFirstName(),
        lastName: getLastName(),
        username: "Doctor"+Math.round(Math.random()*100),
        expertise: "Expertise"+Math.round(Math.random()*100),
        description: getDescription(),
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