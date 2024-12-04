import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-purple-300/10 text-sm font-medium bg-purple-500/5 backdrop-blur-sm text-purple-200">
              Welcome to the future
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 pb-2">
              Create Something
            </span>
            <br />
            <span className="inline-block text-purple-50/90">Extraordinary</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-xl text-purple-200/70 leading-relaxed">
            Push the boundaries of what's possible with our cutting-edge platform. 
            Build, innovate, and transform your ideas into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-purple-500 hover:bg-purple-400 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 text-purple-50"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-300/10 transition-colors"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-purple-200" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-300/10 transition-colors"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 text-purple-200" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;