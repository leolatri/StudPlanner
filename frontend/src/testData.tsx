import { BookDTO, ContactDTO, SubjectDTO, GroupDTO, UserDTO, AddintionDataDTO, FeedbackDTO } from './services/types'; 
import mik from '../assets/test/mikh.png';
import luk from '../assets/test/lukin.png';
import vor from '../assets/test/voron.png';
import kur from '../assets/test/kurav.png';

const testReviews1: FeedbackDTO[] = [
  {
    id: "1",
    text: "ПЕРВЫЙ Отличный материал, очень помог в подготовке к экзамену",
    grade: 5,
    autor: "Иванов Иван",
    isPersonal: false,
  },
  {
    id: "2",
    text: "Хорошая книга, но некоторые темы раскрыты поверхностно",
    grade: 4,
    autor: "Петрова Анна",
    isPersonal: false,
  },
  {
    id: "3",
    text: "Прекрасный учебник, рекомендую всем студентам",
    grade: 5,
    autor: "Сидоров Петр",
    isPersonal: false,
  },
  {
    id: "4",
    text: "Слишком сложный язык для начинающих",
    grade: 3,
    autor: "Кузнецова Елена",
    isPersonal: false,
  },
  {
    id: "5",
    text: "Замечательные примеры, всё понятно и доступно",
    grade: 1,
    autor: "Николаев Дмитрий",
    isPersonal: false,
  },
  {
    id: "6",
    text: " по совету преподавателя, не пожалел",
    grade: 1,
    autor: "Михайлов Алексей",
    isPersonal: false,
  },
  {
    id: "7",
    text: "Мало практических заданий, хотелось бы больше",
    grade: 3,
    autor: "Александрова Ольга",
    isPersonal: false,
  },
  {
    id: "8",
    text: "Отличное соотношение цены и качества",
    grade: 4,
    autor: "Федоров Игорь",
    isPersonal: false,
  },
  {
    id: "9",
    text: "Помог разобраться в сложной теме, спасибо автору",
    grade: 1,
    autor: "Григорьева Татьяна",
    isPersonal: false,
  },
  {
    id: "10",
    text: "Некоторые главы устарели, нуждается в обновлении",
    grade: 1,
    autor: "Андреев Сергей",
    isPersonal: false,
  },
  {
    id: "101",
    text: "ЧТОЖ",
    grade: 1,
    autor: "Андреев Сергей",
    isPersonal: false,
  },
  {
    id: "1012",
    text: "LF Z",
    grade: 1,
    autor: "Андреев Сергей",
    isPersonal: false,
  },
];

const testReviews2: FeedbackDTO[] = [
  {
    id: "6",
    text: "ВТОРОЙ Купил по совету преподавателя, не пожалел",
    grade: 5,
    autor: "Михайлов Алексей",
    isPersonal: false,
  },
  {
    id: "7",
    text: "Мало практических заданий, хотелось бы больше",
    grade: 3,
    autor: "Александрова Ольга",
    isPersonal: false,
  },
  {
    id: "8",
    text: "Отличное соотношение цены и качества",
    grade: 4,
    autor: "Федоров Игорь",
    isPersonal: false,
  },
  {
    id: "9",
    text: "Помог разобраться в сложной теме, спасибо автору",
    grade: 5,
    autor: "Григорьева Татьяна",
    isPersonal: false,
  },
  {
    id: "10",
    text: "Некоторые главы устарели, нуждается в обновлении",
    grade: 2,
    autor: "Андреев Сергей",
    isPersonal: false,
  },
  {
    id: "11",
    text: "Использую как основной источник для курсовой",
    grade: 4,
    autor: "Васильева Наталья",
    isPersonal: false,
  },
  {
    id: "12",
    text: "Быстрая доставка, книга в хорошем состоянии",
    grade: 5,
    autor: "Степанов Артем",
    isPersonal: false,
  },
  {
    id: "13",
    text: "Не хватает иллюстраций, сложно воспринимать текст",
    grade: 3,
    autor: "Дмитриева Ксения",
    isPersonal: false,
  },
  {
    id: "14",
    text: "Лучшая книга по теме, которую я читал",
    grade: 5,
    autor: "Кириллов Максим",
    isPersonal: false,
  },
  {
    id: "15",
    text: "Понравилась структура, легко найти нужную информацию",
    grade: 4,
    autor: "Алексеева Светлана",
    isPersonal: false,
  },
];

const testReviews3: FeedbackDTO[] = [
  {
    id: "1",
    text: "ТРЕТИЙ Отличный материал, очень помог в подготовке к экзамену",
    grade: 5,
    autor: "Иванов Иван",
    isPersonal: false,
  },
  {
    id: "2",
    text: "Хорошая книга, но некоторые темы раскрыты поверхностно",
    grade: 4,
    autor: "Петрова Анна",
    isPersonal: false,
  },
  {
    id: "3",
    text: "Прекрасный учебник, рекомендую всем студентам",
    grade: 5,
    autor: "Сидоров Петр",
    isPersonal: false,
  },
  {
    id: "4",
    text: "Слишком сложный язык для начинающих",
    grade: 3,
    autor: "Кузнецова Елена",
    isPersonal: false,
  },
  {
    id: "5",
    text: "Замечательные примеры, всё понятно и доступно",
    grade: 5,
    autor: "Николаев Дмитрий",
    isPersonal: false,
  },

  {
    id: "10",
    text: "Некоторые главы устарели, нуждается в обновлении",
    grade: 2,
    autor: "Андреев Сергей",
    isPersonal: false,
  },
  {
    id: "11",
    text: "Использую как основной источник для курсовой",
    grade: 4,
    autor: "Васильева Наталья",
    isPersonal: false,
  },
  {
    id: "12",
    text: "Быстрая доставка, книга в хорошем состоянии",
    grade: 5,
    autor: "Степанов Артем",
    isPersonal: false,
  },
  {
    id: "13",
    text: "Не хватает иллюстраций, сложно воспринимать текст",
    grade: 3,
    autor: "Дмитриева Ксения",
    isPersonal: false,
  },
  {
    id: "14",
    text: "Лучшая книга по теме, которую я читал",
    grade: 5,
    autor: "Кириллов Максим",
    isPersonal: false,
  },
  {
    id: "15",
    text: "Понравилась структура, легко найти нужную информацию",
    grade: 4,
    autor: "Алексеева Светлана",
    isPersonal: false,
  },
];

