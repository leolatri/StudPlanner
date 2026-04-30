const apiUrls = {
  auth: {
    base: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
  addition: '/addition',
  books: '/books',
  contacts: '/contacts',
  groups: '/groups',
  subjects: '/subjects',
  user: '/user',
} as const;

export default apiUrls;