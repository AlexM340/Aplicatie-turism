import { createContext, useContext, useState } from "react";

export class User {
  message = "";
  token = "";
  user = {};

  constructor(config) {
    if (config) {
      Object.assign(this, config);
      // localStorage.setItem('userContext', JSON.stringify(config));
      this.login();
    } else {
      // get user from localStorage if exists
      const user = localStorage.getItem("userContext");
      if (user) {
        Object.assign(this, JSON.parse(user)); // copy user props from localStorage
      }
    }
  }
  login() {
    // login user
    // save user to localStorage
    localStorage.setItem("userContext", JSON.stringify(this));
  }
  async logout() {
    // logout user
    // remove user from localStorage
    localStorage.removeItem("userContext");
    //   await query('user/logOut',{});
  }
  get validate() {
    return !!localStorage.getItem("userContext");
  }
}

const UserContext = createContext({
  user: new User(),
  setUser: (user) => user,
});
export function UserProvider({ children }) {
  const [user, setUser] = useState(new User());
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};
