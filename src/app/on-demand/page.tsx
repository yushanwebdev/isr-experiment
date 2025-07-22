import RevalidateButton from "./revalidate-button";

async function getData() {
  const timestamp = new Date().toISOString();
  const randomValue = Math.floor(Math.random() * 10000);

  return {
    timestamp,
    randomValue,
    processId: process.pid,
  };
}

export default async function OnDemandPage() {
  const data = await getData();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          On-Demand Revalidation Test
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Current Page Data
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Generation Time:</p>
              <p className="text-lg font-mono text-blue-600">
                {data.timestamp}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Random Value:</p>
              <p className="text-3xl font-bold text-green-600">
                {data.randomValue}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Process ID:</p>
              <p className="text-lg font-mono text-gray-700">
                {data.processId}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Trigger Revalidation
          </h2>
          <p className="text-gray-600 mb-4">
            Click the button below to trigger on-demand revalidation. The page
            will automatically refresh to show updated data.
          </p>
          <RevalidateButton path="/on-demand" />
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-900">
            How On-Demand Revalidation Works
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-purple-800">
            <li>This page is statically generated at build time</li>
            <li>
              Unlike ISR, it won&apos;t automatically revalidate after a time period
            </li>
            <li>Clicking &quot;Revalidate This Page&quot; calls the revalidation API</li>
            <li>The API purges the cache for this specific page</li>
            <li>The next request will trigger a fresh generation</li>
            <li>All values (timestamp, random number) will update</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
