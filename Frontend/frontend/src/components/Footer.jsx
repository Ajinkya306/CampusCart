export default function Footer() {

  return (

    <footer className="bg-slate-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold">
          CampusCart
        </h2>

        <p className="text-slate-400 mt-4">
          Everything Students Need
        </p>

        <p className="text-slate-500 mt-10">
          © 2026 CampusCart. All rights reserved.
        </p>

        <div className="border-t border-slate-800 mt-8 pt-6">

          <p className="text-slate-400 text-lg">
            For any query and feedback contact
          </p>

          <p className="text-blue-400 mt-2 text-lg font-semibold">
            AJINKYA MOTE :
            <a
              href="mailto:ajinkyakm306@gmail.com"
              className="ml-2 hover:underline"
            >
              ajinkyakm306@gmail.com
            </a>
          </p>

        </div>

      </div>

    </footer>
  );
}