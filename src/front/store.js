export const initialStore = () => {
  const token = localStorage.getItem("token");
  return {
    message: null,
    posts: [],
    todos: [
    ],
    auth: !!token,
    user: null, 
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
