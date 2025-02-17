import CardSkeleton from "./CardSkeleton";

const SnippetsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-[20%] -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="w-48 h-8 bg-gray-800 rounded-full mx-auto animate-pulse" />
          <div className="w-96 h-12 bg-gray-800 rounded-xl mx-auto animate-pulse" />
          <div className="w-72 h-6 bg-gray-800 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="max-w-5xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <div className="w-full h-14 bg-[#1e1e2e]/80 rounded-xl border border-[#313244] animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-gray-800 rounded-lg animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetsPageSkeleton;
