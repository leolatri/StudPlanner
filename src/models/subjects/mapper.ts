import { SubjectDTO } from "../../api/types";
import { SubjectModel } from "../types";

const parseDate = (fullDate: number, duration?: number) => {
    const date = new Date(fullDate * 100);

    console.log(date);
    const formatDate = date.toLocaleDateString('ru-Ru');
    const startTime = date.toLocaleTimeString('ru-Ru');
    const endTime = new Date((fullDate + (duration || 45)) * 100).toLocaleTimeString('ru-Ru');

    return ({
        formatDate,
        startTime,
        endTime,
    });
};

export default function mapperSubject(rowData?: SubjectDTO[]): SubjectModel[] {
    if (!rowData) return [];

    return rowData.map((el) => {
        const date = parseDate(el.timeAndDate);
        return ({
            id: el.id,
            type: el.type,
            name: el.name,
            room: el.room,
            index: el.index,
            duration: el.duration,
            professor: el.professor,
            date: date.formatDate,
            startTime: date.startTime,
            endTime: date.endTime,
        })
    });
};