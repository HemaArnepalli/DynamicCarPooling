import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Full Page Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 text-white">
        <h1 className="text-2xl font-bold tracking-wide">🚘 RideShare+</h1>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
        >
          Dynamic Ride Sharing & Carpooling
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-200 max-w-2xl mb-8"
        >
          Connect drivers and passengers effortlessly. Save money, reduce traffic,
          and travel smarter with our easy-to-use platform.
        </motion.p>

        {/* Buttons */}
        <div className="flex gap-6 flex-wrap justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/passenger")}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg font-semibold"
          >
            🧍 Passenger
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/driver")}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg shadow-lg font-semibold"
          >
            🚗 Driver
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/admin/login")}
            className="px-8 py-3 bg-red-600 text-white rounded-lg shadow-lg font-semibold"
          >
            👑 Admin
          </motion.button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-10 text-center text-white">
        <h3 className="text-3xl font-bold mb-12">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="💸 Affordable"
            desc="Save fuel & reduce costs by sharing rides."
          />
          <FeatureCard
            title="🌍 Eco-Friendly"
            desc="Cut down emissions by reducing solo drives."
          />
          <FeatureCard
            title="🔒 Secure"
            desc="Verified drivers & passengers ensure safety."
          />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black/70 text-gray-300 text-center py-6">
        <p>© {new Date().getFullYear()} RideShare+. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// Card Component
function FeatureCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-8"
    >
      <h4 className="text-xl font-semibold mb-4 text-white">{title}</h4>
      <p className="text-gray-200">{desc}</p>
    </motion.div>
  );
}