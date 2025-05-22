import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      className="cursor-pointer hover:underline"
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
