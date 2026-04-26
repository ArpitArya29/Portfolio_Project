import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, Code, User } from "lucide-react";

const PortfolioUI = ({ portfolio }) => {
  console.log(portfolio);

  const { user, title, bio, skills, experiences, projects } = portfolio;

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
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            {/* Glowing ring behind the image */}
            <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse" />
            <img
              src={user?.image}
              alt={user?.name}
              className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-[3px] border-base-200 shadow-[0_0_40px_rgba(99,102,241,0.3)] relative z-10"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
          >
            {user?.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-3xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl text-base-content/70 text-lg md:text-xl leading-relaxed mb-12"
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-base-content/50"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 opacity-70" />
            </motion.div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left: Orbit UI */}
            <div className="relative w-full aspect-square max-w-125 mx-auto flex justify-center items-center">
              {/* Orbital Rings */}
              <div className="absolute inset-4 sm:inset-8 bg-linear-to-b from-indigo-500/5 to-transparent rounded-full border border-indigo-500/10" />
              <div className="absolute inset-16 sm:inset-24 bg-linear-to-b from-purple-500/5 to-transparent rounded-full border border-purple-500/10" />

              {/* Core Center Node */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-base-200 border border-base-content/10 shadow-[0_0_50px_-10px_rgba(99,102,241,0.4)] flex items-center justify-center z-20">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
              </div>

              {/* Orbiting Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute inset-0 z-10 group"
              >
                {/* Pause orbit on hover wrapper */}
                <div className="w-full h-full group-hover:[animation-play-state:paused]">
                  {skills?.map((skill, index) => {
                    const angle = (index / 5) * 360;
                    const radius = 50; // percentage distance
                    const top = `calc(50% - ${radius}% * ${Math.cos((angle * Math.PI) / 180)})`;
                    const left = `calc(50% + ${radius}% * ${Math.sin((angle * Math.PI) / 180)})`;

                    return (
                      <motion.div
                        key={index}
                        className="absolute w-max px-4 py-2 sm:px-5 sm:py-2.5 bg-base-100/90 backdrop-blur-xl rounded-full border border-base-content/10 shadow-lg flex items-center justify-center cursor-default hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] transition-all"
                        style={{
                          top,
                          left,
                          transform: "translate(-50%, -50%)",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Counter-rotate text so it remains upright */}
                        <motion.span
                          animate={{ rotate: -360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 40,
                            ease: "linear",
                          }}
                          className="text-xs sm:text-sm font-semibold text-base-content/80"
                        >
                          {skill.name}
                        </motion.span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right: Remaining Skills */}
            <div className="flex flex-col gap-10 lg:pl-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 text-center lg:text-left"
              >
                <h3 className="text-3xl sm:text-4xl font-bold">
                  Core Competencies
                </h3>
                <p className="text-base-content/60 leading-relaxed text-lg">
                  A curated suite of modern technologies and tools I leverage to
                  architect and deploy highly scalable applications.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                {skills?.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-base-200/50 backdrop-blur-md border border-base-content/5 hover:border-indigo-500/30 hover:bg-base-200 hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.15)] transition-all cursor-default"
                  >
                    <span className="text-base-content/90 font-medium text-sm sm:text-base tracking-wide">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="py-32 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-4xl font-bold mb-6">Experience</h3>
            <div className="w-20 h-1.5 bg-linear-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-indigo-500/50 via-purple-500/20 to-transparent -translate-x-1/2" />

            <div className="space-y-16">
              {experiences?.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Glowing Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-base-100 border-[3px] border-indigo-400 -translate-x-1/2 shadow-[0_0_20px_rgba(99,102,241,0.6)] z-10" />

                    <div className="hidden md:block md:w-1/2" />

                    {/* Experience Card */}
                    <div
                      className={`w-full md:w-1/2 pt-4 md:pt-0 ${isEven ? "md:pr-14 md:text-right" : "md:pl-14 text-left"}`}
                    >
                      <div className="p-8 rounded-3xl bg-base-200/40 backdrop-blur-xl border border-base-content/5 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
                        {/* Card Hover Glow */}
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">
                            {getFormattedDate(exp.startDate)} —{" "}
                            {getFormattedDate(exp.endDate)}
                          </span>
                          <h4 className="text-2xl font-bold mb-2 text-base-content">
                            {exp.role}
                          </h4>
                          <p className="text-base-content/60 font-medium text-lg">
                            {exp.company}
                          </p>
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
        <section className="py-32 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h3 className="text-4xl font-bold mb-6">Featured Work</h3>
            <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
              A curated selection of projects that showcase my passion for
              building high-performance, visually stunning software.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative p-10 rounded-4xl bg-base-200/30 backdrop-blur-md border border-base-content/5 hover:bg-base-200/60 hover:border-purple-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.15)]"
              >
                {/* Accent Highlight top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col grow">
                  <h4 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                  </h4>
                  <p className="text-base-content/70 mb-10 grow leading-relaxed text-base sm:text-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-auto">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-base-100 hover:bg-base-300 text-sm font-semibold transition-colors shadow-sm"
                      >
                        <Code className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-sm font-semibold transition-all hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-32 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-6">Get In Touch</h3>
            <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
              Let's connect! Reach out for collaborations, opportunities, or
              just to say hello.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-wrap justify-center gap-6">
              {/* Social Links - Add your actual links */}
              <motion.a
                href={`https://github.com/${user?.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-base-200/50 backdrop-blur-md border border-base-content/5 hover:border-indigo-500/30 hover:bg-base-200 hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.15)] transition-all group"
              >
                <Code className="w-6 h-6 text-indigo-400 group-hover:text-indigo-500" />
                <span className="font-semibold text-base-content/90">
                  GitHub
                </span>
              </motion.a>

              <motion.a
                href={`https://linkedin.com/in/${user?.linkedinUsername}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-base-200/50 backdrop-blur-md border border-base-content/5 hover:border-indigo-500/30 hover:bg-base-200 hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.15)] transition-all group"
              >
                <User className="w-6 h-6 text-indigo-400 group-hover:text-indigo-500" />
                <span className="font-semibold text-base-content/90">
                  LinkedIn
                </span>
              </motion.a>

              <motion.a
                href={`mailto:${user?.email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-base-200/50 backdrop-blur-md border border-base-content/5 hover:border-indigo-500/30 hover:bg-base-200 hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.15)] transition-all group"
              >
                <ExternalLink className="w-6 h-6 text-indigo-400 group-hover:text-indigo-500" />
                <span className="font-semibold text-base-content/90">
                  Email
                </span>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-base-content/50"
            >
              <p className="text-sm">Feel free to reach out anytime!</p>
            </motion.div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center text-base-content/40 text-sm border-t border-base-content/5 mt-20">
          <p>
            © {new Date().getFullYear()} {user?.name}. Designed with passion.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioUI;
