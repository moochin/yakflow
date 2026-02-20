const STORAGE_KEY = "accelerate-capability-survey-v1";

const SCALE_OPTIONS = [
  {
    value: 1,
    label: "Not in place",
    hint: "No consistent practice today",
  },
  {
    value: 2,
    label: "Partially adopted",
    hint: "Inconsistent or limited to a few areas",
  },
  {
    value: 3,
    label: "In progress",
    hint: "Adoption is growing, but not yet consistent",
  },
  {
    value: 4,
    label: "Mostly adopted",
    hint: "Common, with minor gaps",
  },
  {
    value: 5,
    label: "Fully adopted",
    hint: "Consistent, reliable, and repeatable",
  },
];

const capabilities = [
  {
    id: "cd-version-control",
    category: "Continuous Delivery",
    name: "Version control for all production artifacts",
    description:
      "Production code, configuration, and infrastructure definitions are stored, reviewed, and versioned together.",
    question:
      "How fully does the team keep all production artifacts in version control?",
    recommendations: [
      "Inventory production artifacts and assign owners.",
      "Move infrastructure and configuration into version control with reviews.",
      "Require pull requests for every production change.",
    ],
  },
  {
    id: "cd-deployment-automation",
    category: "Continuous Delivery",
    name: "Deployment automation",
    description:
      "Deployments are automated, repeatable, and consistent across environments.",
    question:
      "How automated are deployments across your environments?",
    recommendations: [
      "Map the manual deployment steps and automate them in a pipeline.",
      "Standardize environment provisioning with scripts or templates.",
      "Add automated rollback or safe deployment strategies.",
    ],
  },
  {
    id: "cd-continuous-integration",
    category: "Continuous Delivery",
    name: "Continuous integration",
    description:
      "Developers integrate frequently to a shared mainline with automated builds and tests.",
    question: "How consistently does the team practice continuous integration?",
    recommendations: [
      "Integrate code to main at least daily with automated builds.",
      "Keep the main branch green and treat failures as top priority.",
      "Make build results visible to the whole team.",
    ],
  },
  {
    id: "cd-trunk-based",
    category: "Continuous Delivery",
    name: "Trunk-based development",
    description:
      "Short-lived branches with frequent merges into mainline reduce merge friction.",
    question: "How close is the team to trunk-based development?",
    recommendations: [
      "Limit branch lifespan to a day or less where possible.",
      "Use feature flags to merge incomplete work safely.",
      "Review and merge small pull requests quickly.",
    ],
  },
  {
    id: "cd-test-automation",
    category: "Continuous Delivery",
    name: "Test automation",
    description:
      "Automated tests provide fast, reliable feedback across unit, integration, and regression levels.",
    question: "How effective and automated is the team test suite?",
    recommendations: [
      "Prioritize tests that run in CI on every change.",
      "Stabilize flaky tests and remove slow or unreliable ones.",
      "Add coverage for critical paths and regressions.",
    ],
  },
  {
    id: "cd-test-data",
    category: "Continuous Delivery",
    name: "Test data management",
    description:
      "Teams can create, reset, and manage realistic test data quickly and safely.",
    question: "How well does the team manage and provision test data?",
    recommendations: [
      "Create repeatable seed data and reset scripts.",
      "Use synthetic or anonymized data for testing.",
      "Automate data provisioning in CI environments.",
    ],
  },
  {
    id: "cd-security",
    category: "Continuous Delivery",
    name: "Shift left on security",
    description:
      "Security is integrated early in the delivery lifecycle, not just at the end.",
    question: "How early does the team integrate security into delivery?",
    recommendations: [
      "Add automated security checks to the CI pipeline.",
      "Include threat modeling or security reviews in planning.",
      "Designate a security champion for the team.",
    ],
  },
  {
    id: "cd-continuous-delivery",
    category: "Continuous Delivery",
    name: "Continuous delivery (CD)",
    description:
      "The system stays in a deployable state and releases can happen on demand.",
    question: "How close is the team to being able to deploy on demand?",
    recommendations: [
      "Ensure mainline is always releasable with automated quality gates.",
      "Decouple deployments from releases using feature flags.",
      "Make release steps part of the standard pipeline.",
    ],
  },
  {
    id: "arch-loosely-coupled",
    category: "Architecture",
    name: "Loosely coupled architecture",
    description:
      "Services or components can be changed and deployed independently.",
    question: "How independently can the team deploy components?",
    recommendations: [
      "Reduce shared databases or tightly coupled dependencies.",
      "Define stable service interfaces and contracts.",
      "Modularize codebases to isolate changes.",
    ],
  },
  {
    id: "arch-empowered-teams",
    category: "Architecture",
    name: "Empowered teams",
    description:
      "Teams have authority to make decisions and own systems end-to-end.",
    question: "How empowered is the team to own design and delivery?",
    recommendations: [
      "Clarify ownership for services and reduce external dependencies.",
      "Give teams authority to approve and ship their changes.",
      "Align goals so teams can prioritize locally.",
    ],
  },
  {
    id: "pp-customer-feedback",
    category: "Product and Process",
    name: "Customer feedback",
    description:
      "Teams gather feedback regularly to guide prioritization and design decisions.",
    question: "How regularly does the team collect and act on feedback?",
    recommendations: [
      "Instrument key user flows to capture feedback and usage data.",
      "Schedule customer interviews or feedback reviews each sprint.",
      "Tie feedback directly to backlog priorities.",
    ],
  },
  {
    id: "pp-value-stream",
    category: "Product and Process",
    name: "Value stream visibility",
    description:
      "The team understands the path from idea to production and can see bottlenecks.",
    question: "How visible is the end-to-end delivery flow?",
    recommendations: [
      "Map the value stream and identify the longest delays.",
      "Measure lead time from commit to production.",
      "Focus improvement on the largest bottleneck.",
    ],
  },
  {
    id: "pp-small-batches",
    category: "Product and Process",
    name: "Working in small batches",
    description:
      "Work is sliced into small, releasable increments.",
    question: "How small are the typical changes delivered?",
    recommendations: [
      "Break initiatives into increments that ship within days.",
      "Use feature flags to release in thin slices.",
      "Track batch size and reduce it over time.",
    ],
  },
  {
    id: "pp-experimentation",
    category: "Product and Process",
    name: "Team experimentation",
    description:
      "Teams test hypotheses with experiments and measure outcomes.",
    question: "How often does the team run experiments?",
    recommendations: [
      "Define clear hypotheses and success metrics for changes.",
      "Use A/B tests or staged rollouts where possible.",
      "Share experiment results across the team.",
    ],
  },
  {
    id: "lm-change-approval",
    category: "Lean Management and Monitoring",
    name: "Lightweight change approval processes",
    description:
      "Approvals are fast and risk-based, with automation replacing manual gates.",
    question: "How lightweight are change approvals today?",
    recommendations: [
      "Replace manual approvals with automated tests and peer review.",
      "Define risk tiers and limit approvals to high-risk changes.",
      "Track approval wait time and reduce it each quarter.",
    ],
  },
  {
    id: "lm-monitoring",
    category: "Lean Management and Monitoring",
    name: "Monitoring",
    description:
      "Teams collect metrics, logs, and traces to observe system behavior.",
    question: "How comprehensive is system monitoring?",
    recommendations: [
      "Define service-level indicators and dashboards for key flows.",
      "Standardize logs, metrics, and traces across services.",
      "Review monitoring coverage during each release.",
    ],
  },
  {
    id: "lm-proactive-notification",
    category: "Lean Management and Monitoring",
    name: "Proactive notification",
    description:
      "Teams get timely, actionable alerts when systems deviate from expected behavior.",
    question: "How reliable are alerts and on-call notifications?",
    recommendations: [
      "Create alerting based on SLOs and user impact.",
      "Reduce noisy alerts and document runbooks for the rest.",
      "Test notification paths with regular drills.",
    ],
  },
  {
    id: "lm-wip-limits",
    category: "Lean Management and Monitoring",
    name: "WIP limits",
    description:
      "Work-in-progress is capped to improve flow and focus.",
    question: "How consistently does the team enforce WIP limits?",
    recommendations: [
      "Set explicit WIP limits for each workflow stage.",
      "Pause new work when limits are exceeded.",
      "Review WIP data in retros to adjust limits.",
    ],
  },
  {
    id: "lm-visualizing-work",
    category: "Lean Management and Monitoring",
    name: "Visualizing work",
    description:
      "Work is visible across the team, including blocked or aging items.",
    question: "How visible is the team's work and flow?",
    recommendations: [
      "Maintain a shared board with clear workflow stages.",
      "Highlight blocked or aging work daily.",
      "Review flow metrics in weekly planning.",
    ],
  },
  {
    id: "cult-westrum",
    category: "Cultural",
    name: "Westrum organizational culture",
    description:
      "Information flows freely and the team prioritizes learning over blame.",
    question: "How generative and open is the team's culture?",
    recommendations: [
      "Run blameless retrospectives after incidents.",
      "Encourage sharing of failures and learnings.",
      "Reward collaboration and transparency.",
    ],
  },
  {
    id: "cult-learning",
    category: "Cultural",
    name: "Supporting learning",
    description:
      "Teams have time, budget, and support to build new skills.",
    question: "How supported is learning and skill development?",
    recommendations: [
      "Allocate recurring time for learning or experimentation.",
      "Fund training or certifications tied to team needs.",
      "Share learning outcomes in team forums.",
    ],
  },
  {
    id: "cult-collaboration",
    category: "Cultural",
    name: "Collaboration among teams",
    description:
      "Teams coordinate effectively and resolve dependencies quickly.",
    question: "How well does the team collaborate across boundaries?",
    recommendations: [
      "Hold cross-team planning sessions for shared initiatives.",
      "Use shared goals and metrics to align priorities.",
      "Document interfaces and ownership to reduce friction.",
    ],
  },
  {
    id: "cult-job-satisfaction",
    category: "Cultural",
    name: "Job satisfaction",
    description:
      "Team members feel engaged, supported, and able to sustain pace.",
    question: "How satisfied and sustainable is the team's work experience?",
    recommendations: [
      "Identify and remove top sources of toil and burnout.",
      "Balance roadmap commitments with capacity.",
      "Check in regularly on workload and morale.",
    ],
  },
  {
    id: "cult-transformational-leadership",
    category: "Cultural",
    name: "Transformational leadership",
    description:
      "Leaders create vision, enable autonomy, and remove obstacles.",
    question: "How effectively do leaders enable and inspire the team?",
    recommendations: [
      "Align leaders on a clear improvement vision.",
      "Remove systemic blockers that slow delivery.",
      "Model the behaviors expected from the team.",
    ],
  },
];

