import React from "react";
import { useUser } from "./UserComponent";
import AccountAngajat from "./AccountAngajat";

const Account = () => {
  const { user } = useUser();
  return user.user.angajat ? (
    <div>
      <AccountAngajat />
    </div>
  ) : (
    <div>Client</div>
  );
};

export default Account;
