import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const GamificationBadge = () => {
  const { user } = useAuth(); // Logged-in user info
  const [donorStats, setDonorStats] = useState(null); // Logged-in user's stats
  const [allDonors, setAllDonors] = useState([]); // All donors' stats
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonorStats = async () => {
      try {
        // Fetch logged-in user's stats
        if (user?.email) {
          const response = await axios.get(
            "http://localhost:3000/donor-stats",
            {
              params: { email: user?.email },
            }
          );
          setDonorStats(response.data);
        }

        // Fetch all donors' stats
        const allDonorsResponse = await axios.get(
          "http://localhost:3000/donor-stats/all"
        );
        setAllDonors(allDonorsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donor stats:", error);
        setLoading(false);
      }
    };

    fetchDonorStats();
  }, [user]);

  const getBadge = (totalDonations) => {
    if (totalDonations >= 50) return "Diamond";
    if (totalDonations >= 20) return "Gold";
    if (totalDonations >= 10) return "Silver";
    if (totalDonations >= 5) return "Bronze";
    return "Starter";
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 p-8 sm:p-12 rounded-lg shadow-xl">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-6"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Logged-in User Stats */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Your Donation Badge
          </h2>
          {donorStats ? (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                You have donated{" "}
                <span className="text-purple-600 font-bold">
                  {donorStats.totalDonations}
                </span>{" "}
                items!
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Current Badge:{" "}
                <span className="text-purple-600">
                  {getBadge(donorStats.totalDonations)}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No donation data available for you.
            </p>
          )}

          {/* Leaderboard */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mt-10 mb-6">
            Top Donors
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-purple-200 text-gray-800">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Total Donations</th>
                  <th className="px-4 py-2">Badge</th>
                </tr>
              </thead>
              <tbody>
                {allDonors.map((donor, index) => (
                  <tr
                    key={donor._id}
                    className={`${
                      donor._id === user?.email
                        ? "bg-green-100 font-bold"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2">{donor._id}</td>
                    <td className="px-4 py-2 text-center">
                      {donor.totalDonations}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {getBadge(donor.totalDonations)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GamificationBadge;
