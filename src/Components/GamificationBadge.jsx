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
            `${import.meta.env.VITE_API_URL}/donor-stats`,
            { params: { email: user?.email } }
          );
          setDonorStats(response.data);
        }

        // Fetch all donors' stats
        const allDonorsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/donor-stats/all`
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
    if (totalDonations >= 50) return "💎 Diamond";
    if (totalDonations >= 20) return "🥇 Gold";
    if (totalDonations >= 10) return "🥈 Silver";
    if (totalDonations >= 5) return "🥉 Bronze";
    return "🚀 Starter";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-teal-500 to-green-800 p-6 sm:p-12 rounded-lg shadow-2xl text-white">
      {loading ? (
        // 🎭 Skeleton Loader for Badge Section
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto mb-6"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      ) : (
        <>
          {/* 🏅 Logged-in User Badge */}
          <motion.h2
            className="text-4xl font-extrabold text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎖️ Your Donation Badge
          </motion.h2>
          {donorStats ? (
            <motion.div
              className="text-center p-6 rounded-lg bg-white/20 shadow-md backdrop-blur-md border border-yellow-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg font-semibold">
                You have donated{" "}
                <span className="text-yellow-300 font-bold text-2xl">
                  {donorStats.totalDonations}
                </span>{" "}
                items!
              </p>
              <p className="text-xl font-bold mt-4">
                Current Badge:{" "}
                <motion.span
                  className="text-emerald-300 text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {getBadge(donorStats.totalDonations)}
                </motion.span>
              </p>
            </motion.div>
          ) : (
            <p className="text-center text-gray-200">
              No donation data available for you.
            </p>
          )}

          {/* 🏆 Leaderboard Section */}
          <motion.h2
            className="text-3xl font-bold text-center mt-12 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🏆 Top Donors
          </motion.h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white/20 backdrop-blur-md text-white rounded-lg shadow-md border border-gray-300">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Total Donations</th>
                  <th className="px-4 py-3">Badge</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? // 🟡 Skeleton Loaders for Leaderboard
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse bg-gray-300">
                        <td className="px-4 py-3 h-6"></td>
                        <td className="px-4 py-3 h-6 w-40 bg-gray-400 rounded"></td>
                        <td className="px-4 py-3 h-6 w-24 bg-gray-400 rounded"></td>
                        <td className="px-4 py-3 h-6 w-32 bg-gray-400 rounded"></td>
                      </tr>
                    ))
                  : allDonors.map((donor, index) => (
                      <motion.tr
                        key={donor._id}
                        className={`${
                          donor._id === user?.email
                            ? "bg-emerald-500/30 font-bold border-2 border-yellow-400"
                            : "bg-white/10"
                        } text-center hover:bg-green-400/40 transition-all`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{donor._id}</td>
                        <td className="px-4 py-3">{donor.totalDonations}</td>
                        <td className="px-4 py-3 text-lg">
                          {getBadge(donor.totalDonations)}
                        </td>
                      </motion.tr>
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
