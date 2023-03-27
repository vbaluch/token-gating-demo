import { useAccount } from "wagmi";

import {
  Account,
  Connect,
  Content,
  NetworkSwitcher,
  SignInWithEthereum,
  SignOutButton,
} from "../components";

function Page() {
  const { isConnected } = useAccount();

  return (
    <>
      <h1>Token Gating Demo</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
          <SignInWithEthereum />
          <SignOutButton />
          <Content />
        </>
      )}
    </>
  );
}

export default Page;
