import { useState } from "react";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    try {
      setIsLoading(true);
      const signOutRes = await fetch("/api/logout");
      if (signOutRes.status !== 200) throw new Error("Server error.");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <button disabled={isLoading} onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
