const CardSkeleton = () => (
    <div className="relative group">
      <div className="bg-[#1e1e2e]/80 rounded-xl border border-[#313244]/50 overflow-hidden h-[280px]">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-800 animate-pulse" />
              <div className="space-y-2">
                <div className="w-24 h-6 bg-gray-800 rounded-lg animate-pulse" />
                <div className="w-20 h-4 bg-gray-800 rounded-lg animate-pulse" />
              </div>
            </div>
            <div className="w-16 h-8 bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-3/4 h-7 bg-gray-800 rounded-lg animate-pulse" />
            <div className="w-1/2 h-5 bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2 bg-black/30 rounded-lg p-4">
            <div className="w-full h-4 bg-gray-800 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-800 rounded animate-pulse" />
            <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
  
  export default CardSkeleton;