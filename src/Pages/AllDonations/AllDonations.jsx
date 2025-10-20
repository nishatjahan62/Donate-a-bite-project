import React, { useEffect, useState } from "react";
import DonationCard from "../../Components/donationCard/DonationCard";
import useAxios from "../../Hooks/UseAxios";
import Button from "../Shared/Button/Button";

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
      const unit = match[2]
        ? match[2].toLowerCase()
        : qUnit
        ? String(qUnit).toLowerCase()
        : null;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Search filtering
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

  // Sorting
  const handleSort = (type) => {
    setSortType(type);
    setDropdownOpen(false);

    const arr = [...filteredDonations];

    const getKey = (donation) => {
      const { value, unit } = parseQuantity(donation);
      const unitKey = unit ? unit.toLowerCase() : "default";
      const priority = UNIT_PRIORITY[unitKey] ?? UNIT_PRIORITY.default;
      const numeric =
        value === null || Number.isNaN(value) ? null : Number(value);
      return { priority, numeric, unit: unitKey };
    };

    arr.sort((a, b) => {
      const A = getKey(a);
      const B = getKey(b);
      if (A.numeric === null && B.numeric === null) return 0;
      if (A.numeric === null) return 1;
      if (B.numeric === null) return -1;
      if (A.priority !== B.priority) return A.priority - B.priority;
      return type === "asc" ? A.numeric - B.numeric : B.numeric - A.numeric;
    });

    setFilteredDonations(arr);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-secondary">
        Loading donations...
      </p>
    );

  return (
    <div className="mt-20 sm:mt-20 lg:mt-26 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center py-3 pb-10">
        <h2 className="text-3xl font-bold text-primary">All Donations</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Explore Every Act of Generosity
        </p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 md:gap-4 mb-8 w-full">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title, restaurant, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2 px-4 py-2 border border-secondary rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-secondary 
                     dark:bg-gray-800 dark:text-gray-100"
        />

        {/* Sort Dropdown */}
        <div className="relative  md:w-auto">
          <Button
            label="Sort by Quantity"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full md:w-auto px-4 py-2 rounded-lg border-2 border-secondary 
                       flex items-center justify-between gap-2 text-secondary 
                       hover:bg-secondary hover:text-white transition"
          >
            <span className="text-lg ">{dropdownOpen ? "▲" : "▼"}</span>
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 
                            shadow-lg rounded-lg border border-secondary 
                            dark:border-gray-700 z-10 w-full md:w-48">
              <button
                onClick={() => handleSort("asc")}
                className={`block w-full text-left px-4 py-2 rounded-t-lg 
                  ${sortType === "asc"
                    ? "text-primary font-semibold"
                    : "hover:text-primary"}`}
              >
                Ascending (kg → portions)
              </button>
              <button
                onClick={() => handleSort("desc")}
                className={`block w-full text-left px-4 py-2 rounded-b-lg 
                  ${sortType === "desc"
                    ? "text-primary font-semibold"
                    : "hover:text-primary"}`}
              >
                Descending (kg → portions)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Donations Grid */}
      {filteredDonations.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No donations found.
        </p>
      ) : (
        <div className="grid gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        " >
          {filteredDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonations;
