import { getDoctors } from "./doctors";


const texts = [
    "Hello",
    "Hi",
    "How are you feeling today?",
    "Everything OK?",
]

const randomText = () => {
    const index = Math.floor(Math.random()*texts.length);
    return texts[index];
}

// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }


export const getContacts = () => {
    const doctors = getDoctors();
    const contacts = doctors.map((doctor) => {
        return {
            ...doctor,
            text: randomText(),
            seen: Math.random()>0.5 ? true : false,
            datetime: randomDate(new Date(2021, 1, 1), new Date()),
        }
    }) ;
    return contacts;
}