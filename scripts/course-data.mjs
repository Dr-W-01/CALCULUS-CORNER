/** Course hub pages — dummy content for initial Courses section. */

export const SECTION_TILES = [
  {
    id: 'topics',
    title: 'Topics',
    description: 'Browse the course outline and explore each unit.',
    visualClass: 'course-tile-visual--topics',
  },
  {
    id: 'definitions',
    title: 'Definitions',
    description: 'Key terms, notation, and reference definitions.',
    visualClass: 'course-tile-visual--definitions',
  },
  {
    id: 'theorems',
    title: 'Theorems',
    description: 'Important results, hypotheses, and formal statements.',
    visualClass: 'course-tile-visual--theorems',
  },
  {
    id: 'problems',
    title: 'Problems',
    description: 'Practice sets and worked example problems.',
    visualClass: 'course-tile-visual--problems',
  },
];

function topicAccordion(name, blurb) {
  return { title: name, summary: `Overview: ${name}`, body: blurb };
}

function definitionAccordion(term, body) {
  return { title: term, summary: term, body };
}

function problemAccordion(set, body) {
  return { title: set, summary: set, body };
}

function theoremAccordion(name, body) {
  return { title: name, summary: name, body };
}

export const COURSES = [
  {
    id: 'precalculus',
    title: 'Precalculus',
    visualClass: 'course-card-visual--precalculus',
    portrait: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/440px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg',
      alt: 'Portrait of René Descartes by Frans Hals',
      position: 'center 20%',
    },
    landingDescription:
      'Functions, trigonometry, and algebraic tools that prepare you for limits and derivatives.',
    courseDescription:
      'Precalculus reviews the function toolkit you need for calculus: graphs, transformations, trigonometric identities, and exponential/logarithmic relationships.',
    accordion: {
      topics: [
        topicAccordion('Functions & Graphs', 'Domain, range, transformations, and composition — the language of calculus.'),
        topicAccordion('Trigonometry', 'Unit circle, identities, and graphs of sine and cosine.'),
        topicAccordion('Exponents & Logarithms', 'Laws of exponents, inverse functions, and solving exponential equations.'),
        topicAccordion('Polynomials & Rational Functions', 'Factoring, asymptotes, and end behavior of rational graphs.'),
        topicAccordion('Conic Sections', 'Parabolas, ellipses, and hyperbolas as geometric curves.'),
      ],
      definitions: [
        definitionAccordion('Function', 'A rule that assigns exactly one output to each input in its domain.'),
        definitionAccordion('Domain', 'The set of all inputs for which a function is defined.'),
        definitionAccordion('Range', 'The set of all possible outputs of a function.'),
        definitionAccordion('One-to-One Function', 'A function that never takes the same value twice.'),
      ],
      theorems: [
        theoremAccordion('Pythagorean Identity', 'For any angle θ, sin²θ + cos²θ = 1.'),
        theoremAccordion('Law of Sines', 'In any triangle, the ratio of each side to the sine of its opposite angle is constant.'),
        theoremAccordion('Change of Base (Logarithms)', 'logₐ b = (log_c b) / (log_c a) for positive bases a, b, c with a ≠ 1 and c ≠ 1.'),
      ],
      problems: [
        problemAccordion('Warm-Up Set A', 'Evaluate expressions and identify domains of simple functions.'),
        problemAccordion('Warm-Up Set B', 'Sketch transformations of parent functions.'),
        problemAccordion('Challenge Set', 'Mixed review combining trigonometry and algebraic manipulation.'),
      ],
    },
  },
  {
    id: 'calculus1',
    title: 'Calculus I',
    visualClass: 'course-card-visual--calculus1',
    portrait: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bernhard_Riemann.jpg/440px-Bernhard_Riemann.jpg',
      alt: 'Portrait of Bernhard Riemann',
      position: 'center 15%',
    },
    landingDescription:
      'Limits, continuity, derivatives, and their applications — the core of first-semester calculus.',
    courseDescription:
      'Calculus I introduces the limit definition of the derivative, differentiation rules, and basic applications such as related rates and optimization.',
    accordion: {
      topics: [
        topicAccordion('Limits & Continuity', 'Approaching values, one-sided limits, and continuity on intervals.'),
        topicAccordion('The Derivative', 'Instantaneous rate of change and the limit definition of f′(x).'),
        topicAccordion('Differentiation Rules', 'Power, product, quotient, and chain rules.'),
        topicAccordion('Applications of Derivatives', 'Related rates, optimization, and curve sketching.'),
        topicAccordion('Introduction to Integration', 'Antiderivatives and the idea of accumulation.'),
      ],
      definitions: [
        definitionAccordion('Limit', 'The value f(x) approaches as x approaches a point a.'),
        definitionAccordion('Derivative', 'The instantaneous rate of change of f at x, when the limit exists.'),
        definitionAccordion('Continuous at a Point', 'f(a) is defined, the limit exists, and both agree.'),
        definitionAccordion('Critical Point', 'A point where f′ is zero or undefined.'),
      ],
      theorems: [],
      problems: [
        problemAccordion('Limits Practice', 'Compute limits using algebra and one-sided reasoning.'),
        problemAccordion('Derivative Drills', 'Apply differentiation rules to polynomial and trig functions.'),
        problemAccordion('Application Problems', 'Related rates and optimization word problems.'),
      ],
    },
  },
  {
    id: 'calculus2',
    title: 'Calculus II',
    visualClass: 'course-card-visual--calculus2',
    portrait: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Leonhard_Euler_-_Jakob_Emanuel_Handmann.jpg/440px-Leonhard_Euler_-_Jakob_Emanuel_Handmann.jpg',
      alt: 'Portrait of Leonhard Euler by Jakob Emanuel Handmann',
      position: 'center 12%',
    },
    landingDescription:
      'Integration techniques, applications of integrals, and an introduction to sequences and series.',
    courseDescription:
      'Calculus II develops definite and indefinite integrals, techniques of integration, area and volume applications, and convergence of sequences and series.',
    accordion: {
      topics: [
        topicAccordion('Integration Techniques', 'Substitution, parts, partial fractions, and trigonometric integrals.'),
        topicAccordion('Applications of Integrals', 'Area between curves, volumes of revolution, and work.'),
        topicAccordion('Differential Equations', 'Separable equations and basic modeling.'),
        topicAccordion('Sequences & Series', 'Convergence tests and partial sums.'),
        topicAccordion('Power Series', 'Taylor series and approximations.'),
      ],
      definitions: [
        definitionAccordion('Definite Integral', 'The signed area under f(x) from a to b.'),
        definitionAccordion('Improper Integral', 'An integral with an infinite limit of integration or a discontinuity.'),
        definitionAccordion('Convergent Series', 'A series whose partial sums approach a finite limit.'),
        definitionAccordion('Taylor Series', 'A power series representation of a function about a point.'),
      ],
      theorems: [
        theoremAccordion('Fundamental Theorem of Calculus', 'If f is continuous on [a, b] and F is an antiderivative of f, then ∫ₐᵇ f(x) dx = F(b) − F(a).'),
        theoremAccordion('Comparison Test', 'If 0 ≤ aₙ ≤ bₙ for n beyond some index and ∑ bₙ converges, then ∑ aₙ converges.'),
        theoremAccordion('Integral Test', 'If f is positive, continuous, and decreasing on [1, ∞), then ∑ f(n) and ∫₁^∞ f(x) dx either both converge or both diverge.'),
      ],
      problems: [
        problemAccordion('Integration Set I', 'u-substitution and integration by parts.'),
        problemAccordion('Integration Set II', 'Partial fractions and trigonometric integrals.'),
        problemAccordion('Series Practice', 'Apply convergence tests to infinite series.'),
      ],
    },
  },
];