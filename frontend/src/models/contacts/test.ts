import { ContactDTO } from "../../api/types";
import mapperContacts from "./mapper";
import vor from '../../../assets/test/voron.png';
import kur from '../../../assets/test/kurav.png';
import mik from '../../../assets/test/mikh.png';
import luk from '../../../assets/test/lukin.png';



const contactsTest: ContactDTO[] = [
    {
        id: "p1",
        img: vor,
        fio: "Воронов Михаил владимирович",
        email: "ivanov.is@example.com",
        uniSubjects: ["Математическое моделирование", "Информатика в жизни"],
    },
    {
        id: "p2",
        img: kur,
        fio: "Куравский Лев Семёнович",
        email: "petrova.ad@example.com",
        uniSubjects: ["Английский язык", "Теория большого заговора", "История"],
    },
    {
        id: "p3",
        img: mik,
        fio: "Михайловский Михаил Александрович",
        email: "smirnov.ap@example.com",
        uniSubjects: ["Экономика в социальной сети", "Статистика большого мира", "Право"],
    },
    {
        id: "p4",
        img: luk,
        fio: "Лукин Владимир Николаевич",
        email: "kuznetsova.mo@example.com",
        uniSubjects: ["Биология и всё о живых существах", "Химия в простанородье", "Экология"],
    },
]

export const contacts = mapperContacts(contactsTest);