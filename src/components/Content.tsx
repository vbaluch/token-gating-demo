import { useState } from "react";

export function Content() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>();

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const contentRes = await fetch("/api/content");
      setResult(await contentRes.text());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button disabled={isLoading} onClick={fetchContent}>
        Try Fetching Content
      </button>
      <div>{result}</div>
    </div>
  );
}
