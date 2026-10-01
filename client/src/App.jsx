import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Code2,
  ExternalLink,
  GitBranch,
  Layers,
  Network,
  Play,
  Sparkles,
  LogOut,
} from "lucide-react";

import AuthModal from "./components/AuthModal.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import "./App.css";

const resources = {
  "HTML & CSS": {
    title: "HTML & CSS Full Course",
    provider: "SuperSimpleDev",
    url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
  },

  JavaScript: {
    title: "JavaScript Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
  },

  Python: {
    title: "Python Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
  },

  DSA: {
    title: "Data Structures and Algorithms",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
  },

  DBMS: {
    title: "SQL / Database Management System",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
  },

  "Git & GitHub": {
    title: "Git and GitHub for Beginners",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
  },

  React: {
    title: "React Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
  },

  TypeScript: {
    title: "TypeScript Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=30LWjhZzg50",
  },

  "Node.js & Express": {
    title: "Node.js and Express Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  },

  "REST APIs": {
    title: "Node.js and Express Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  },

  Java: {
    title: "Java Programming Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=GoXwIVyNvX0",
  },

  "C++": {
    title: "C++ Programming Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
  },

  C: {
    title: "C Programming Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
  },

  "Android Development": {
    title: "Android Development Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=fis26HvvDII",
  },

  Statistics: {
    title: "Statistics for Data Science",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=xxpc-HPKN28",
  },

  Pandas: {
    title: "Pandas Full Course",
    provider: "Keith Galli",
    url: "https://www.youtube.com/watch?v=gtjxAH8uaP0",
  },

  "Machine Learning": {
    title: "Machine Learning Full Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
  },

  "Deep Learning": {
    title: "Deep Learning Course",
    provider: "freeCodeCamp",
    url: "https://www.youtube.com/watch?v=VyWAvY2CF9c",
  },
};

const languages = [
  {
    name: "Python",
    level: "POPULAR",
    category: "AI • DATA • AUTOMATION",
    icon: Brain,
    description:
      "A versatile language used across artificial intelligence, machine learning, data science, automation and backend development.",
    careers: ["Data Scientist", "AI / ML Engineer"],
  },
  {
    name: "JavaScript",
    level: "WEB",
    category: "FRONTEND • BACKEND",
    icon: Code2,
    description:
      "The core language of modern web development, powering browser interfaces as well as server-side applications with Node.js.",
    careers: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
    ],
  },
  {
    name: "Java",
    level: "ENTERPRISE",
    category: "ANDROID • SOFTWARE",
    icon: Code2,
    description:
      "A mature, widely-used language for Android applications, enterprise systems and large-scale software engineering.",
    careers: ["Android Developer", "Software Engineer"],
  },
  {
    name: "C++",
    level: "PERFORMANCE",
    category: "SYSTEMS • ALGORITHMS",
    icon: Code2,
    description:
      "A high-performance language commonly used for systems software, competitive programming, game engines and performance-critical applications.",
    careers: ["Software Engineer", "Competitive Programmer"],
  },
  {
    name: "C",
    level: "FOUNDATION",
    category: "SYSTEMS • LOW LEVEL",
    icon: Code2,
    description:
      "A foundational language for understanding memory, hardware interaction, operating systems and low-level programming.",
    careers: ["Systems Programmer", "Software Engineer"],
  },
  {
    name: "TypeScript",
    level: "MODERN",
    category: "WEB • SCALABLE APPS",
    icon: Layers,
    description:
      "A typed superset of JavaScript that improves large-scale web application development with stronger tooling and safer code.",
    careers: ["Frontend Developer", "Full Stack Developer"],
  },
];

const careers = {
  "Data Scientist": {
    tag: "DATA & ANALYTICS",
    description:
      "Data scientists turn raw data into useful insights using statistics, data analysis and machine learning. They work with datasets, discover patterns and build models that help organizations make better decisions.",
    roadmap: ["Python", "Statistics", "Pandas", "DBMS", "Machine Learning"],
  },

  "AI / ML Engineer": {
    tag: "ARTIFICIAL INTELLIGENCE",
    description:
      "AI and ML engineers build intelligent systems that learn from data. The career combines programming, statistics, data processing, machine learning and deep learning to create practical AI solutions.",
    roadmap: [
      "Python",
      "Statistics",
      "Pandas",
      "Machine Learning",
      "Deep Learning",
    ],
  },

  "Frontend Developer": {
    tag: "WEB INTERFACE",
    description:
      "Frontend developers create the interfaces people interact with on websites and web applications. They transform designs into responsive, interactive and user-friendly digital experiences.",
    roadmap: [
      "HTML & CSS",
      "JavaScript",
      "Git & GitHub",
      "React",
      "TypeScript",
    ],
  },

  "Backend Developer": {
    tag: "SERVER & APIs",
    description:
      "Backend developers build the server-side logic that powers applications. They work with APIs, databases, authentication, business logic and server technologies that connect the frontend to data.",
    roadmap: [
      "JavaScript",
      "Git & GitHub",
      "Node.js & Express",
      "REST APIs",
      "DBMS",
    ],
  },

  "Full Stack Developer": {
    tag: "END-TO-END DEVELOPMENT",
    description:
      "Full stack developers work across both frontend and backend systems. They understand how interfaces, APIs, servers and databases connect together into complete web applications.",
    roadmap: [
      "HTML & CSS",
      "JavaScript",
      "Git & GitHub",
      "React",
      "Node.js & Express",
      "DBMS",
    ],
  },

  "Android Developer": {
    tag: "MOBILE DEVELOPMENT",
    description:
      "Android developers create applications for Android devices. The role combines Java programming with Android development tools and an understanding of how mobile applications are structured and delivered.",
    roadmap: ["Java", "Git & GitHub", "Android Development"],
  },

  "Software Engineer": {
    tag: "SOFTWARE DEVELOPMENT",
    description:
      "Software engineers design, build, test and maintain software systems. Strong programming fundamentals, algorithms, databases and version control form the foundation of this career.",
    roadmap: ["Java", "DSA", "DBMS", "Git & GitHub"],
  },

  "Competitive Programmer": {
    tag: "ALGORITHMS & PROBLEM SOLVING",
    description:
      "Competitive programmers focus on solving algorithmic problems efficiently under time and memory constraints. Strong data structures, algorithms and C++ fundamentals are central to this path.",
    roadmap: ["C++", "DSA", "Git & GitHub"],
  },

  "Systems Programmer": {
    tag: "LOW-LEVEL SYSTEMS",
    description:
      "Systems programmers work close to the hardware and operating-system layer. They use low-level programming concepts to build efficient and reliable software components.",
    roadmap: ["C", "DSA", "Git & GitHub"],
  },
};

const getIconForLanguage = (language) => {
  const item = languages.find((entry) => entry.name === language);
  return item?.icon || Code2;
};

const getExplanation = (skill) => {
  const explanations = {
    "HTML & CSS":
      "Learn how web pages are structured and styled. This forms the visual foundation of frontend development.",
    JavaScript:
      "Build programming logic for interactive web applications and understand the core language behind modern web development.",
    Python:
      "Develop strong programming fundamentals with a language heavily used in data science and artificial intelligence.",
    DSA:
      "Learn how to organize data and design efficient algorithms for solving computational problems.",
    DBMS:
      "Understand how applications store, organize, query and manage structured data.",
    "Git & GitHub":
      "Learn version control and collaboration practices used in professional software development.",
    React:
      "Build modern component-based interfaces and understand how large frontend applications are structured.",
    TypeScript:
      "Add static typing and stronger development tooling to JavaScript applications.",
    "Node.js & Express":
      "Learn how JavaScript runs on the server and how Express can be used to build backend applications.",
    "REST APIs":
      "Understand how different parts of an application communicate through HTTP-based APIs.",
    Java:
      "Build a strong object-oriented programming foundation used across Android and enterprise software.",
    "C++":
      "Develop performance-oriented programming skills and strong foundations for algorithmic problem solving.",
    C: "Understand memory, pointers and low-level programming concepts that form the base of systems development.",
    "Android Development":
      "Learn how mobile applications are designed, developed and structured for Android devices.",
    Statistics:
      "Build the mathematical foundation needed to understand data, probability and machine learning results.",
    Pandas:
      "Learn to clean, transform and analyze structured datasets efficiently using Python.",
    "Machine Learning":
      "Learn how algorithms identify patterns in data and make predictions or decisions.",
    "Deep Learning":
      "Move into neural networks and advanced machine learning methods used in modern AI systems.",
  };

  return (
    explanations[skill] ||
    "Build this skill as the next step toward your selected career."
  );
};

function App() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();

  const [screen, setScreen] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [savingSelection, setSavingSelection] = useState(false);
  const [error, setError] = useState("");

  const currentCareer = selectedCareer
    ? careers[selectedCareer]
    : null;

  const roadmap = currentCareer?.roadmap || [];

  const startBuilder = () => {
    setError("");

    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }

    setScreen("languages");
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setError("");
    setScreen("languages");
  };

  const handleLanguageSelect = async (language) => {
    try {
      setSavingSelection(true);
      setError("");

      setSelectedLanguage(language);
      setSelectedCareer("");

      await updateProfile(language, "");

      setScreen("careers");
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to save your selected language."
      );
    } finally {
      setSavingSelection(false);
    }
  };

  const handleCareerSelect = async (career) => {
    try {
      setSavingSelection(true);
      setError("");

      setSelectedCareer(career);

      await updateProfile(selectedLanguage, career);

      setScreen("roadmap");
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to save your selected career."
      );
    } finally {
      setSavingSelection(false);
    }
  };

  const goHome = () => {
    setError("");
    setScreen("home");
  };

  const goBackToLanguages = () => {
    setError("");
    setScreen("languages");
  };

  const goBackToCareers = () => {
    setError("");
    setScreen("careers");
  };

  return (
    <div className="app-shell">
      <Navbar
        user={user}
        isAuthenticated={isAuthenticated}
        onHome={goHome}
        onBuild={startBuilder}
        onLogout={logout}
      />

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError("")}>×</button>
        </div>
      )}

      {savingSelection && (
        <div className="loading-bar">
          <div />
        </div>
      )}

      {screen === "home" && (
        <HomeScreen
          user={user}
          onBuild={startBuilder}
        />
      )}

      {screen === "languages" && (
        <LanguageScreen
          onBack={goHome}
          onChoose={handleLanguageSelect}
          disabled={savingSelection}
        />
      )}

      {screen === "careers" && (
        <CareerScreen
          language={selectedLanguage}
          onBack={goBackToLanguages}
          onChoose={handleCareerSelect}
          disabled={savingSelection}
        />
      )}

      {screen === "roadmap" && currentCareer && (
        <RoadmapScreen
          language={selectedLanguage}
          career={selectedCareer}
          roadmap={roadmap}
          user={user}
          onBack={goBackToCareers}
        />
      )}

      <Footer />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

