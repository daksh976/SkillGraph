// ======================================================
// SKILLGRAPH
// GRAPH DATA + GRAPH ALGORITHMS
// ======================================================


// ======================================================
// 1. SKILL DEPENDENCY GRAPH
// ======================================================
//
// Direction:
//
// Prerequisite  →  Skill
//
// Example:
//
// HTML & CSS → JavaScript
// JavaScript → React
// React → Frontend Development
// Frontend Development → Frontend Developer
//
// This means prerequisites always point toward
// the skill/career that depends on them.
// ======================================================

export const skillGraph = {
  // ---------------- FRONTEND ----------------

  "HTML & CSS": [
    "JavaScript",
  ],

  JavaScript: [
    "React",
    "Node.js",
    "TypeScript",
  ],

  "Git & GitHub": [
    "React",
    "Node.js",
  ],

  React: [
    "Frontend Development",
  ],

  TypeScript: [
    "Frontend Development",
  ],

  "Frontend Development": [
    "Frontend Developer",
    "Full Stack Developer",
  ],


  // ---------------- BACKEND ----------------

  "Node.js": [
    "Express.js",
  ],

  "Express.js": [
    "REST APIs",
  ],

  "REST APIs": [
    "Backend Development",
  ],

  DBMS: [
    "Backend Development",
  ],

  "Backend Development": [
    "Backend Developer",
    "Full Stack Developer",
  ],


  // ---------------- DATA / AI ----------------

  Python: [
    "Pandas",
    "Machine Learning",
  ],

  Pandas: [
    "Machine Learning",
  ],

  Statistics: [
    "Machine Learning",
  ],

  DSA: [
    "Machine Learning",
  ],

  "Machine Learning": [
    "Deep Learning",
  ],

  "Deep Learning": [
    "AI / ML Engineer",
  ],


  // ---------------- CAREER NODES ----------------

  "Frontend Developer": [],

  "Backend Developer": [],

  "Full Stack Developer": [],

  "AI / ML Engineer": [],
};


// ======================================================
// 2. GET ALL GRAPH NODES
// ======================================================
//
// Some nodes only appear inside an array.
// This function makes sure every node exists
// in the final graph.
// ======================================================

export function getAllNodes(graph) {
  const nodes = new Set();

  for (const [node, neighbors] of Object.entries(graph)) {
    nodes.add(node);

    for (const neighbor of neighbors) {
      nodes.add(neighbor);
    }
  }

  return [...nodes];
}


// ======================================================
// 3. BREADTH FIRST SEARCH - BFS
// ======================================================
//
// BFS explores the graph level by level.
// ======================================================

export function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (visited.has(currentNode)) {
      continue;
    }

    visited.add(currentNode);
    result.push(currentNode);

    const neighbors = graph[currentNode] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}


// ======================================================
// 4. DEPTH FIRST SEARCH - DFS
// ======================================================
//
// DFS explores one branch deeply before
// moving to another branch.
// ======================================================

export function dfs(graph, startNode) {
  const visited = new Set();
  const result = [];

  function visit(node) {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    result.push(node);

    const neighbors = graph[node] || [];

    for (const neighbor of neighbors) {
      visit(neighbor);
    }
  }

  visit(startNode);

  return result;
}


// ======================================================
// 5. TOPOLOGICAL SORT
// ======================================================
//
// Topological sorting produces an order where
// prerequisites come before dependent skills.
//
// Example:
//
// HTML & CSS
//      ↓
// JavaScript
//      ↓
// React
//      ↓
// Frontend Development
//      ↓
// Frontend Developer
// ======================================================

export function topologicalSort(graph) {
  const allNodes = getAllNodes(graph);

  const visited = new Set();
  const visiting = new Set();
  const result = [];

  function visit(node) {
    // Detect circular dependency.
    if (visiting.has(node)) {
      throw new Error(
        "Cycle detected in the SkillGraph."
      );
    }

    if (visited.has(node)) {
      return;
    }

    visiting.add(node);

    const neighbors = graph[node] || [];

    for (const neighbor of neighbors) {
      visit(neighbor);
    }

    visiting.delete(node);
    visited.add(node);

    result.unshift(node);
  }

  for (const node of allNodes) {
    visit(node);
  }

  return result;
}


