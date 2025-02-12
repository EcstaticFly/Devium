export default function Home() {
    return <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <div className="">header</div>
    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="">editor</div>
          <div className="">output</div>
        </div>
      </div>
    </div>;
  }