function Navbar({
  user,
  isAuthenticated,
  onHome,
  onBuild,
  onLogout,
}) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="brand-button" onClick={onHome}>
          <div className="brand-mark">
            <Network size={19} />
          </div>

          <span>SkillGraph</span>
        </button>

        <div className="nav-center">
          <button onClick={onHome}>Home</button>

          <button onClick={onBuild}>
            Career Builder
          </button>
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="profile-chip">
                <span>
                  {user?.name?.slice(0, 1).toUpperCase()}
                </span>

                {user?.name}
              </div>

              <button
                className="ghost-button"
                onClick={onLogout}
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <button className="nav-cta" onClick={onBuild}>
              Build My Career
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function HomeScreen({ user, onBuild }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <Sparkles size={13} />
              Graph-Based Career Intelligence
            </div>

            <h1 className="hero-title">
              Turn Your Skills Into
              <span>Your Career Path.</span>
            </h1>

            <p className="hero-copy">
              Choose a programming language, discover the careers
              it can lead to, and get a structured learning roadmap
              with direct YouTube resources.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={onBuild}
              >
                Build My Career
                <ArrowRight size={17} />
              </button>

              {user && (
                <div className="secondary-button">
                  Welcome, {user.name}
                </div>
              )}
            </div>

            <div className="hero-stats">
              <div>
                <strong>6</strong>
                <span>Languages</span>
              </div>

              <div>
                <strong>9+</strong>
                <span>Career Paths</span>
              </div>

              <div>
                <strong>17+</strong>
                <span>Learning Resources</span>
              </div>
            </div>
          </div>

          <div className="hero-graph-card">
            <div className="hero-graph-top">
              <div>
                <span>SKILL PATH</span>
                <strong>
                  Python → AI / ML Engineer
                </strong>
              </div>

              <div className="live-dot">
                ● Live
              </div>
            </div>

            <div className="hero-graph">
              <NodePill
                label="Python"
                className="gp-1"
              />

              <NodePill
                label="Statistics"
                className="gp-2"
              />

              <NodePill
                label="Pandas"
                className="gp-3"
              />

              <NodePill
                label="Machine Learning"
                className="gp-4"
              />

              <NodePill
                label="Deep Learning"
                className="gp-5"
              />

              <div className="hero-graph-core">
                <Brain size={18} />
                AI / ML
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-width">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">
                SYSTEM FLOW
              </span>

              <h2>
                Choose. Explore. Learn.
              </h2>

              <p>
                SkillGraph gives you a simple route from
                a programming language to a career and then
                to the skills required to reach it.
              </p>
            </div>
          </div>

          <div className="flow-grid">
            <FlowCard
              number="01"
              icon={<Code2 size={22} />}
              title="Choose Language"
              text="Select the programming language you want to build your career around."
            />

            <FlowCard
              number="02"
              icon={<Network size={22} />}
              title="Explore Careers"
              text="Discover career paths that naturally connect to your selected language."
            />

            <FlowCard
              number="03"
              icon={<GitBranch size={22} />}
              title="Get Roadmap"
              text="Receive an ordered sequence of skills to learn for your chosen career."
            />

            <FlowCard
              number="04"
              icon={<Play size={22} />}
              title="Learn"
              text="Open a curated YouTube resource for every roadmap step."
            />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <Sparkles size={23} />

          <h2>
            Ready to build your path?
          </h2>

          <p>
            Start with one programming language and let
            SkillGraph take you forward.
          </p>

          <button
            className="primary-button"
            onClick={onBuild}
          >
            Start SkillGraph
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function LanguageScreen({
  onBack,
  onChoose,
  disabled,
}) {
  return (
    <main className="page-section">
      <div className="section-width">
        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>

        <div className="center-heading">
          <span className="section-kicker">
            STEP 01
          </span>

          <h1>
            Choose Your Programming Language
          </h1>

          <p>
            Select the language you want to learn.
            SkillGraph will show you the career paths
            connected to it.
          </p>
        </div>

        <div className="language-grid-new">
          {languages.map((language) => {
            const Icon = language.icon;

            return (
              <button
                key={language.name}
                className="language-card-new"
                onClick={() =>
                  onChoose(language.name)
                }
                disabled={disabled}
              >
                <div className="language-card-head">
                  <div className="icon-box">
                    <Icon size={23} />
                  </div>

                  <span>{language.level}</span>
                </div>

                <small>
                  {language.category}
                </small>

                <h3>{language.name}</h3>

                <p>
                  {language.description}
                </p>

                <div className="career-tags">
                  {language.careers.map((career) => (
                    <span key={career}>
                      {career}
                    </span>
                  ))}
                </div>

                <div className="card-link">
                  Explore Career Paths
                  <ArrowRight size={15} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function CareerScreen({
  language,
  onBack,
  onChoose,
  disabled,
}) {
  const LanguageIcon =
    getIconForLanguage(language);

  return (
    <main className="page-section">
      <div className="section-width medium-width">
        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Change Language
        </button>

        <div className="selected-language-card">
          <div className="icon-box">
            <LanguageIcon size={23} />
          </div>

          <div>
            <span>
              SELECTED LANGUAGE
            </span>

            <strong>{language}</strong>
          </div>
        </div>

        <div className="center-heading compact">
          <span className="section-kicker">
            STEP 02
          </span>

          <h1>
            Where Can {language} Take You?
          </h1>

          <p>
            Read the brief for each career and choose
            the direction that interests you.
          </p>
        </div>

        <div className="career-grid-new">
          {Object.entries(
            careers
          )
            .filter(([, career]) =>
              language === "Python"
                ? [
                    "Data Scientist",
                    "AI / ML Engineer",
                  ].includes(
                    Object.keys(careers).find(
                      (key) =>
                        careers[key] === career
                    )
                  )
                : true
            )
            .map(
              ([careerName, career]) => {
                const validForLanguage =
                  languages
                    .find(
                      (item) =>
                        item.name === language
                    )
                    ?.careers.includes(
                      careerName
                    );

                if (!validForLanguage) {
                  return null;
                }

                return (
                  <button
                    key={careerName}
                    className="career-card-new"
                    onClick={() =>
                      onChoose(careerName)
                    }
                    disabled={disabled}
                  >
                    <div className="career-card-head">
                      <div className="icon-box">
                        <Network size={22} />
                      </div>

                      <span>
                        {career.tag}
                      </span>
                    </div>

                    <h3>{careerName}</h3>

                    <p>
                      {career.description}
                    </p>

                    <div className="card-link">
                      Choose This Career
                      <ArrowRight size={15} />
                    </div>
                  </button>
                );
              }
            )}
        </div>
      </div>
    </main>
  );
}

function RoadmapScreen({
  language,
  career,
  roadmap,
}) {
  const completedSkills = useMemo(
    () => 0,
    []
  );

  const percent = roadmap.length
    ? Math.round(
        (completedSkills /
          roadmap.length) *
          100
      )
    : 0;

  return (
    <main className="page-section">
      <div className="section-width medium-width">
        <button
          className="back-button"
          onClick={() =>
            window.history.length > 1
              ? window.history.back()
              : undefined
          }
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div className="roadmap-heading">
          <div className="success-circle">
            <Check size={21} />
          </div>

          <span className="section-kicker">
            STEP 03 • ROADMAP
          </span>

          <h1>
            Your Path to <span>{career}</span>
          </h1>

          <p>
            Starting from{" "}
            <strong>{language}</strong>, this is
            the recommended learning order.
          </p>
        </div>

        <div className="summary-card">
          <div>
            <span>LANGUAGE</span>
            <strong>{language}</strong>
          </div>

          <div className="summary-divider" />

          <div>
            <span>CAREER</span>
            <strong>{career}</strong>
          </div>

          <div className="summary-divider" />

          <div>
            <span>PROGRESS</span>
            <strong>{percent}%</strong>
          </div>
        </div>

        <div className="roadmap-toolbar">
          <div>
            <span className="section-kicker">
              RECOMMENDED ORDER
            </span>

            <h2>
              Learn these skills in sequence
            </h2>
          </div>
        </div>

        <div className="roadmap-list-new">
          {roadmap.map((skill, index) => {
            const resource =
              resources[skill];

            return (
              <div
                className="roadmap-card"
                key={`${career}-${skill}`}
              >
                <div className="step-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </div>

                <div className="roadmap-body">
                  <div className="roadmap-top-line">
                    <div>
                      <span className="step-label">
                        {index === 0
                          ? "START HERE"
                          : `STEP ${String(
                              index + 1
                            ).padStart(2, "0")}`}
                      </span>

                      <h3>{skill}</h3>
                    </div>
                  </div>

                  <p className="roadmap-copy">
                    {getExplanation(skill)}
                  </p>

                  {resource && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-card"
                    >
                      <div className="youtube-icon">
                        <Play
                          size={13}
                          fill="currentColor"
                        />
                      </div>

                      <div>
                        <strong>
                          Learn {skill}
                        </strong>

                        <span>
                          {resource.title}
                        </span>

                        <small>
                          {resource.provider} •
                          YouTube Course
                        </small>
                      </div>

                      <ExternalLink
                        size={16}
                      />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function NodePill({ label, className }) {
  return (
    <div
      className={`hero-node ${className}`}
    >
      {label}
    </div>
  );
}

function FlowCard({
  number,
  icon,
  title,
  text,
}) {
  return (
    <div className="flow-card">
      <span className="flow-number">
        {number}
      </span>

      <div className="flow-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand-small">
          <div className="brand-mark">
            <Network size={16} />
          </div>

          SkillGraph
        </div>

        <span>
          Graph-based personalized career
          intelligence.
        </span>
      </div>
    </footer>
  );
}

export default App;
