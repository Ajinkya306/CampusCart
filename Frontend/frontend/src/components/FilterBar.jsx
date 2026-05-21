export default function FilterBar({

  search,
  setSearch,

  category,
  setCategory,

  college,
  setCollege,

  condition,
  setCondition,

  sort,
  setSort,

}) {

  return (

    <div className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-3xl shadow-xl mt-10 flex flex-wrap gap-5">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="px-5 py-4 rounded-2xl border border-slate-300 bg-white shadow-md w-72 text-black"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="px-5 py-4 rounded-2xl border border-slate-300 bg-white shadow-md w-48"
      >

        <option value="">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Books">
          Books
        </option>

        <option value="Medical">
          Medical
        </option>

      </select>

      <input
        type="text"
        placeholder="College"
        value={college}
        onChange={(e) =>
          setCollege(e.target.value)
        }
        className="px-5 py-4 rounded-2xl border border-slate-300 bg-white shadow-md w-72 text-black"
      />

      <select
        value={condition}
        onChange={(e) =>
          setCondition(e.target.value)
        }
        className="px-5 py-4 rounded-2xl border border-slate-300 bg-white shadow-md w-48"
      >

        <option value="">
          Condition
        </option>

        <option value="New">
          New
        </option>

        <option value="Used">
          Used
        </option>

      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="px-5 py-4 rounded-2xl border border-slate-300 bg-white shadow-md w-56"
      >

        <option value="">
          Sort By
        </option>

        <option value="low">
          Price Low to High
        </option>

        <option value="high">
          Price High to Low
        </option>

      </select>

    </div>
  );
}