const ENGINEER_PROMPTS_BY_ID = {
  "cd-version-control": {
    description:
      "Code, infra, config, and schema changes should all move through the same Git workflow.",
    question:
      "If production broke right now, can you trace and roll back every relevant change from Git?",
    checks: [
      "Infra and environment config are in version control (no console-only drift).",
      "Database schema changes are versioned and shipped with app code.",
      "Production changes go through pull request review, not direct edits.",
    ],
  },
  "cd-deployment-automation": {
    description:
      "Deploys should be push-button or fully automated, not a manual runbook.",
    question:
      "Can your team deploy safely without manual copy-paste or console clicking?",
    checks: [
      "A pipeline handles deploy steps end-to-end.",
      "The same deploy mechanism is used across environments.",
      "Rollback, canary, or blue/green behavior is automated.",
    ],
  },
  "cd-continuous-integration": {
    description:
      "Every change should be validated early so integration pain stays low.",
    question:
      "Does every change to main get fast automated feedback, and does the team fix breakages immediately?",
    checks: [
      "Each commit/merge triggers automated build and tests.",
      "A failed main build is treated as stop-the-line.",
      "Developers merge to main frequently (at least daily).",
    ],
  },
  "cd-trunk-based": {
    description:
      "Small, short-lived branches reduce merge conflicts and release risk.",
    question:
      "Are you mostly shipping from trunk with short-lived branches and frequent merges?",
    checks: [
      "Feature branches are short-lived (hours or a day, not weeks).",
      "Feature flags are used to merge incomplete work safely.",
      "Long-lived release branches are rare or avoided.",
    ],
  },
  "cd-test-automation": {
    description:
      "Test automation should be trusted enough to protect flow without heavy manual gates.",
    question:
      "Can engineers trust automated tests to catch regressions before production?",
    checks: [
      "Unit/integration tests run on every pull request.",
      "Smoke/regression tests run automatically after deploy.",
      "Flaky tests are actively tracked and fixed.",
    ],
  },
  "cd-test-data": {
    description:
      "Teams need reliable, realistic test data without waiting on manual setup.",
    question:
      "Can engineers spin up realistic test data quickly without risky manual steps?",
    checks: [
      "Seed/reset scripts create known test states.",
      "Test data is synthetic or safely anonymized.",
      "CI/test environments provision data automatically.",
    ],
  },
  "cd-security": {
    description:
      "Security findings should appear in the developer loop, not weeks later.",
    question:
      "Do engineers get security feedback fast enough to fix issues during normal delivery?",
    checks: [
      "Dependency/SAST/container scans run in CI.",
      "Developers can view and triage vulnerabilities directly.",
      "Security checks are part of definition-of-done for changes.",
    ],
  },
  "cd-continuous-delivery": {
    description:
      "The system should stay releasable so deploy timing is a product choice, not a technical constraint.",
    question:
      "Could your team deploy to production today without special prep work?",
    checks: [
      "Main branch is usually in a releasable state.",
      "Release steps are scripted, repeatable, and low-touch.",
      "Feature flags decouple deploy from customer-visible release.",
    ],
  },
  "arch-loosely-coupled": {
    description:
      "Loose coupling enables independent change and faster flow.",
    question:
      "Can your service change and deploy without coordinating with multiple other teams?",
    checks: [
      "Services/components can be deployed independently.",
      "Cross-service contracts are explicit and versioned.",
      "Shared databases/tight runtime coupling are minimized.",
    ],
  },
  "arch-empowered-teams": {
    description:
      "Fast teams can make local decisions and own outcomes end-to-end.",
    question:
      "Can the team make most delivery decisions without waiting for centralized approval?",
    checks: [
      "Team owns build, run, and support for its service.",
      "Tooling/library choices are mostly team-driven.",
      "Ownership boundaries are clear and actionable.",
    ],
  },
  "pp-customer-feedback": {
    description:
      "Feedback loops keep engineering effort tied to user outcomes.",
    question:
      "Do engineers get regular customer/usage feedback that changes what gets built next?",
    checks: [
      "Key user flows are instrumented and reviewed.",
      "Feedback sessions or interviews happen on a regular cadence.",
      "Backlog priorities visibly reference customer evidence.",
    ],
  },
  "pp-value-stream": {
    description:
      "You cannot improve flow you cannot see.",
    question:
      "Can the team see where work waits between idea, code, and production?",
    checks: [
      "Lead time is measured from commit to production.",
      "Wait states/handoffs are visible in workflow data.",
      "Top bottlenecks are reviewed and addressed regularly.",
    ],
  },
  "pp-small-batches": {
    description:
      "Small batches reduce risk and speed up learning.",
    question:
      "Are most changes small enough to build, review, and release quickly?",
    checks: [
      "Work is sliced into increments deliverable in days.",
      "Pull requests are generally small and fast to review.",
      "Releases happen as thin vertical slices, not big-bang drops.",
    ],
  },
  "pp-experimentation": {
    description:
      "Hypothesis-driven changes prevent long cycles of unvalidated work.",
    question:
      "Does the team run lightweight experiments to validate assumptions before scaling changes?",
    checks: [
      "Changes include a hypothesis and success metric.",
      "A/B tests, canaries, or staged rollouts are used where relevant.",
      "Experiment results are shared and influence decisions.",
    ],
  },
  "lm-change-approval": {
    description:
      "Approval friction should match risk, not habit.",
    question:
      "Can low-risk changes ship with lightweight peer review instead of heavy approval queues?",
    checks: [
      "Most changes need only PR review plus automated checks.",
      "High-risk changes follow a defined, fast path.",
      "Emergency fixes can ship quickly with auditability.",
    ],
  },
  "lm-monitoring": {
    description:
      "Observability should help engineers detect and diagnose issues fast.",
    question:
      "Can engineers quickly detect and debug production issues using shared telemetry?",
    checks: [
      "Core flows have dashboards with useful SLIs.",
      "Logs, metrics, and traces are available for key services.",
      "Teams can access observability data without ticket handoffs.",
    ],
  },
  "lm-proactive-notification": {
    description:
      "Good alerting catches user-impacting failures before customers do.",
    question:
      "Do alerts tell the right people about real issues early, with low noise?",
    checks: [
      "Alerts are tied to user impact/SLO breaches.",
      "False-positive and low-value alerts are routinely reduced.",
      "Runbooks or first-response guidance exists for high-value alerts.",
    ],
  },
  "lm-wip-limits": {
    description:
      "WIP limits protect flow by reducing context switching and stalled work.",
    question:
      "Does the team enforce WIP limits to keep work moving instead of multitasking everything?",
    checks: [
      "Workflow stages have explicit WIP limits.",
      "Starting new work pauses when limits are exceeded.",
      "WIP/flow metrics are reviewed and adjusted regularly.",
    ],
  },
  "lm-visualizing-work": {
    description:
      "Visible work helps teams spot blocked items and aging work quickly.",
    question:
      "Can anyone on the team see exactly what is in progress, blocked, and aging right now?",
    checks: [
      "All feature/bug/tech-debt work is on a shared board.",
      "Blocked and aging items are clearly highlighted.",
      "Flow status is discussed routinely in team ceremonies.",
    ],
  },
  "cult-westrum": {
    description:
      "Generative culture improves learning speed and incident response quality.",
    question:
      "When failures happen, does the team focus on system fixes instead of blame?",
    checks: [
      "Post-incident reviews are blameless and action-oriented.",
      "People can raise risks and unknowns safely.",
      "Learned fixes are documented and adopted.",
    ],
  },
  "cult-learning": {
    description:
      "Learning capacity supports sustained improvement in delivery performance.",
    question:
      "Does the team have real time and support to improve skills and tooling?",
    checks: [
      "Recurring time is allocated for learning or experiments.",
      "Training/coaching support exists for priority skill gaps.",
      "Learning outcomes are shared and reused by the team.",
    ],
  },
  "cult-collaboration": {
    description:
      "Cross-team collaboration reduces dependency delays.",
    question:
      "When another team is involved, do dependencies usually resolve quickly and clearly?",
    checks: [
      "Cross-team goals and ownership are explicit.",
      "Interfaces/contracts between teams are documented.",
      "Joint planning resolves dependency risks early.",
    ],
  },
  "cult-job-satisfaction": {
    description:
      "Sustainable pace and engagement are prerequisites for long-term flow.",
    question:
      "Is team workload sustainable enough to maintain quality and delivery speed over time?",
    checks: [
      "Toil and repetitive manual work are actively reduced.",
      "On-call burden and interruption load are manageable.",
      "Morale/workload feedback is regularly reviewed and acted on.",
    ],
  },
  "cult-transformational-leadership": {
    description:
      "Leadership should remove blockers and enable teams to execute quickly.",
    question:
      "Do leaders consistently remove systemic blockers that slow engineering flow?",
    checks: [
      "Leaders communicate a clear technical improvement direction.",
      "Escalated blockers are resolved quickly.",
      "Teams are trusted to execute with autonomy and accountability.",
    ],
  },
};

