"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-lightBeige w-full font-mono">
      <section
        id="about"
        className="relative min-h-screen w-full p-10 md:p-24 lg:px-40 xl:pt-10 lg:snap-start  overflow-clip "
      >
        <motion.h1
          className="font-black text-5xl pb-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ABOUT
        </motion.h1>
        <motion.section
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ y: -5, transition: { duration: 1 } }}
        >
          <h2 className="text-xl font-semibold mb-4">Our Mission:</h2>
          <p className="text-gray-700">
            We're on a mission to simplify online shopping by leveraging
            intuitive technology that speaks your language, understands your
            preferences, and enhances your shopping environment.
          </p>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ y: -5, transition: { duration: 1 } }}
        >
          <h2 className="text-xl font-semibold mb-4">Key Features:</h2>
          <ul className="list-disc list-inside">
            <li className="text-gray-700 mb-2">
              <b>Multi-lingual conversational assistance:</b> Our platform
              breaks language barriers by providing natural language
              understanding and generation capabilities in multiple languages.
              Whether you're browsing from Tokyo or Toronto, our AI-powered
              assistants ensure clear communication and personalized support.
            </li>
            <li className="text-gray-700 mb-2">
              <b>Reality Augmentation for E-Commerce:</b> Immerse yourself in a
              virtual shopping environment with our reality augmentation
              features. Visualize products in your surroundings through
              augmented reality, enabling you to assess their fit, style, and
              compatibility with your space before making a purchase.
            </li>
            <li className="text-gray-700 mb-2">
              <b>Gen-AI Enhancements:</b> Experience personalized shopping like
              never before. Our AI-driven platform learns from your interactions
              to provide tailored recommendations and assistance, ensuring every
              step of your shopping journey is effortless and enjoyable.
            </li>
          </ul>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ y: -5, transition: { duration: 1 } }}
        >
          <h2 className="text-xl font-semibold mb-4">Benefits:</h2>
          <ul className="list-disc list-inside">
            <li className="text-gray-700 mb-2">
              Simplicity: Our user-friendly interface ensures a seamless
              shopping experience, making it easy for you to browse, discover,
              and purchase products hassle-free.
            </li>
            <li className="text-gray-700 mb-2">
              Accessibility: Break through language barriers effortlessly, as
              our platform caters to a global audience with multi-lingual
              support and intuitive design.
            </li>
            <li className="text-gray-700 mb-2">
              Personalization: Enjoy a personalized shopping experience tailored
              to your preferences, with AI enhancements that anticipate your
              needs and provide relevant recommendations.
            </li>
          </ul>
        </motion.section>
      </section>
    </main>
  );
}
