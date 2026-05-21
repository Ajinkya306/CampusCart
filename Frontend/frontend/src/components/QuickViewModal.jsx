import {
  FaTimes,
} from "react-icons/fa";

export default function QuickViewModal({

  product,
  onClose,

}) {

  if (!product) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden relative">

        {/* CLOSE BUTTON */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 p-3 rounded-full transition-all z-10"
        >

          <FaTimes />

        </button>

        <div className="grid lg:grid-cols-2">

          {/* IMAGE */}

          <div className="bg-slate-100 p-6">

            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-[500px] object-cover rounded-3xl"
            />

          </div>

          {/* DETAILS */}

          <div className="p-10">

            <div className="flex gap-3 mb-6">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

                {product.category}

              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                {product.condition}

              </span>

            </div>

            <h1 className="text-4xl font-black text-gray-800 leading-tight">

              {product.title}

            </h1>

            <p className="text-5xl font-black text-blue-700 mt-6">

              ₹{product.price}

            </p>

            <p className="text-gray-600 text-lg leading-8 mt-8">

              {product.description}

            </p>

            <div className="mt-10 space-y-4">

              <div className="flex justify-between border-b pb-4">

                <span className="text-gray-500 font-semibold">

                  College

                </span>

                <span className="font-bold text-gray-800">

                  {product.college}

                </span>

              </div>

              <div className="flex justify-between border-b pb-4">

                <span className="text-gray-500 font-semibold">

                  City

                </span>

                <span className="font-bold text-gray-800">

                  {product.city}

                </span>

              </div>

            </div>

            <a
              href={`https://wa.me/91${product.whatsapp}`}
              target="_blank"
              className="block mt-10 bg-gradient-to-r from-blue-700 to-purple-700 text-white text-center py-5 rounded-2xl text-xl font-bold hover:opacity-90 transition-all"
            >

              Contact Seller

            </a>

          </div>

        </div>

      </div>

    </div>
  );
}