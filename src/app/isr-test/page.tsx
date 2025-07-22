export const revalidate = 10; // Revalidate every 10 seconds

async function getData() {
  const timestamp = new Date().toISOString();
  
  // Simulate fetching data from an API
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: { revalidate: 10 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  
  return {
    timestamp,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    description: data.description
  };
}

export default async function ISRTestPage() {
  const data = await getData();
  
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">ISR Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Page Generation Time</h2>
          <p className="text-lg font-mono text-blue-600">{data.timestamp}</p>
          <p className="text-sm text-gray-600 mt-2">This page revalidates every 10 seconds</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Next.js Repository Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Stars</p>
              <p className="text-2xl font-bold text-gray-900">{data.stars.toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Forks</p>
              <p className="text-2xl font-bold text-gray-900">{data.forks.toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Open Issues</p>
              <p className="text-2xl font-bold text-gray-900">{data.openIssues.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Description</p>
            <p className="text-gray-800">{data.description}</p>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">How ISR Works</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>This page is statically generated at build time</li>
            <li>It revalidates every 10 seconds in the background</li>
            <li>When you refresh after 10 seconds, you may see updated data</li>
            <li>The timestamp shows when the page was last generated</li>
          </ul>
        </div>
      </div>
    </div>
  );
}