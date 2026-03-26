import { SubjectDTO } from "../../services/types";
import { SubjectModel } from "../types";

const parseDate = (fullDate: number, duration?: number, timezone: string = 'UTC') => {
    const date = new Date(fullDate * 1000);
    
    const durationInSeconds = (duration || 90) * 60;
    
    const endDate = new Date((fullDate + durationInSeconds) * 1000);

    const formatDate = date.toLocaleDateString('ru-RU');
    const startTime = date.toLocaleTimeString('ru-RU', { 
        timeZone: timezone,
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const endTime = endDate.toLocaleTimeString('ru-RU', { 
        timeZone: timezone,
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // console.log('Start:', startTime);
    // console.log('End:', endTime);

    return {
        formatDate,
        startTime,
        endTime,
    };
};

export default function mapperSubjects(rowData?: SubjectDTO[]): SubjectModel[] {
    if (!rowData) return [];

    return rowData.sort((a, b) => a.timeAndDate - b.timeAndDate).map((el) => {
        const date = parseDate(el.timeAndDate, el.duration, 'Europe/Moscow');

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
        })
    });
};