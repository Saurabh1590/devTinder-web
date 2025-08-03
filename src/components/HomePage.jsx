// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHeroIcon from './AnimatedHeroIcon';

const HomePage = () => {
  // Animation variants for sections that slide in from below
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex-grow bg-base-100 overflow-x-hidden"> {/* Prevent horizontal scrollbar from animations */}
      
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center min-h-[calc(100vh-4rem)] px-4">
        <AnimatedHeroIcon />
        <motion.h1 
          className="text-5xl font-bold text-primary mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Find Your Missing Semicolon;
        </motion.h1>
        <motion.p 
          className="py-6 text-lg max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          Tired of pair programming with your rubber duck? Connect with developers who get your bugs and your features.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
        >
          <Link to="/login" className="btn btn-primary btn-lg">
            Start Matching
          </Link>
        </motion.div>
      </section>

      {/* "Why DevTinder" Section with Scroll Animations */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto text-center px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            A Platform Built for Devs, by Devs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="card bg-base-300 shadow-lg p-6 rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              variants={sectionVariants}
            >
              <h3 className="font-bold text-xl text-primary mb-2">Push-Worthy Connections</h3>
              <p>Our algorithm is smarter than your last commit message. We match you on skills, projects, and editor themes. (Vim or Emacs? We dare to ask.)</p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div 
              className="card bg-base-300 shadow-lg p-6 rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              variants={sectionVariants}
            >
              <h3 className="font-bold text-xl text-primary mb-2">Merge, Don't Conflict</h3>
              <p>Find your perfect partner for a hackathon or for life. Build projects together, review each other's code, and resolve merge conflicts, both in Git and in life.</p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div 
              className="card bg-base-300 shadow-lg p-6 rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              variants={sectionVariants}
            >
              <h3 className="font-bold text-xl text-primary mb-2">End-to-End Encrypted</h3>
              <p>Your privacy is our priority. We've got your back(end) covered so you can focus on making meaningful connections. No data leaks, guaranteed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 bg-base-100 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold text-secondary mb-6">
            Ready to `init` a new relationship?
          </h2>
          <p className="text-lg mb-8">Stop committing to loneliness. Your next great collaboration is just a swipe away.</p>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Join the Repo
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
