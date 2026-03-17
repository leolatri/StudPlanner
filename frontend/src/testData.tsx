import { ImageSourcePropType } from 'react-native';
import { BookDTO, ContactDTO, SubjectDTO, GroupDTO, UserDTO, AddintionDataDTO } from './api/types'; // предположим, что интерфейсы лежат в этом файле
import vor from '../assets/test/voron.png';
import kur from '../assets/test/kurav.png';
import mik from '../assets/test/mikh.png';
import luk from '../assets/test/lukin.png';

export const testContacts: ContactDTO[] = [
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
export const testBooks: BookDTO[] = [
  {
    id: '1',
    name: 'Мастер и Маргарита',
    autors: ['Михаил Булгаков'],
    isPersonal: true,
  },
  {
    id: '2',
    name: 'Война и мир',
    autors: ['Лев Толстой'],
    isPersonal: false,
  },
  {
    id: '3',
    name: 'Преступление и наказание',
    autors: ['Фёдор Достоевский'],
    isPersonal: true,
  },
];


export const testSubjects: SubjectDTO[] = [
  {
    id: '1',
    type: 'Лекция',
    name: 'Высшая математика',
    room: '301',
    index: 1,
    duration: 90,
    professor: 'Проф. Смирнов',
    timeAndDate: 1709280000000, // пример timestamp
  },
  {
    id: '2',
    type: 'Семинар',
    name: 'Физика',
    room: '105',
    index: 2,
    duration: 90,
    professor: 'Доц. Кузнецова',
    timeAndDate: 1709280000000 + 3600000,
  },
];

export const testGroups: GroupDTO[] = [
  {
    id: '1',
    name: 'ИВТ-201',
    isSelected: false,
  },
  {
    id: '2',
    name: 'ИВТ-202',
    isSelected: true,
  },
  {
    id: '3',
    name: 'ПМИ-101',
    isSelected: false,
  },
];

export const testUser: UserDTO = {
  id: '123',
  email: 'user@university.ru',
  password: 'hashed_password', // в реальности пароль не хранят так, но для теста ок
  firstName: 'Алексей',
  middleName: 'Игоревич',
  secondName: 'Соколов',
  telegram: '@alex_sokolov',
  phoneNumber: '+79991234567',
};

export const testAdditionData: AddintionDataDTO = {
  library: testBooks,
  gropList: testGroups,
  contacts: testContacts,
  subjects: testSubjects,
};

// Если нужно собрать полные данные пользователя со всеми дополнительными
export const testFullUserData = {
  ...testUser,
  library: testBooks,
  gropList: testGroups,
  contacts: testContacts,
  subjects: testSubjects,
};