capabilities.forEach((capability) => {
  const promptPack = ENGINEER_PROMPTS_BY_ID[capability.id];
  if (!promptPack) return;
  capability.description = promptPack.description || capability.description;
  capability.question = promptPack.question || capability.question;
  capability.checks = promptPack.checks || [];
});

const EXAMPLES_BY_ID = {
  "cd-version-control": [
    "Infrastructure-as-code lives in the same repo with code review.",
    "Configuration changes go through pull requests and approvals.",
    "Database migrations are versioned alongside application code.",
  ],
  "cd-deployment-automation": [
    "One pipeline deploys consistently to dev, stage, and prod.",
    "Deployments are repeatable without manual runbooks.",
    "Rollback or safe deployment strategies are automated.",
  ],
  "cd-continuous-integration": [
    "Every merge triggers an automated build and tests.",
    "Mainline stays green and failures are fixed immediately.",
    "Developers integrate to main at least daily.",
  ],
  "cd-trunk-based": [
    "Branches live for hours or a day, not weeks.",
    "Feature flags allow incomplete work to merge safely.",
    "There are no long-lived release branches.",
  ],
  "cd-test-automation": [
    "Unit and integration tests run on every PR.",
    "Regression tests are part of the CI pipeline.",
    "Flaky tests are tracked and fixed quickly.",
  ],
  "cd-test-data": [
    "Seed scripts reset environments on demand.",
    "Test data is anonymized or synthetic and realistic.",
    "CI can provision fresh test data automatically.",
  ],
  "cd-security": [
    "Static analysis and dependency scans run in CI.",
    "Security reviews happen during design or planning.",
    "Teams have a security champion or clear ownership.",
  ],
  "cd-continuous-delivery": [
    "Mainline is always deployable without manual steps.",
    "Releases are decoupled from deploys via feature flags.",
    "Deployments can happen on demand at any time.",
  ],
  "arch-loosely-coupled": [
    "Services deploy independently without coordinating releases.",
    "Shared databases are avoided or well-isolated.",
    "APIs have clear contracts and versioning.",
  ],
  "arch-empowered-teams": [
    "Teams own their services end-to-end, including on-call.",
    "Most delivery decisions do not require external approval.",
    "Ownership boundaries and responsibilities are explicit.",
  ],
  "pp-customer-feedback": [
    "Usage analytics are reviewed regularly by the team.",
    "Customer interviews or feedback sessions happen each sprint.",
    "Feedback is directly linked to backlog priorities.",
  ],
  "pp-value-stream": [
    "Lead time from idea to production is tracked.",
    "Bottlenecks are visible with flow metrics.",
    "The value stream map is kept current.",
  ],
  "pp-small-batches": [
    "Features are delivered in 1-3 day slices.",
    "Pull requests are small and frequent.",
    "Releases happen in thin vertical increments.",
  ],
  "pp-experimentation": [
    "Hypotheses are documented before changes ship.",
    "A/B tests or canary experiments are used when possible.",
    "Experiment outcomes are reviewed and shared.",
  ],
  "lm-change-approval": [
    "Automated tests replace most manual approval steps.",
    "High-risk changes get explicit approvals, others do not.",
    "CAB-style meetings are rare for routine changes.",
  ],
  "lm-monitoring": [
    "Dashboards track key SLIs for each service.",
    "Logs, metrics, and traces are standardized.",
    "Monitoring coverage is reviewed every release.",
  ],
  "lm-proactive-notification": [
    "Alerts are tied to SLOs and user impact.",
    "On-call runbooks exist for common alerts.",
    "Alert noise is reduced through regular tuning.",
  ],
  "lm-wip-limits": [
    "Explicit WIP limits exist for each workflow stage.",
    "New work pauses when WIP limits are hit.",
    "WIP metrics are reviewed in retrospectives.",
  ],
  "lm-visualizing-work": [
    "A shared board shows all work in progress.",
    "Blocked or aging items are clearly flagged.",
    "Flow metrics are reviewed weekly with the team.",
  ],
  "cult-westrum": [
    "Blameless incident reviews are the default.",
    "Information is shared across teams quickly.",
    "People can raise concerns without fear.",
  ],
  "cult-learning": [
    "Dedicated time exists for learning and experimentation.",
    "Training budget is available and used.",
    "Learnings are shared in team sessions.",
  ],
  "cult-collaboration": [
    "Cross-team planning happens regularly.",
    "Shared goals or OKRs align priorities.",
    "Interfaces and ownership are documented.",
  ],
  "cult-job-satisfaction": [
    "Regular pulse surveys track engagement.",
    "Top sources of toil are actively reduced.",
    "On-call and workload are sustainable.",
  ],
  "cult-transformational-leadership": [
    "Leaders communicate a clear improvement vision.",
    "Systemic blockers are removed proactively.",
    "Teams are empowered to make local decisions.",
  ],
};

