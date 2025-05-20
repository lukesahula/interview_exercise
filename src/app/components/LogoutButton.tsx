import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      className="cursor-pointer hover:underline"
      onClick={() => signOut()}
    >
      Log Out
    </button>
  );
}
