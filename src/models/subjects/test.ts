import { SubjectDTO } from "../../api/types";
import mapperSubject from "./mapper";

const testSubjects: SubjectDTO[] = [
  {
    id: "1",
    type: "лекция",
    name: "Физика",
    room: "120А",
    index: 1,
    duration: 90,           // минуты
    professor: "Иванов И.И.",
    timeAndDate: 1644822000  // 18.02.2026 09:00 MSK (Unix timestamp)
  },
  {
    id: "2", 
    type: "семинар",
    name: "Программирование",
    room: "201",
    index: 2,
    duration: 90,
    professor: "Мещанинов А.В.",
    timeAndDate: 1644827000  // 18.02.2026 10:30 MSK
  },
  {
    id: "3",
    type: "лабораторная",
    name: "Базы данных",
    room: "Лаб 305",
    index: 3,
    duration: 120,
    professor: "Сидорова Е.П.",
    timeAndDate: 1644831600  // 18.02.2026 12:00 MSK
  },
  {
    id: "4",
    type: "лекция",
    name: "Математика",
    room: "Ауд. 15",
    index: 1,
    duration: 90,
    professor: "Петров В.С.",
    timeAndDate: 1644908400  // 19.02.2026 09:00 MSK (следующий день)
  },
  {
    id: "5",
    type: "практика",
    name: "Операционные системы",
    room: "Лаб 212",
    index: 4,
    duration: 90,
    professor: "Козлов Д.А.",
    timeAndDate: 1644824600  // 18.02.2026 10:30 MSK (параллель с 2-й)
  },
  {
    id: "6",
    type: "лекция",
    name: "Английский язык",
    room: "305Б",
    index: 5,
    duration: 80,
    professor: "Smith J.",
    timeAndDate: 1644837000  // 18.02.2026 13:30 MSK
  },
  {
    id: "7",
    type: "семинар", 
    name: "Алгоритмы и структуры данных",
    room: "112",
    index: 2,
    duration: 90,
    professor: "Васильев К.М.",
    timeAndDate: 1644908400  // 19.02.2026 09:00
  },
  {
    id: "8",
    type: "лабораторная",
    name: "Физкультура",
    room: "Спортзал",
    index: 6,
    duration: 90,
    professor: "Смирнова О.Н.",
    timeAndDate: 1644841200  // 18.02.2026 14:00 MSK
  },
  {
    id: "9",
    type: "лекция",
    name: "Электротехника",
    room: "210",
    index: 3,
    duration: 90,
    professor: "Николаев П.Д.",
    timeAndDate: 1645177200  // 23.02.2026 09:00 (понедельник)
  },
  {
    id: "10",
    type: "контрольная",
    name: "Информатика",
    room: "Лаб 101",
    index: 1,
    duration: 120,
    professor: "Федоров С.Л.",
    timeAndDate: 1645263600  // 24.02.2026 09:00
  }
];


export const subjectsTest = mapperSubject(testSubjects);