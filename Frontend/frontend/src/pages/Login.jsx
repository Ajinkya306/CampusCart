export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-800">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Login
        </h1>

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-4 rounded-xl mb-5"
        />

        <button className="w-full bg-blue-700 text-white py-4 rounded-xl hover:bg-blue-800">
          Send OTP
        </button>
      </div>
    </div>
  );
}