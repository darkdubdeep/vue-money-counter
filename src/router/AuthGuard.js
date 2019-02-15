import { store } from "../store";

export default (to, from, next) => {
  if (store.state.user.userToken) {
    next();
  } else {
    next("/");
  }
};