// ======================================================
// 6. FIND ALL PREREQUISITES OF A TARGET
// ======================================================
//
// Because our graph points:
//
// prerequisite → dependent
//
// We have to travel backwards to discover
// everything required for the target.
//
// Example:
//
// Target:
// Frontend Developer
//
// Finds:
//
// Frontend Development
// React
// TypeScript
// JavaScript
// HTML & CSS
// Git & GitHub
// ======================================================

export function getPrerequisites(
  graph,
  targetSkill
) {
  const prerequisites = new Set();

  function findParents(target) {
    for (const [node, dependents] of Object.entries(graph)) {
      if (dependents.includes(target)) {
        if (!prerequisites.has(node)) {
          prerequisites.add(node);

          findParents(node);
        }
      }
    }
  }

  findParents(targetSkill);

  return [...prerequisites];
}


// ======================================================
// 7. FIND SKILL GAP
// ======================================================
//
// Compares:
//
// Current Skills
// VS
// Required Skills
//
// Returns only missing skills.
// ======================================================

export function findSkillGap(
  currentSkills,
  requiredSkills
) {
  return requiredSkills.filter(
    (skill) => !currentSkills.includes(skill)
  );
}


// ======================================================
// 8. GENERATE PERSONALIZED LEARNING PATH
// ======================================================
//
// This is the main SkillGraph function.
//
// Steps:
//
// 1. Find all prerequisites.
// 2. Add the target career.
// 3. Remove skills the user already knows.
// 4. Use Topological Sort.
// 5. Return a prerequisite-aware path.
// ======================================================

export function generateLearningPath(
  currentSkills,
  targetCareer
) {
  // --------------------------------------------
  // Find every prerequisite of the career.
  // --------------------------------------------

  const prerequisites = getPrerequisites(
    skillGraph,
    targetCareer
  );


  // --------------------------------------------
  // Include the target career itself.
  // --------------------------------------------

  const requiredSkills = [
    ...prerequisites,
    targetCareer,
  ];


  // --------------------------------------------
  // Remove duplicates.
  // --------------------------------------------

  const uniqueRequiredSkills = [
    ...new Set(requiredSkills),
  ];


  // --------------------------------------------
  // Get complete graph order.
  // --------------------------------------------

  const orderedSkills = topologicalSort(
    skillGraph
  );


  // --------------------------------------------
  // Keep only skills required for this career.
  // --------------------------------------------

  const careerPath = orderedSkills.filter(
    (skill) =>
      uniqueRequiredSkills.includes(skill)
  );


  // --------------------------------------------
  // Remove skills the student already knows.
  // --------------------------------------------

  const missingSkills = careerPath.filter(
    (skill) =>
      !currentSkills.includes(skill)
  );


  return missingSkills;
}


// ======================================================
// 9. COMPLETE SKILL GAP ANALYSIS
// ======================================================
//
// Returns all important information in one object.
// ======================================================

export function analyzeSkillGap(
  currentSkills,
  targetCareer
) {
  const requiredSkills = [
    ...getPrerequisites(
      skillGraph,
      targetCareer
    ),
    targetCareer,
  ];


  const uniqueRequiredSkills = [
    ...new Set(requiredSkills),
  ];


  const missingSkills = findSkillGap(
    currentSkills,
    uniqueRequiredSkills
  );


  const learningPath = generateLearningPath(
    currentSkills,
    targetCareer
  );


  const bfsResult = bfs(
    skillGraph,
    targetCareer
  );


  const dfsResult = dfs(
    skillGraph,
    targetCareer
  );


  return {
    currentSkills,

    targetCareer,

    requiredSkills:
      uniqueRequiredSkills,

    missingSkills,

    learningPath,

    bfsResult,

    dfsResult,
  };
}


// ======================================================
// 10. TEST DATA
// ======================================================

export const testCurrentSkills = [
  "HTML & CSS",
  "JavaScript",
  "Git & GitHub",
];

export const testTargetCareer =
  "Frontend Developer";