const surveyView = document.getElementById("surveyView");
const resultsView = document.getElementById("resultsView");
const categoryList = document.getElementById("categoryList");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const viewResultsBtn = document.getElementById("viewResultsBtn");
const resetBtn = document.getElementById("resetBtn");

let state = loadState();
let mode = "survey";

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { currentIndex: 0, responses: {} };
    }
    const parsed = JSON.parse(stored);
    const migratedResponses = Object.fromEntries(
      Object.entries(parsed.responses || {}).map(([id, response]) => {
        if (!response || response.score === null || response.score === undefined) {
          return [id, response];
        }
        const score = Number(response.score);
        if (score >= 1 && score <= 5) {
          return [id, response];
        }
        if (score >= 0 && score <= 3) {
          const migrated = Math.round((score / 3) * 4 + 1);
          return [id, { ...response, score: migrated }];
        }
        return [id, response];
      })
    );
    return {
      currentIndex: parsed.currentIndex || 0,
      responses: migratedResponses,
    };
  } catch (error) {
    return { currentIndex: 0, responses: {} };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Ignore storage errors (private browsing, etc.)
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isAnswered(capability) {
  const response = state.responses[capability.id];
  return response && response.score !== null && response.score !== undefined;
}

function answeredCount() {
  return capabilities.filter(isAnswered).length;
}

function scoreLabel(score) {
  const option = SCALE_OPTIONS.find((item) => item.value === score);
  return option ? option.label : "Not answered";
}

function scoreColor(score) {
  if (score === 5) return "#2f6f64";
  if (score === 4) return "#5b8b52";
  if (score === 3) return "#c4a03a";
  if (score === 2) return "#d46a1f";
  if (score === 1) return "#a84a2e";
  return "#5f5a52";
}

function getCheckState(capability, response) {
  const checks = capability.checks || [];
  if (!Array.isArray(response?.checks)) {
    return checks.map(() => false);
  }
  return checks.map((_, index) => Boolean(response.checks[index]));
}

function checklistCalibration(checkedCount, totalChecks) {
  if (totalChecks === 0) {
    return "No checklist signals configured for this capability.";
  }
  if (checkedCount === 0) {
    return "Calibration: 0 checks usually maps to score 1.";
  }
  if (checkedCount === totalChecks) {
    return `Calibration: ${checkedCount}/${totalChecks} checks usually maps to 4-5 if consistent across teams.`;
  }
  return `Calibration: ${checkedCount}/${totalChecks} checks usually maps to ${Math.max(
    2,
    checkedCount
  )}-${Math.min(4, checkedCount + 2)}.`;
}

function groupByCategory() {
  return capabilities.reduce((acc, cap) => {
    acc[cap.category] = acc[cap.category] || [];
    acc[cap.category].push(cap);
    return acc;
  }, {});
}

function updateProgress() {
  const count = answeredCount();
  progressText.textContent = `${count} of ${capabilities.length}`;
  const percent = Math.round((count / capabilities.length) * 100);
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function renderSidebar() {
  const grouped = groupByCategory();
  categoryList.innerHTML = Object.keys(grouped)
    .map((category) => {
      const items = grouped[category]
        .map((cap) => {
          const response = state.responses[cap.id];
          const statusClass = isAnswered(cap) ? "done" : "pending";
          const isActive = capabilities[state.currentIndex].id === cap.id;
          return `
            <button class="${isActive ? "active" : ""}" data-cap-id="${cap.id}">
              <span class="dot ${isActive ? "current" : statusClass}"></span>
              <span>${cap.name}</span>
            </button>
          `;
        })
        .join("");

      return `
        <div class="category">
          <h3>${category}</h3>
          <div class="category-items">${items}</div>
        </div>
      `;
    })
    .join("");

  categoryList.querySelectorAll("button[data-cap-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-cap-id");
      const index = capabilities.findIndex((cap) => cap.id === id);
      if (index >= 0) {
        state.currentIndex = index;
        mode = "survey";
        saveState();
        render();
      }
    });
  });
}

