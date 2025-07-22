export const revalidate = 5; // Revalidate every 5 seconds

async function getTimeData() {
  // During build time, return mock data instead of fetching
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_BASE_URL) {
    return {
      timestamp: new Date().toISOString(),
      randomNumber: Math.floor(Math.random() * 1000),
      message: 'Initial build data (will update after revalidation)'
    };
  }
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/time`, {
      next: { revalidate: 5 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch time data');
    }
    
    return res.json();
  } catch (error) {
    // Return fallback data during build or if API is unavailable
    console.log('Using fallback data:', error);
    return {
      timestamp: new Date().toISOString(),
      randomNumber: Math.floor(Math.random() * 1000),
      message: 'Fallback data (API unavailable during build)'
    };
  }
}

export default async function ISRCustomPage() {
  const data = await getTimeData();
  const buildTime = new Date().toISOString();
  
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">ISR with Custom API</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Build Time vs API Time</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Page Build Time:</p>
              <p className="text-lg font-mono text-blue-600">{buildTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">API Response Time:</p>
              <p className="text-lg font-mono text-green-600">{data.timestamp}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">This page revalidates every 5 seconds</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dynamic Data</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Random Number</p>
              <p className="text-3xl font-bold text-gray-900">{data.randomNumber}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">Message</p>
              <p className="text-gray-800">{data.message}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-yellow-900">Testing Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-yellow-800">
            <li>Note the current timestamps and random number</li>
            <li>Wait at least 5 seconds</li>
            <li>Refresh the page</li>
            <li>Observe if the data has changed</li>
            <li>The first user after revalidation triggers regeneration</li>
          </ol>
        </div>
      </div>
    </div>
  );
}