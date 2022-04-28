export const getOneMetric = () => {
    return {
        name: "Metric"+Math.round(Math.random()*1000),
        minValue: Math.round(Math.random()),
        maxValue: Math.round(Math.random()*100),
    }
}

export const getDiseaseMetrics = () => {
    return [
        getOneMetric(),
        getOneMetric(),
        getOneMetric(),
        getOneMetric(),
    ]
}

const getOneDisease = () => {
    return {
        name: "Disease"+Math.round(Math.random()*100),
        severity: Math.random()>0.5 ? "High" : "Low",
        pinned: Math.random()>0.6,
        id: Math.random()*10000,
        metrics: getDiseaseMetrics(),
    }
}

export const getDiseases = () => {
    return [
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
        getOneDisease(),
    ]
}