function renderSurvey() {
  const cap = capabilities[state.currentIndex];
  const response = state.responses[cap.id] || { score: null, note: "" };
  const score = response.score;
  const examples = EXAMPLES_BY_ID[cap.id] || [];
  const checks = cap.checks || [];
  const checkState = getCheckState(cap, response);
  const checkedCount = checkState.filter(Boolean).length;

  surveyView.innerHTML = `
    <div class="card-header">
      <span>${cap.category}</span>
      <span>Capability ${state.currentIndex + 1} of ${capabilities.length}</span>
    </div>
    <h2>${cap.name}</h2>
    <p>${cap.description}</p>
    ${
      examples.length > 0
        ? `
      <div class="examples">
        <h3>Examples in place</h3>
        <ul>
          ${examples.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `
        : ""
    }
    ${
      checks.length > 0
        ? `
      <div class="checks">
        <h3>Reality check (mark what is true today)</h3>
        <div class="checks-list">
          ${checks
            .map(
              (item, index) => `
                <label class="check-item">
                  <input
                    type="checkbox"
                    class="cap-check"
                    data-check-index="${index}"
                    ${checkState[index] ? "checked" : ""}
                  />
                  <span>${item}</span>
                </label>
              `
            )
            .join("")}
        </div>
        <div class="checks-summary" id="checkSummary">
          ${checklistCalibration(checkedCount, checks.length)}
        </div>
      </div>
    `
        : ""
    }

    <div class="question">
      <strong>${cap.question}</strong>
      <div class="slider-card">
        <div class="slider-header">
          <span>Score</span>
          <span id="scoreLabel">${score === null || score === undefined ? "Not answered" : `${score} / 5 · ${scoreLabel(score)}`}</span>
        </div>
        <input
          type="range"
          id="scoreSlider"
          min="1"
          max="5"
          step="1"
          value="${score ?? 3}"
          list="scoreTicks"
          aria-label="Capability score"
        />
        <datalist id="scoreTicks">
          ${SCALE_OPTIONS.map((option) => `<option value="${option.value}"></option>`).join("")}
        </datalist>
        <div class="slider-ticks">
          ${SCALE_OPTIONS.map(
            (option, index) =>
              `<div class="tick ${index === 0 ? "tick-start" : ""} ${
                index === SCALE_OPTIONS.length - 1 ? "tick-end" : ""
              }" style="left: ${
                ((option.value - SCALE_OPTIONS[0].value) /
                  (SCALE_OPTIONS[SCALE_OPTIONS.length - 1].value -
                    SCALE_OPTIONS[0].value)) *
                100
              }%">
                <strong>${option.value}</strong>
                <span>${option.label}</span>
              </div>`
          ).join("")}
        </div>
        <div class="slider-hint" id="scoreHint">
          ${score === null || score === undefined ? "Move the slider to set a score." : SCALE_OPTIONS.find((option) => option.value === score)?.hint || ""}
        </div>
        <div class="score-rubric">
          Consistency rubric: 1 = absent, 3 = works in pockets, 5 = default path across teams.
        </div>
      </div>
    </div>

    <div class="followup" id="followupBlocker" style="display: none;">
      <label for="blocker">What is the biggest blocker right now?</label>
      <textarea id="blocker" placeholder="Example: approval delays, missing automation, unclear ownership">${escapeHtml(response.blocker || "")}</textarea>
    </div>

    <div class="followup" id="followupEvidence" style="display: none;">
      <label for="evidence">Where is this working well? (optional)</label>
      <textarea id="evidence" placeholder="Share examples that show adoption is working">${escapeHtml(response.evidence || "")}</textarea>
    </div>

    <div class="nav-actions">
      <button class="ghost" id="prevBtn" ${state.currentIndex === 0 ? "disabled" : ""}>Back</button>
      <div>
        <button class="ghost" id="saveBtn">Save note</button>
        <button class="primary" id="nextBtn">${state.currentIndex === capabilities.length - 1 ? "Finish" : "Next"}</button>
      </div>
    </div>
  `;

  const blockerEl = surveyView.querySelector("#followupBlocker");
  const evidenceEl = surveyView.querySelector("#followupEvidence");

  function updateFollowups(newScore) {
    if (newScore === null || newScore === undefined) {
      blockerEl.style.display = "none";
      evidenceEl.style.display = "none";
      return;
    }
    if (newScore <= 2) {
      blockerEl.style.display = "block";
      evidenceEl.style.display = "none";
    } else {
      blockerEl.style.display = "none";
      evidenceEl.style.display = "block";
    }
  }

  updateFollowups(score);

  const checkSummaryEl = surveyView.querySelector("#checkSummary");
  surveyView.querySelectorAll(".cap-check").forEach((input) => {
    input.addEventListener("change", () => {
      const latestChecks = Array.from(
        surveyView.querySelectorAll(".cap-check")
      ).map((checkbox) => checkbox.checked);
      const existing = state.responses[cap.id] || response;
      state.responses[cap.id] = {
        ...existing,
        checks: latestChecks,
      };
      if (checkSummaryEl) {
        const latestCount = latestChecks.filter(Boolean).length;
        checkSummaryEl.textContent = checklistCalibration(
          latestCount,
          latestChecks.length
        );
      }
      saveState();
    });
  });

  const slider = surveyView.querySelector("#scoreSlider");
  const scoreLabelEl = surveyView.querySelector("#scoreLabel");
  const scoreHintEl = surveyView.querySelector("#scoreHint");
  if (slider) {
    slider.addEventListener("input", (event) => {
      const newScore = Number(event.target.value);
      const option = SCALE_OPTIONS.find((item) => item.value === newScore);
      const existing = state.responses[cap.id] || response;
      state.responses[cap.id] = {
        ...existing,
        score: newScore,
      };
      if (scoreLabelEl) {
        scoreLabelEl.textContent = `${newScore} / 5 · ${option ? option.label : ""}`;
      }
      if (scoreHintEl) {
        scoreHintEl.textContent = option ? option.hint : "";
      }
      updateFollowups(newScore);
      saveState();
      renderSidebar();
      updateProgress();
    });
  }

  function persistNotes() {
    const blocker = surveyView.querySelector("#blocker");
    const evidence = surveyView.querySelector("#evidence");
    const existing = state.responses[cap.id] || response;
    const updated = {
      ...existing,
      score: existing.score ?? score,
      blocker: blocker ? blocker.value.trim() : existing.blocker,
      evidence: evidence ? evidence.value.trim() : existing.evidence,
    };
    state.responses[cap.id] = updated;
    saveState();
  }

  const blockerInput = surveyView.querySelector("#blocker");
  if (blockerInput) {
    blockerInput.addEventListener("input", persistNotes);
  }
  const evidenceInput = surveyView.querySelector("#evidence");
  if (evidenceInput) {
    evidenceInput.addEventListener("input", persistNotes);
  }

  surveyView.querySelector("#saveBtn").addEventListener("click", () => {
    persistNotes();
    render();
  });

  surveyView.querySelector("#prevBtn").addEventListener("click", () => {
    persistNotes();
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      saveState();
      render();
    }
  });

  surveyView.querySelector("#nextBtn").addEventListener("click", () => {
    persistNotes();
    if (state.currentIndex < capabilities.length - 1) {
      state.currentIndex += 1;
      saveState();
      render();
      return;
    }
    mode = "results";
    render();
  });
}

