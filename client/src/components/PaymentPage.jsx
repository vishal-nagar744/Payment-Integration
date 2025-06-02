import { useState } from "react";
import QRCode from "react-qr-code";
import { FaRupeeSign, FaGooglePay, FaPhone, FaWallet } from "react-icons/fa";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const MERCHANT_UPI_ID = "9806851570@ptaxis";
const MERCHANT_NAME = "Trading Account";

const UpiCollectPage = () => {
  const [amount, setAmount] = useState("");
  const presetAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  // ✅ Generate UPI deep link
  const generateUpiLink = () => {
    if (!amount || amount < 1) return "";
    return `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${MERCHANT_NAME}&am=${amount}&cu=INR&mode=02&purpose=00`;
  };

  // ✅ Handle Payment Redirect (direct UPI app redirection)
  const handlePayment = (app) => {
  if (!amount || amount < 1) {
    alert("Enter a valid amount");
    return;
  }

  const randomTid = Math.floor(100000000000 + Math.random() * 900000000000); // 12-digit random integer
  let upiUrl = "";

  switch (app) {
    case "phonepe":
      upiUrl = `phonepe://pay?pa=${MERCHANT_UPI_ID}&pn=${MERCHANT_NAME}&am=${amount}&cu=INR`;
      break;
    case "gpay":
      upiUrl = `gpay://upi/pay?pa=${MERCHANT_UPI_ID}&pn=${MERCHANT_NAME}&mc=3526&am=${amount}&cu=INR`;
      break;
    case "paytm":
      upiUrl = `paytmmp://cash_wallet?featuretype=money_transfer&pa=${MERCHANT_UPI_ID}&am=${amount}&pn=${MERCHANT_NAME}&tid=${randomTid}`;
      break;
    default:
      upiUrl = generateUpiLink(); // fallback UPI link generator
  }

  // Redirect user to UPI app
  window.location.href = upiUrl;
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Pay to Trading Account
        </h1>

        {/* ✅ Amount Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₹)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`p-2 rounded-lg ${
                  amount == amt ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <div className="mt-4 relative">
            <FaRupeeSign className="absolute top-3 left-3 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-8 pr-4 py-2 border rounded-lg"
              min="1"
              required
            />
          </div>
        </div>

        {/* ✅ Dynamic QR Code */}
        {amount > 0 ? (
          <div className="flex justify-center mb-6">
            <QRCode value={generateUpiLink()} size={200} />
          </div>
        ) : (
          <p className="text-center text-gray-500">Enter amount to generate QR</p>
        )}

        {/* ✅ UPI Payment Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose UPI App
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handlePayment("phonepe")}
              className="p-3 rounded-lg bg-purple-600 text-white flex items-center justify-center"
            >
              <FaPhone className="mr-2" /> PhonePe
            </button>
            <button
              onClick={() => handlePayment("gpay")}
              className="p-3 rounded-lg bg-blue-500 text-white flex items-center justify-center"
            >
              <FaGooglePay className="mr-2" /> GPay
            </button>
            <button
              onClick={() => handlePayment("paytm")}
              className="p-3 rounded-lg bg-gray-800 text-white flex items-center justify-center"
            >
              <FaWallet className="mr-2" /> Paytm
            </button>
          </div>
        </div>

        {/* ✅ Security Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure UPI Payment</p>
          <div className="mt-2 flex items-center justify-center">
            <LockClosedIcon className="w-4 h-4 mr-1" /> Encrypted & Safe
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiCollectPage;
