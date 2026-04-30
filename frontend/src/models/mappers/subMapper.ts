import { SubjectDTO } from "../../services/types";
import { SubjectModel } from "../types";

const parseDate = (fullDate: number, duration?: number) => {
    const date = new Date(fullDate);
    const endDate = new Date(fullDate + (duration ?? 90) * 60 * 1000);

    const formatDate = `${date.getUTCDate().toString().padStart(2, '0')}.${(date.getUTCMonth() + 1).toString().padStart(2, '0')}`;

    const startTime = `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    const endTime = `${endDate.getUTCHours().toString().padStart(2, '0')}:${endDate.getUTCMinutes().toString().padStart(2, '0')}`;

    return { formatDate, startTime, endTime };
};

export default function mapperSubjects(rowData?: SubjectDTO[]): SubjectModel[] {
    if (!rowData) return [];

    return rowData.sort((a, b) => a.timeAndDate - b.timeAndDate).map((el) => {
        const date = parseDate(el.timeAndDate, el.duration);

        return ({
            id: el.id,
            type: el.type,
            name: el.name,
            room: el.room,
            index: el.index,
            professor: el.professor,
            date: date.formatDate,
            startTime: date.startTime,
            endTime: date.endTime,
            timeAndDate: el.timeAndDate,
            groups: el.groups,
        })
    });
};