import UserStore from './user.store';
import LibraryStore from './library.store';
import TimetableStore from './timetable.store';
import ContactsStore from './contacts.store';
import GroupsStore from './groups.store';

class RootStore {
  userStore: UserStore;
  libraryStore: LibraryStore;
  timetableStore: TimetableStore;
  contactsStore: ContactsStore;
  groupsStors: GroupsStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.libraryStore = new LibraryStore(this);
    this.timetableStore = new TimetableStore(this);
    this.contactsStore = new ContactsStore(this);
    this.groupsStors = new GroupsStore(this)
  }
}

export default RootStore;