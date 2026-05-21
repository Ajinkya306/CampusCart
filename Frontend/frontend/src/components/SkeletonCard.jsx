export default function SkeletonCard() {

  return (

    <div className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">

      <div className="w-full h-60 bg-slate-300"></div>

      <div className="p-5">

        <div className="h-6 bg-slate-300 rounded-full w-3/4"></div>

        <div className="h-8 bg-slate-300 rounded-full w-1/2 mt-5"></div>

        <div className="h-5 bg-slate-300 rounded-full w-1/3 mt-5"></div>

        <div className="h-12 bg-slate-300 rounded-2xl mt-8"></div>

        <div className="h-12 bg-slate-300 rounded-2xl mt-5"></div>

      </div>

    </div>
  );
}