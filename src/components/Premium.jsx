import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";

const Premium = () => {
  const silverFeatures = [
    "Chat with other people",
    "100 connection requests per day",
    "Blue Tick",
    "3 months duration",
  ];

  const goldFeatures = [
    "Chat with other people",
    "Infinite connection requests per day",
    "Blue Tick",
    "6 months duration",
    "Priority support",
  ];

  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: plan,
      },
      {
        withCredentials: true,
      }
    );

    // Razor Dialog Box

    const { keyId, amount, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to developers around the world",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#528FF0",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-12 text-center text-blue-400">
        Choose Your DevTinder Membership
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full justify-center items-stretch">
        {/* Silver Membership Card */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 border-2 border-gray-700">
          <div>
            <h3 className="text-3xl font-extrabold text-center mb-6 text-silver-400">
              Silver Membership
            </h3>
            <ul className="space-y-4 mb-8 text-lg">
              {silverFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {/* Optional svg replace with real one  */}
                  <svg
                    className="w-6 h-6 mr-3 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <button
              onClick={() => handleBuyClick("silver")}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
            >
              Buy Silver
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center text-2xl font-bold text-gray-500 px-4">
          OR
        </div>
        <div className="block lg:hidden text-center text-2xl font-bold text-gray-500 my-6">
          OR
        </div>

        {/* Gold Membership Card */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 border-2 border-blue-600 relative overflow-hidden">
          {/* Optional: "Most Popular" badge */}
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </span>
          <div>
            <h3 className="text-3xl font-extrabold text-center mb-6 text-gold-400">
              Gold Membership
            </h3>
            <ul className="space-y-4 mb-8 text-lg">
              {goldFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {/* Optional svg replace with real one */}
                  <svg
                    className="w-6 h-6 mr-3 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <button
              onClick={() => handleBuyClick("gold")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
