import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../hooks/useAuth";

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
            "https://al-madina-foods-server.vercel.app/donor-stats",
            {
              params: { donatorEmail: user.email },
            }
          );
          setDonorStats(response.data);
        }

        // Fetch all donors' stats
        const allDonorsResponse = await axios.get(
          "https://al-madina-foods-server.vercel.app/donor-stats/all"
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
    <div className="bg-gradient-to-br from-purple-200 to-blue-200 p-10 rounded-lg shadow-lg">
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
          <h2 className="text-3xl font-bold mb-4">Your Donation Badge</h2>
          {donorStats ? (
            <>
              <p className="text-lg mb-6">
                You have donated {donorStats.totalDonations} items!
              </p>
              <p className="text-lg font-semibold">
                Current Badge: {getBadge(donorStats.totalDonations)}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No donation data available for you.</p>
          )}

          {/* Leaderboard */}
          <h2 className="text-3xl font-bold mt-10 mb-4">Top Donors</h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Total Donations</th>
                  <th>Badge</th>
                </tr>
              </thead>
              <tbody>
                {allDonors.map((donor, index) => (
                  <tr
                    key={donor._id}
                    className={
                      donor._id === user?.email ? "bg-green-100 font-bold" : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{donor._id}</td>
                    <td>{donor.totalDonations}</td>
                    <td>{getBadge(donor.totalDonations)}</td>
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
