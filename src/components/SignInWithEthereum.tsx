import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { useState } from "react";

export function SignInWithEthereum() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch("/api/siwe/nonce");
      if (nonceRes.status !== 200) throw new Error("Server error.");
      return nonceRes.text();
    } catch (error) {
      console.error(error);
    }
  };

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;
      setIsLoading(true);
      const nonce = await fetchNonce();
      if (!nonce) throw new Error("Error fetching nonce.");
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const verifyRes = await fetch("/api/siwe/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message.");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <button disabled={isLoading} onClick={signIn}>
        Sign in with Ethereum
      </button>
    </div>
  );
}
