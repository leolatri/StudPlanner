import { SubjectDTO } from "../../api/types";
import mapperSubject from "./mapper";

const testSubjects: SubjectDTO[] = [
   {
        id: "1",
        type: "Лекция",
        name: "Математический анализ",
        room: "Аудитория 301",
        index: 1,
        duration: 90,
        professor: "Иванов Иван Иванович",
        timeAndDate: 1771122600, // 2 февраля 2026, 09:30 MSK
    },
    {
        id: "2",
        type: "Практика",
        name: "Физика",
        room: "Лаборатория 105",
        index: 2,
        duration: 90,
        professor: "Петрова Анна Сергеевна",
        timeAndDate: 1738497600, // 2 февраля 2026, 11:00 MSK
    },
    {
        id: "3",
        type: "Лекция",
        name: "Базы данных",
        room: "Аудитория 215",
        index: 3,
        duration: 60,
        professor: "Соколов Дмитрий Александрович",
        timeAndDate: 1738504800, // 2 февраля 2026, 13:00 MSK
    },
    {
        id: "4",
        type: "Лабораторная",
        name: "Программирование на C++",
        room: "Компьютерный класс 408",
        index: 4,
        duration: 120,
        professor: "Козлова Елена Владимировна",
        timeAndDate: 1738512000, // 2 февраля 2026, 15:00 MSK
    },

    // Вторник, 3 февраля 2026
    {
        id: "5",
        type: "Семинар",
        name: "История науки",
        room: "Аудитория 112",
        index: 5,
        duration: 60,
        professor: "Михайлов Андрей Петрович",
        timeAndDate: 1738578600, // 3 февраля 2026, 09:30 MSK
    },
    {
        id: "6",
        type: "Лекция",
        name: "Дискретная математика",
        room: "Аудитория 205",
        index: 6,
        duration: 90,
        professor: "Николаева Татьяна Викторовна",
        timeAndDate: 1738584000, // 3 февраля 2026, 11:00 MSK
    },
    {
        id: "7",
        type: "Практика",
        name: "Английский язык",
        room: "Кабинет 309",
        index: 7,
        duration: 60,
        professor: "Смирнова Мария Александровна",
        timeAndDate: 1738591200, // 3 февраля 2026, 13:00 MSK
    },
    {
        id: "8",
        type: "Лекция",
        name: "Теория вероятностей",
        room: "Аудитория 401",
        index: 8,
        duration: 90,
        professor: "Васильев Алексей Николаевич",
        timeAndDate: 1738598400, // 3 февраля 2026, 15:00 MSK
    },

    // Среда, 4 февраля 2026
    {
        id: "9",
        type: "Лабораторная",
        name: "Веб-разработка",
        room: "Компьютерный класс 310",
        index: 9,
        duration: 120,
        professor: "Зайцева Ольга Дмитриевна",
        timeAndDate: 1738665000, // 4 февраля 2026, 09:30 MSK
    },
    {
        id: "10",
        type: "Лекция",
        name: "Алгоритмы и структуры данных",
        room: "Аудитория 205",
        index: 10,
        duration: 90,
        professor: "Морозов Павел Сергеевич",
        timeAndDate: 1738670400, // 4 февраля 2026, 11:00 MSK
    },

    // Четверг, 5 февраля 2026
    {
        id: "11",
        type: "Практика",
        name: "Численные методы",
        room: "Аудитория 318",
        index: 11,
        duration: 90,
        professor: "Лебедев Константин Дмитриевич",
        timeAndDate: 1738751400, // 5 февраля 2026, 09:30 MSK
    },
    {
        id: "12",
        type: "Лекция",
        name: "Функциональный анализ",
        room: "Аудитория 401",
        index: 12,
        duration: 90,
        professor: "Соболева Ирина Александровна",
        timeAndDate: 1738756800, // 5 февраля 2026, 11:00 MSK
    },

    // Пятница, 6 февраля 2026
    {
        id: "13",
        type: "Экзамен",
        name: "Математический анализ",
        room: "Аудитория 301",
        index: 13,
        duration: 180,
        professor: "Иванов Иван Иванович",
        timeAndDate: 1738837800, // 6 февраля 2026, 09:30 MSK
    },
    {
        id: "14",
        type: "Консультация",
        name: "Подготовка к экзамену",
        room: "Аудитория 205",
        index: 14,
        duration: 90,
        professor: "Петрова Анна Сергеевна",
        timeAndDate: 1738846800, // 6 февраля 2026, 12:00 MSK
    },

    // Суббота, 7 февраля 2026 (сокращенный день)
    {
        id: "15",
        type: "Факультатив",
        name: "Машинное обучение",
        room: "Компьютерный класс 408",
        index: 15,
        duration: 90,
        professor: "Кузнецов Артем Владимирович",
        timeAndDate: 1738920600, // 7 февраля 2026, 10:00 MSK
    }
];


export const subjectsTest = mapperSubject(testSubjects);
