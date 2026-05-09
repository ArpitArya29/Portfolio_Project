import React, { use } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, Code, User } from "lucide-react";

const PortfolioUI = ({ portfolio }) => {
  const { user, title, bio, skills, experiences, projects } = portfolio;

  const coreSortedSkills = skills.sort((a, b) => b.proficicncy - a.proficicncy);
  const sortedExperiences = experiences.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  

  const getFormattedDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-x-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background gradients for premium glassmorphism feel */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gradient-radial from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-12"
          >
            {/* Multi-layered glowing rings */}
            <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute inset-4 bg-linear-to-tr from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-50 animate-pulse delay-300" />
            <div className="absolute inset-8 bg-linear-to-tr from-indigo-300 to-purple-300 rounded-full blur-xl opacity-70 animate-pulse delay-700" />

            <img
              src={user?.image}
              alt={user?.name}
              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-base-200/50 shadow-[0_0_60px_rgba(99,102,241,0.4)] relative z-10 backdrop-blur-sm"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-linear-to-r from-base-content via-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            {user?.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-8"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="max-w-3xl text-base-content/80 text-xl md:text-2xl leading-relaxed mb-16 font-light"
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-base-content/60"
          >
            <span className="text-sm uppercase tracking-[0.3em] font-bold text-indigo-400">
              Discover More
            </span>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-indigo-400/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-1 h-3 bg-indigo-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left: Orbit UI */}
            <div className="relative w-full aspect-square max-w-lg mx-auto flex justify-center items-center">
              {/* Orbital Rings with enhanced gradients */}
              <div className="absolute inset-8 sm:inset-12 bg-linear-to-b from-indigo-500/10 to-transparent rounded-full border border-indigo-500/20 shadow-[0_0_60px_rgba(99,102,241,0.1)]" />
              <div className="absolute inset-20 sm:inset-28 bg-linear-to-b from-purple-500/10 to-transparent rounded-full border border-purple-500/20 shadow-[0_0_60px_rgba(147,51,234,0.1)]" />
              <div className="absolute inset-32 sm:inset-44 bg-linear-to-b from-pink-500/5 to-transparent rounded-full border border-pink-500/10" />

              {/* Core Center Node with enhanced glow */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-base-200 border border-base-content/10 shadow-[0_0_80px_-10px_rgba(99,102,241,0.6)] flex items-center justify-center z-20 relative">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse" />
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400 relative z-10" />
              </div>

              {/* Orbiting Elements with improved styling */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                className="absolute inset-0 z-10 group"
              >
                {/* Pause orbit on hover wrapper */}
                <div className="w-full h-full group-hover:[animation-play-state:paused]">
                  {coreSortedSkills?.slice(0, 5).map((skill, index) => {
                    const angle = (index / 5) * 360;
                    const radius = 45; // percentage distance
                    const top = `calc(50% - ${radius}% * ${Math.cos((angle * Math.PI) / 180)})`;
                    const left = `calc(50% + ${radius}% * ${Math.sin((angle * Math.PI) / 180)})`;

                    return (
                      <motion.div
                        key={index}
                        className="absolute w-max px-5 py-3 sm:px-6 sm:py-3.5 bg-base-100/95 backdrop-blur-xl rounded-full border border-base-content/10 shadow-xl flex items-center justify-center cursor-default hover:bg-linear-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] transition-all duration-300 group/skill"
                        style={{
                          top,
                          left,
                          transform: "translate(-50%, -50%)",
                        }}
                        whileHover={{ scale: 1.15, y: -2 }}
                      >
                        {/* Counter-rotate text so it remains upright */}
                        <motion.span
                          animate={{ rotate: -360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 50,
                            ease: "linear",
                          }}
                          className="text-sm sm:text-base font-bold text-base-content/90 group-hover/skill:text-transparent group-hover/skill:bg-clip-text group-hover/skill:bg-linear-to-r group-hover/skill:from-indigo-400 group-hover/skill:to-purple-400"
                        >
                          {skill.name}
                        </motion.span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right: Enhanced Skills Grid */}
            <div className="flex flex-col gap-12 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-center lg:text-left"
              >
                <h3 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Core Competencies
                </h3>
                <p className="text-base-content/70 leading-relaxed text-lg sm:text-xl max-w-lg">
                  Mastering cutting-edge technologies to build scalable,
                  innovative solutions that push the boundaries of what's
                  possible.
                </p>
              </motion.div>

              {/* Featured Skills Grid */}
              <div className="grid grid-cols-2 gap-4">
                {coreSortedSkills?.slice(0, 8).map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="group relative p-5 rounded-2xl bg-base-200/60 backdrop-blur-md border border-base-content/5 hover:border-indigo-500/40 hover:bg-linear-to-br hover:from-indigo-500/10 hover:to-purple-500/10 hover:shadow-[0_12px_40px_-5px_rgba(99,102,241,0.25)] transition-all duration-500 cursor-default overflow-hidden"
                  >
                    {/* Enhanced hover glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                        <Code className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                      </div>
                      <span className="text-base-content/90 font-semibold text-sm sm:text-base tracking-wide group-hover:text-base-content">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="py-32 px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-5xl md:text-6xl font-black mb-8 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Professional Journey
            </h3>
            <div className="w-32 h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline Line with gradient */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-indigo-500 via-purple-500 to-pink-500 -translate-x-1/2 shadow-[0_0_40px_rgba(99,102,241,0.3)]" />

            <div className="space-y-16">
              {sortedExperiences?.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Enhanced Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-base-100 border-4 border-indigo-500 -translate-x-1/2 shadow-[0_0_30px_rgba(99,102,241,0.8)] z-20" />

                    <div className="hidden md:block md:w-1/2" />

                    {/* Premium Experience Card */}
                    <div
                      className={`w-full md:w-1/2 pt-6 md:pt-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}
                    >
                      <div className="group relative p-8 rounded-3xl bg-base-200/50 backdrop-blur-xl border border-base-content/10 hover:border-indigo-500/40 transition-all duration-500 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] hover:-translate-y-2 overflow-hidden">
                        {/* Multi-layer glow effects */}
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                          <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 text-sm font-bold tracking-widest uppercase mb-6 border border-indigo-500/30">
                            {getFormattedDate(exp.startDate)} —{" "}
                            {getFormattedDate(exp.endDate)}
                          </span>
                          <div className="text-lg font-semibold text-base-content/70 mb-1 text-indigo-200">
                            {exp.location.charAt(0).toUpperCase() + exp.location.slice(1)}
                          </div>
                          <h4 className="text-3xl font-bold mb-3 text-base-content group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                            {exp.role}
                          </h4>
                          <p className="text-base-content/70 font-semibold text-xl mb-4 text-indigo-400">
                            {exp.company} 
                          </p>
                          {exp.description && (
                            <p className="text-base-content/80 leading-relaxed text-lg">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h3 className="text-5xl md:text-6xl font-black mb-8 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h3>
            <p className="text-base-content/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Showcasing innovative solutions built with cutting-edge
              technologies and creative problem-solving.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative p-8 rounded-4xl bg-base-200/40 backdrop-blur-xl border border-base-content/10 hover:bg-base-200/70 hover:border-indigo-500/50 transition-all duration-700 overflow-hidden flex flex-col shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.3)]"
              >
                {/* Enhanced accent highlights */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Multi-layer background gradients */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-purple-500/3 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col grow">
                  <h4 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-500">
                    {project.title}
                  </h4>
                  <p className="text-base-content/80 mb-8 grow leading-relaxed text-base md:text-lg">
                    {project.description}
                  </p>

                  {/* Enhanced tech stack */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-4 py-2 text-sm bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-full border border-indigo-500/30 font-medium hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  )}

                  <div className="flex gap-4 mt-auto">
                    {project.github_link && (
                      <motion.a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-base-100/80 hover:bg-base-100 text-base-content font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                      >
                        <Code className="w-5 h-5" /> Source
                      </motion.a>
                    )}
                    {project.live_link && (
                      <motion.a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] font-semibold transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" /> Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-32 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-5xl md:text-6xl font-black mb-8 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </h3>
            <p className="text-base-content/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Ready to collaborate on innovative projects? Let's create
              something extraordinary together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              {user?.github_url && (
                <motion.a
                  href={`${user.github_url}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-8 rounded-3xl bg-base-200/50 backdrop-blur-xl border border-base-content/10 hover:border-indigo-500/50 hover:bg-base-200/80 transition-all duration-500 flex flex-col items-center gap-6 shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)] overflow-hidden"
                >
                  {/* Enhanced glow effects */}
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-indigo-500/30">
                      <Code className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    <span className="font-bold text-xl text-base-content/90 group-hover:text-base-content">
                      GitHub
                    </span>
                    <span className="text-sm text-base-content/60 text-center">
                      Explore my code repositories
                    </span>
                  </div>
                </motion.a>
              )}

              {user?.linkedIn_url && (
                <motion.a
                  href={`${user.linkedIn_url}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-8 rounded-3xl bg-base-200/50 backdrop-blur-xl border border-base-content/10 hover:border-indigo-500/50 hover:bg-base-200/80 transition-all duration-500 flex flex-col items-center gap-6 shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)] overflow-hidden"
                >
                  {/* Enhanced glow effects */}
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-indigo-500/30">
                      <User className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    <span className="font-bold text-xl text-base-content/90 group-hover:text-base-content">
                      LinkedIn
                    </span>
                    <span className="text-sm text-base-content/60 text-center">
                      Connect professionally
                    </span>
                  </div>
                </motion.a>
              )}

              <motion.a
                href={`mailto:${user?.email}`}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-8 rounded-3xl bg-base-200/50 backdrop-blur-xl border border-base-content/10 hover:border-indigo-500/50 hover:bg-base-200/80 transition-all duration-500 flex flex-col items-center gap-6 shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)] overflow-hidden"
              >
                {/* Enhanced glow effects */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-indigo-500/30">
                    <ExternalLink className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" />
                  </div>
                  <span className="font-bold text-xl text-base-content/90 group-hover:text-base-content">
                    Email
                  </span>
                  <span className="text-sm text-base-content/60 text-center">
                    Send me a message
                  </span>
                </div>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center text-base-content/60"
            >
              <p className="text-lg font-light">
                Always excited to discuss new opportunities and innovative
                ideas!
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center text-base-content/50 border-t border-base-content/10 mt-32 relative overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-base-200/20 to-transparent" />

          <div className="relative z-10">
            <div className="w-24 h-1 bg-linear-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 mx-auto rounded-full mb-8" />
            <p className="text-lg font-light mb-4">
              Crafted with passion and cutting-edge technology
            </p>
            <p className="text-sm font-medium text-base-content/70">
              © {new Date().getFullYear()} {user?.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioUI;
