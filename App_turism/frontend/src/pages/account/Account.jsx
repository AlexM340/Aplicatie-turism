import React from "react";
import { useUser } from "../../UserComponent";
import AccountAngajat from "./angajat/AccountAngajat";
import AccountClient from "./client/AccountClient";

const Account = () => {
  const { user } = useUser();
  return user.user.angajat ? (
    <div>
      <AccountAngajat />
    </div>
  ) : (
    <AccountClient />
  );
};

export default Account;
