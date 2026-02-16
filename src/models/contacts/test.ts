import { ContactDTO } from "../../api/types";
import mapperContacts from "./mapper";


const contactsTest: ContactDTO[] = [
    {
        id: "p1",
        img: '../../imgs/test/voron.png',
        fio: "Воронов Михаил владимирович",
        email: "ivanov.is@example.com",
        uniSubjects: ["Математическое моделирование", "Информатика в жизни", "Физика"],
    },
    {
        id: "p2",
        img: '../../imgs/test/kurav.png',
        fio: "Куравский Лев Семёнович",
        email: "petrova.ad@example.com",
        uniSubjects: ["Английский язык", "Теория большого заговора", "История"],
    },
    {
        id: "p3",
        img: '../../imgs/test/mikh.png',
        fio: "Михайловский Михаил Александрович",
        email: "smirnov.ap@example.com",
        uniSubjects: ["Экономика в социальной сети", "Статистика большого мира", "Право"],
    },
    {
        id: "p4",
        img: '../../imgs/test/lukin.png',
        fio: "Лукин Владимир Николаевич",
        email: "kuznetsova.mo@example.com",
        uniSubjects: ["Биология и всё о живых существах", "Химия в простанородье", "Экология"],
    },
]

export const contacts = mapperContacts(contactsTest);