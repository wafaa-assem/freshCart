import { Link } from "react-router-dom";

export default function AllOrders() {
  return<>
<div className="flex flex-col items-center justify-center h-screen bg-green-50 border border-green-200 text-green-800 font-medium rounded-lg p-4 m-4 shadow-sm">
  <span className="text-2xl mb-4">Your payment is successful! 🎉</span>
  <Link to='/home'>
  <button className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300">
    Go to Home
  </button></Link>
</div>
  </>
}
