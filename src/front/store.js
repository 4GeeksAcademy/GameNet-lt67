export const initialStore = () => {
  const token = localStorage.getItem("token");
  const token_company = localStorage.getItem("token_company");
  return {
    message: null,
    posts: [],
    todos: [
    ],
    auth: !!token,
    user: null,
    auth_company: !!token_company,
    company: null 
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login_user":
      return {
        ...store,
        auth: true,
        user: action.payload, // <--- Esto es lo que permite que store.user sea visible
      };

    case "login_company":
      return {
        ...store,
        auth_company: true,
        company: action.payload, // 
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
