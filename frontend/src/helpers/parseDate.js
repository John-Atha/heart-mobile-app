import moment from "moment";

export const parseDate = (dateStr) => {
    const date = moment(dateStr) || moment();
    const now = moment();
    // if today
    if (date.format("DD-MM-YYYY")===now.format("DD-MM-YYYY")) {
        return `Today ${date.format("hh:mm")}`
    }
    if (date.year()===now.year()) {
        return date.format("DD MMM")
    }
    return date.format("DD MMM YYYY")
}