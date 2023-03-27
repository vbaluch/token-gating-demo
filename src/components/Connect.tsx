import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}

        {connectors ? (
          connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <button key={x.id} onClick={() => connect({ connector: x })}>
                Connect to: {x.name}
                {isLoading && x.id === pendingConnector?.id && " (connecting)"}
              </button>
            ))
        ) : (
          <span>No connectors found.</span>
        )}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
