import React, { useEffect, useState } from "react";
import DonationCard from "../../Components/donationCard/DonationCard";
import useAxios from "../../Hooks/UseAxios";

const UNIT_PRIORITY = {
  kg: 0,
  kilogram: 0,
  kilograms: 0,
  kgs: 0,
  portions: 1,
  portion: 1,
  pcs: 1,
  piece: 1,
  default: 2, 
};

const parseQuantity = (donation) => {

  const q = donation?.quantity;
  const qUnit = donation?.quantityUnit || donation?.unit || null;

  if (typeof q === "number") {
    const unit = qUnit ? String(qUnit).trim().toLowerCase() : null;
    return { value: q, unit: unit || null };
  }

  if (typeof q === "string") {
    const match = q.trim().match(/^([\d.,]+)\s*([a-zA-Z]+)?/);
    if (match) {
      const rawNum = match[1].replace(",", ".");
      const value = Number(rawNum);
      const unit = match[2] ? match[2].toLowerCase() : (qUnit ? String(qUnit).toLowerCase() : null);
      if (!Number.isNaN(value)) return { value, unit: unit || null };
    }
  }

  return { value: null, unit: qUnit ? String(qUnit).toLowerCase() : null };
};

const AllDonations = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  const axios = useAxios();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("/donations/all");
        setDonations(res.data);
        setFilteredDonations(res.data);
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [axios]);

  // Search
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredDonations(donations);
      return;
    }
    const filtered = donations.filter((donation) => {
      const { title = "", foodType = "", restaurant = {} } = donation;
      const name = restaurant?.name || "";
      return (
        String(title).toLowerCase().includes(term) ||
        String(foodType).toLowerCase().includes(term) ||
        String(name).toLowerCase().includes(term)
      );
    });
    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

  // sorting function 
  const handleSort = (type) => {
    setSortType(type);
    let arr = [...filteredDonations];

    const getKey = (donation) => {
      const { value, unit } = parseQuantity(donation);
      const unitKey = unit ? unit.toLowerCase() : "default";
      const priority = UNIT_PRIORITY[unitKey] ?? UNIT_PRIORITY.default;
  
      const numeric = value === null || Number.isNaN(value) ? null : Number(value);
      return { priority, numeric, unit: unitKey };
    };

    if (type === "quantityAsc") {
      arr.sort((a, b) => {
        const A = getKey(a);
        const B = getKey(b);
        if (A.numeric === null && B.numeric === null) return 0;
        if (A.numeric === null) return 1;
        if (B.numeric === null) return -1;
        if (A.priority !== B.priority) return A.priority - B.priority;
        return A.numeric - B.numeric;
      });
    } else if (type === "quantityDesc") {
      arr.sort((a, b) => {
        const A = getKey(a);
        const B = getKey(b);
        if (A.numeric === null && B.numeric === null) return 0;
        if (A.numeric === null) return 1;
        if (B.numeric === null) return -1;
        if (A.priority !== B.priority) return A.priority - B.priority; // keep same group order but we will flip numeric
        return B.numeric - A.numeric;
      });
    } else if (type === "titleAsc") {
      arr.sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));
    } else if (type === "titleDesc") {
      arr.sort((a, b) => String(b.title || "").localeCompare(String(a.title || "")));
    }

    setFilteredDonations(arr);
  };

  if (loading)
    return <p className="text-center mt-10 text-secondary">Loading donations...</p>;

  return (
    <div className="lg:mt-40 sm:mt-34 mt-30">
    <div className="text-center py-3 pb-16">
  <h2 className="text-3xl poppins font-bold text-primary">
    All Donations
  </h2>
  <p className="text-white dark:text-gray-300 text-lg">
    Explore Every Act of Generosity
  </p>
</div>


      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title, restaurant, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:text-gray-100"
        />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleSort("quantityAsc")}
            className={`px-4 py-2 rounded-lg border-2 ${
              sortType === "quantityAsc"
                ? "bg-secondary text-white border-secondary"
                : "border-secondary text-secondary"
            }`}
          >
            Quantity ↑ (kg → portions)
          </button>

          <button
            onClick={() => handleSort("quantityDesc")}
            className={`px-4 py-2 rounded-lg border-2 ${
              sortType === "quantityDesc"
                ? "bg-secondary text-white border-secondary"
                : "border-secondary text-secondary"
            }`}
          >
            Quantity ↓ (kg → portions)
          </button>

          <button
            onClick={() => handleSort("titleAsc")}
            className={`px-4 py-2 rounded-lg border-2 ${
              sortType === "titleAsc"
                ? "bg-primary text-white border-primary"
                : "border-primary text-primary"
            }`}
          >
            Title A–Z
          </button>

          <button
            onClick={() => handleSort("titleDesc")}
            className={`px-4 py-2 rounded-lg border-2 ${
              sortType === "titleDesc"
                ? "bg-primary text-white border-primary"
                : "border-primary text-primary"
            }`}
          >
            Title Z–A
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredDonations.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