const testReviews4: FeedbackDTO[] = [
  {
    id: "1",
    text: "ЧЕТВЕРТЫЙ Отличный материал, очень помог в подготовке к экзамену",
    grade: 5,
    autor: "Иванов Иван",
    isPersonal: false,
  },
  {
    id: "2",
    text: "ЧЕТВЕРТЫЙ Хорошая книга, но некоторые темы раскрыты поверхностно",
    grade: 4,
    autor: "Петрова Анна",
    isPersonal: false,
  },
  {
    id: "3",
    text: "ЧЕТВЕРТЫЙ Прекрасный учебник, рекомендую всем студентам",
    grade: 5,
    autor: "Сидоров Петр",
    isPersonal: false,
  },
  {
    id: "4",
    text: "Слишком сложный язык для начинающих",
    grade: 3,
    autor: "Кузнецова Елена",
    isPersonal: false,
  },
  {
    id: "5",
    text: "Замечательные примеры, всё понятно и доступно",
    grade: 5,
    autor: "Николаев Дмитрий",
    isPersonal: false,
  },

  {
    id: "10",
    text: "Некоторые главы устарели, нуждается в обновлении",
    grade: 2,
    autor: "Андреев Сергей",
    isPersonal: false,
  },
  {
    id: "11",
    text: "Использую как основной источник для курсовой",
    grade: 4,
    autor: "Васильева Наталья",
    isPersonal: false,
  },
  {
    id: "12",
    text: "Быстрая доставка, книга в хорошем состоянии",
    grade: 5,
    autor: "Степанов Артем",
    isPersonal: false,
  },
  {
    id: "13",
    text: "Не хватает иллюстраций, сложно воспринимать текст",
    grade: 3,
    autor: "Дмитриева Ксения",
    isPersonal: false,
  },
  {
    id: "14",
    text: "Лучшая книга по теме, которую я читал",
    grade: 5,
    autor: "Кириллов Максим",
    isPersonal: false,
  },
  {
    id: "15",
    text: "Понравилась структура, легко найти нужную информацию",
    grade: 4,
    autor: "Алексеева Светлана",
    isPersonal: false,
  },
];


export const testContacts: ContactDTO[] = [
  {
    id: "p1",
    img: vor,
    fio: "Воронов Михаил владимирович",
    email: "ivanov.is@example.com",
    uniSubjects: ["Математическое моделирование", "Информатика в жизни"],
    feedbacks: testReviews1,
    feedbackIsLeaved: false
  },
  {
    id: "p2",
    img: kur,
    fio: "Куравский Лев Семёнович",
    email: "petrova.ad@example.com",
    uniSubjects: ["Английский язык", "Теория большого заговора", "История"],
    feedbacks: testReviews2,
    feedbackIsLeaved: false

  },
  {
    id: "p3",
    img: mik,
    fio: "Михайловский Михаил Александрович",
    email: "smirnov.ap@example.com",
    uniSubjects: ["Экономика в социальной сети", "Статистика большого мира", "Право"],
    feedbacks: testReviews3,
    feedbackIsLeaved: false

  },
  {
    id: "p4",
    img: luk,
    fio: "Лукин Владимир Николаевич",
    email: "kuznetsova.mo@example.com",
    uniSubjects: ["Биология и всё о живых существах", "Химия в простанородье", "Экология"],
    feedbacks: testReviews4,
    feedbackIsLeaved: false

  },
];

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
    isPersonal: false,
  },
  {
    id: '4',
    name: 'Во имя чего тут происходит вообще',
    autors: ['Фёдор Достоевский'],
    isPersonal: true,
  },
  {
    id: '5',
    name: 'Книга о неизведанном проршлом',
    autors: ['Фёдор Достоевский'],
    isPersonal: true,
  },
  {
    id: '6',
    name: 'Прошлое не вернуть',
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
    isActive: false,
    isSelected: false,
  },
  {
    id: '2',
    name: 'ИВТ-202',
    isActive: false,
    isSelected: true,
  },
  {
    id: '3',
    name: 'МО-ИТ-101',
    isActive: false,
    isSelected: false,
  },
  {
    id: '4',
    name: 'ПИП-ИТ-101',
    isActive: false,
    isSelected: true,
  },
  {
    id: '5',
    name: 'РЕЖ-001',
    isActive: false,
    isSelected: true,
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
  groupList: testGroups,
  contacts: testContacts,
  subjects: testSubjects,
};

// Если нужно собрать полные данные пользователя со всеми дополнительными
export const testFullUserData = {
  ...testUser,
  library: testBooks,
  groupList: testGroups,
  contacts: testContacts,
  subjects: testSubjects,
};