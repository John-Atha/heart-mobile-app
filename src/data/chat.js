const getMessage = (id1, id2) => {
    if (Math.random()>0.5) {
        return {
            from: id1,
            to: id2,
            text: "Helloooo frieeenndd"
        }
    }
    return {
        from: id2,
        to: id1,
        text: "Hello friend"
    }
}


export const getMessages = (id1, id2) => {
    return [
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
        getMessage(id1, id2),
    ]
}