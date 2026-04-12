export const initialStore = () => {
  const token = localStorage.getItem("token");
  const token_company = localStorage.getItem("token_company");
  const token_admin = localStorage.getItem("token_admin");
  return {
    message: null,
    posts: [],
    todos: [],
    auth: !!token,
    user: null,
    auth_company: !!token_company,
    company: null,
    auth_admin: !!token_admin,
    admin: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login_user":
      return {
        ...store,
        auth: true,
        user: action.payload,
      };

    case "login_company":
      return {
        ...store,
        auth_company: true,
        company: action.payload, //
      };

    case "login_admin":
      return {
        ...store,
        auth_admin: true,
        admin: action.payload,
      };

    case "logout_admin":
      return {
        ...store,
        auth_admin: false,
        admin: null,
      };

    case "logout_company":
      return {
        ...store,
        auth_company: false,
        company: null,
      };

    case "logout":
      return {
        ...store,
        auth: false,
        user: null,
      };

    case "set_posts":
      return {
        ...store,
        posts: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
