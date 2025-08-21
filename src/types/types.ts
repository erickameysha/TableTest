import dayjs from "dayjs";
export type DataType = {
    key: string
    name: string
    number: number
    date: string
}
export type FormValues = {
    name: string;
    number: number;
    date: dayjs.Dayjs | null;
}