function calculateAverages() {
  const grouped = groupByCategory();
  const categoryScores = {};
  Object.keys(grouped).forEach((category) => {
    const scores = grouped[category]
      .map((cap) => state.responses[cap.id])
      .filter((response) => response && response.score !== undefined)
      .map((response) => response.score);
    if (scores.length > 0) {
      const avg = scores.reduce((sum, val) => sum + val, 0) / scores.length;
      categoryScores[category] = avg;
    } else {
      categoryScores[category] = null;
    }
  });

  const allScores = Object.values(state.responses)
    .filter((response) => response && response.score !== undefined)
    .map((response) => response.score);
  const overall =
    allScores.length > 0
      ? allScores.reduce((sum, val) => sum + val, 0) / allScores.length
      : null;

  return { overall, categoryScores };
}

function averageScores(values) {
  const valid = values.filter((value) => typeof value === "number");
  if (valid.length === 0) return null;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function averageForCapabilityIds(ids) {
  return averageScores(
    ids
      .map((id) => state.responses[id]?.score)
      .filter((value) => value !== null && value !== undefined)
  );
}

function impactBand(score) {
  if (score === null) {
    return { label: "No data", className: "band-none" };
  }
  if (score < 2.5) {
    return { label: "High drag risk", className: "band-risk" };
  }
  if (score < 3.5) {
    return { label: "Mixed signal", className: "band-watch" };
  }
  return { label: "Positive signal", className: "band-strong" };
}

function buildImpactModel() {
  const leanProductDevelopment = averageForCapabilityIds([
    "pp-small-batches",
    "pp-value-stream",
    "pp-customer-feedback",
    "pp-experimentation",
  ]);
  const leanManagement = averageForCapabilityIds([
    "lm-wip-limits",
    "lm-visualizing-work",
    "lm-monitoring",
    "lm-change-approval",
  ]);
  const technicalPractices = averageForCapabilityIds([
    "cd-version-control",
    "cd-deployment-automation",
    "cd-continuous-integration",
    "cd-trunk-based",
    "cd-test-automation",
    "cd-test-data",
    "cd-security",
    "arch-loosely-coupled",
    "arch-empowered-teams",
    "lm-proactive-notification",
  ]);
  const transformationalLeadership = averageForCapabilityIds([
    "cult-transformational-leadership",
  ]);
  const westrumCulture = averageForCapabilityIds(["cult-westrum"]);
  const continuousDelivery = averageForCapabilityIds([
    "cd-version-control",
    "cd-deployment-automation",
    "cd-continuous-integration",
    "cd-trunk-based",
    "cd-test-automation",
    "cd-test-data",
    "cd-security",
    "cd-continuous-delivery",
    "arch-loosely-coupled",
    "arch-empowered-teams",
    "lm-monitoring",
    "lm-proactive-notification",
  ]);
  const softwareDeliveryPerformance = averageScores([
    continuousDelivery,
    leanProductDevelopment,
    leanManagement,
    westrumCulture,
  ]);
  const jobSatisfaction = averageForCapabilityIds(["cult-job-satisfaction"]);
  const lowerBurnout = averageScores([
    jobSatisfaction,
    leanManagement,
    westrumCulture,
  ]);
  const lowerDeploymentPain = averageScores([
    continuousDelivery,
    technicalPractices,
  ]);
  const lowerRework = averageScores([
    continuousDelivery,
    leanProductDevelopment,
    averageForCapabilityIds(["cd-test-automation", "cd-continuous-integration"]),
  ]);
  const organizationalPerformance = averageScores([
    softwareDeliveryPerformance,
    jobSatisfaction,
  ]);

  return {
    upstream: [
      {
        label: "Transformational leadership",
        score: transformationalLeadership,
        detail: "Vision, support, and obstacle removal for engineering teams.",
      },
      {
        label: "Lean product development",
        score: leanProductDevelopment,
        detail: "Small batches, visible flow, customer feedback, experimentation.",
      },
      {
        label: "Lean management",
        score: leanManagement,
        detail: "WIP limits, visual work, production feedback, lightweight approvals.",
      },
      {
        label: "Technical practices",
        score: technicalPractices,
        detail: "CI/CD, test automation, security, architecture, monitoring.",
      },
    ],
    deliverySystem: [
      {
        label: "Westrum culture",
        score: westrumCulture,
        detail: "Information flow, psychological safety, and learning behavior.",
      },
      {
        label: "Continuous delivery capability",
        score: continuousDelivery,
        detail: "Ability to keep software deployable and release safely on demand.",
      },
      {
        label: "Software delivery performance",
        score: softwareDeliveryPerformance,
        detail: "Directional signal for speed and stability outcomes.",
      },
    ],
    outcomes: [
      {
        label: "Job satisfaction",
        score: jobSatisfaction,
        detail: "Team engagement and sustainability signal.",
      },
      {
        label: "Lower burnout risk",
        score: lowerBurnout,
        detail: "Directional signal from flow, safety, and workload health.",
      },
      {
        label: "Lower deployment pain",
        score: lowerDeploymentPain,
        detail: "Directional signal for safer, less painful releases.",
      },
      {
        label: "Lower rework",
        score: lowerRework,
        detail: "Directional signal for less redo and defect-driven churn.",
      },
      {
        label: "Organizational performance",
        score: organizationalPerformance,
        detail: "Directional composite from delivery and people outcomes.",
      },
    ],
    pathways: [
      "Transformational leadership supports lean product, lean management, and technical practices.",
      "Westrum culture and continuous delivery capability reinforce software delivery performance.",
      "Software delivery performance and job satisfaction contribute to organizational performance.",
    ],
  };
}

function renderRadarChart(canvasId, labels, values, maxValue) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const parent = canvas.parentElement;
  const size = Math.min(560, parent ? parent.clientWidth : 560);
  const width = Math.max(320, size);
  const height = Math.max(280, Math.round(width * 0.7));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2 + 10;
  const radius = Math.min(width, height) * 0.33;
  const steps = 5;
  const angleStep = (Math.PI * 2) / labels.length;

  ctx.strokeStyle = "rgba(47, 111, 100, 0.2)";
  ctx.lineWidth = 1;

  for (let ring = 1; ring <= steps; ring += 1) {
    const r = (radius * ring) / steps;
    ctx.beginPath();
    labels.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(47, 111, 100, 0.35)";
  labels.forEach((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  const points = values.map((value, index) => {
    const normalized = Math.max(0, Math.min(maxValue, value || 0)) / maxValue;
    const r = radius * normalized;
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  });

  ctx.fillStyle = "rgba(47, 111, 100, 0.25)";
  ctx.strokeStyle = "rgba(47, 111, 100, 0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#1c1b18";
  ctx.font = "12px \"IBM Plex Sans\", sans-serif";
  labels.forEach((label, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + (radius + 24) * Math.cos(angle);
    const y = centerY + (radius + 24) * Math.sin(angle);
    ctx.textAlign = x < centerX ? "right" : "left";
    ctx.textBaseline = y < centerY ? "bottom" : "top";
    ctx.fillText(label, x, y);
  });
}

function renderResults() {
  const { overall, categoryScores } = calculateAverages();
  const unanswered = capabilities.filter((cap) => !isAnswered(cap));
  const impactModel = buildImpactModel();
  const categoryLabels = Object.keys(categoryScores);
  const categoryValues = categoryLabels.map(
    (label) => categoryScores[label] ?? 0
  );
  const categoryGuidance = Object.entries(groupByCategory()).map(
    ([category, caps]) => {
      const scored = caps
        .map((cap) => ({
          cap,
          response: state.responses[cap.id],
        }))
        .filter((item) => item.response && item.response.score !== undefined)
        .sort((a, b) => a.response.score - b.response.score);
      const focusItems = scored.slice(0, 2);
      const uniqueActions = [];
      focusItems.forEach((item) => {
        item.cap.recommendations.forEach((recommendation) => {
          if (uniqueActions.length < 3 && !uniqueActions.includes(recommendation)) {
            uniqueActions.push(recommendation);
          }
        });
      });
      return {
        category,
        average: categoryScores[category],
        focusItems,
        actions: uniqueActions,
      };
    }
  );

  const scoredCaps = capabilities
    .map((cap) => ({
      cap,
      response: state.responses[cap.id],
    }))
    .filter((item) => item.response && item.response.score !== undefined)
    .sort((a, b) => a.response.score - b.response.score);

  const priorities = scoredCaps.filter((item) => item.response.score < 5);
  const topPriorities = priorities.slice(0, 8);
  const renderImpactNodes = (nodes) =>
    nodes
      .map((node) => {
        const band = impactBand(node.score);
        return `
          <div class="impact-node ${band.className}">
            <h5>${node.label}</h5>
            <div class="impact-score">${node.score === null ? "--" : node.score.toFixed(1)} / 5</div>
            <div class="impact-band">${band.label}</div>
            <p>${node.detail}</p>
          </div>
        `;
      })
      .join("");

  resultsView.innerHTML = `
    <div class="card-header">
      <span>Results summary</span>
      <span>${answeredCount()} of ${capabilities.length} answered</span>
    </div>
    <h2>Adoption snapshot</h2>
    <p>Use this summary to align on priorities and agree on next steps.</p>

    <div class="results-section results-grid">
      <div class="metric">
        <h4>Overall adoption</h4>
        <div class="score">${overall === null ? "--" : overall.toFixed(1)} / 5</div>
        <div>${overall === null ? "No scores yet" : scoreLabel(Math.round(overall))}</div>
      </div>
      ${Object.keys(categoryScores)
        .map((category) => {
          const avg = categoryScores[category];
          return `
            <div class="metric">
              <h4>${category}</h4>
              <div class="score">${avg === null ? "--" : avg.toFixed(1)} / 5</div>
              <div>${avg === null ? "No scores yet" : scoreLabel(Math.round(avg))}</div>
            </div>
          `;
        })
        .join("")}
    </div>

    <div class="results-section">
      <h3>Category radar</h3>
      <p>Average score by capability group.</p>
      <div class="chart-card">
        <canvas id="radarChart" width="520" height="420"></canvas>
      </div>
    </div>

    <div class="results-section">
      <h3>Relationship and impact map</h3>
      <p>Directional view of how practices influence delivery and organizational outcomes, based on Accelerate/DORA research.</p>
      <div class="impact-grid">
        <div class="impact-column">
          <h4>Upstream practices</h4>
          ${renderImpactNodes(impactModel.upstream)}
        </div>
        <div class="impact-column">
          <h4>Delivery system</h4>
          ${renderImpactNodes(impactModel.deliverySystem)}
        </div>
        <div class="impact-column">
          <h4>Outcomes</h4>
          ${renderImpactNodes(impactModel.outcomes)}
        </div>
      </div>
      <div class="impact-pathways">
        ${impactModel.pathways
          .map((pathway) => `<div class="impact-path">→ ${pathway}</div>`)
          .join("")}
      </div>
      <p class="impact-note">
        Note: outcome scores are directional indicators derived from your survey responses; they are not causal estimates.
      </p>
    </div>

    <div class="results-section">
      <h3>Fast-flow actions by category</h3>
      <p>Each category points to the lowest-scoring capability and next actions.</p>
      <div class="results-grid">
        ${categoryGuidance
          .map((item) => {
            if (item.focusItems.length === 0) {
              return `
                <div class="next-step-card">
                  <h5>${item.category}</h5>
                  <div>No scored capabilities yet in this category.</div>
                </div>
              `;
            }
            const focusNames = item.focusItems.map((focus) => focus.cap.name).join(", ");
            return `
              <div class="next-step-card">
                <h5>${item.category}</h5>
                <div class="category-focus">
                  Average: ${item.average === null ? "--" : item.average.toFixed(1)} / 5
                </div>
                <div class="category-focus">
                  Focus now: ${focusNames}
                </div>
                <ul>
                  ${item.actions.map((action) => `<li>${action}</li>`).join("")}
                </ul>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>

    ${unanswered.length > 0 ? `
      <div class="results-section">
        <h3>Missing responses</h3>
        <p>Complete these to get a full picture.</p>
        <div class="results-grid">
          ${unanswered
            .map(
              (cap) => `
                <div class="metric">
                  <strong>${cap.name}</strong>
                  <div>${cap.category}</div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    ` : ""}

    <div class="results-section">
      <h3>Top next steps</h3>
      <p>Focus on the lowest-scoring capabilities first.</p>
      <div class="results-grid">
        ${topPriorities.length === 0 ? "<div class=\"metric\">All capabilities are fully adopted based on current answers.</div>" : ""}
        ${topPriorities
          .map(({ cap, response }) => {
            return `
              <div class="next-step-card">
                <h5>${cap.name}</h5>
                <div style="color: ${scoreColor(response.score)}; font-weight: 600;">
                  ${scoreLabel(response.score)}
                </div>
                ${response.blocker ? `<p><strong>Blocker:</strong> ${escapeHtml(response.blocker)}</p>` : ""}
                <ul>
                  ${cap.recommendations.map((step) => `<li>${step}</li>`).join("")}
                </ul>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>

    <div class="nav-actions">
      <button class="ghost" id="backToSurvey">Back to survey</button>
      <button class="secondary" id="exportBtn">Download JSON</button>
    </div>

    <div class="results-section">
      <h3>Research references</h3>
      <div class="references">
        <a href="https://itrevolution.com/product/accelerate/" target="_blank" rel="noopener">Accelerate (Forsgren, Humble, Kim)</a>
        <a href="https://dora.dev/research/" target="_blank" rel="noopener">DORA Research Program</a>
        <a href="https://dora.dev/research/state-of-devops/" target="_blank" rel="noopener">State of DevOps reports</a>
      </div>
    </div>
  `;

  renderRadarChart("radarChart", categoryLabels, categoryValues, 5);

  resultsView.querySelector("#backToSurvey").addEventListener("click", () => {
    mode = "survey";
    render();
  });

  resultsView.querySelector("#exportBtn").addEventListener("click", () => {
    const report = buildReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "accelerate-capability-survey.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

function buildReport() {
  const { overall, categoryScores } = calculateAverages();
  const impactModel = buildImpactModel();
  return {
    generatedAt: new Date().toISOString(),
    scale: {
      min: 1,
      max: 5,
    },
    overallAverage: overall,
    categoryAverages: categoryScores,
    relationshipAndImpact: impactModel,
    researchReferences: [
      "https://itrevolution.com/product/accelerate/",
      "https://dora.dev/research/",
      "https://dora.dev/research/state-of-devops/",
    ],
    responses: capabilities.map((cap) => {
      const response = state.responses[cap.id] || {};
      return {
        id: cap.id,
        name: cap.name,
        category: cap.category,
        score: response.score ?? null,
        scoreLabel: scoreLabel(response.score),
        checks: Array.isArray(response.checks) ? response.checks : [],
        blocker: response.blocker || "",
        evidence: response.evidence || "",
      };
    }),
  };
}

function render() {
  updateProgress();
  renderSidebar();
  if (mode === "results") {
    surveyView.classList.add("hidden");
    resultsView.classList.remove("hidden");
    renderResults();
    viewResultsBtn.textContent = "Back to survey";
  } else {
    resultsView.classList.add("hidden");
    surveyView.classList.remove("hidden");
    renderSurvey();
    viewResultsBtn.textContent = "View results";
  }
}

viewResultsBtn.addEventListener("click", () => {
  mode = mode === "survey" ? "results" : "survey";
  render();
});

resetBtn.addEventListener("click", () => {
  state = { currentIndex: 0, responses: {} };
  mode = "survey";
  saveState();
  render();
});

render();
