/** Lightweight Exotic Zoo detail pages: header → interactive graph → description */

export const EXOTIC_FUNCTIONS = [
  {
    id: 'blancmange',
    pageTitle: 'Blancmange Function',
    heading: 'BLANCMANGE FUNCTION',
    headerKatex: 'f(x)=\\sum_{n=0}^{\\infty}\\frac{1-\\cos(2^{n} x)}{2^{n}}',
    graphExpression: 'y = \\sum_{n=0}^{100}\\frac{1-\\cos(2^{n} x)}{2^{n}}',
    bounds: { left: -3, right: 3, bottom: -0.5, top: 2.5 },
    description: 'The Blancmange function is a classic pathological example in real analysis: it is continuous at every real number, yet differentiable almost nowhere. Built from an infinite sum of scaled cosine bumps, its graph looks deceptively smooth from a distance but reveals a fractal, Takagi-like jagged structure under magnification. It challenges the comfortable intuition that continuity implies some local smoothness, and it demonstrates how an infinite series can produce genuinely wild behavior while still satisfying the ε–δ definition of continuity at every point.',
  },
  {
    id: 'topologist-sine',
    pageTitle: "Topologist's Sine Curve",
    heading: "TOPOLOGIST'S SINE CURVE",
    headerKatex: 'f(x) = \\sin\\left(\\frac{1}{x}\\right)',
    graphExpression: 'y = \\sin(1/x)',
    bounds: { left: -0.5, right: 0.5, bottom: -1.5, top: 1.5 },
    description: "The Topologist's Sine Curve, sin(1/x), is undefined at x = 0 but defined on every punctured neighborhood of the origin. As x approaches zero, the argument 1/x races toward infinity, forcing the sine term to oscillate between −1 and 1 with ever-increasing frequency — infinitely many wiggles packed into any interval around 0. No two-sided limit exists at the origin, so this is a dramatic illustration of how oscillation can defeat limits and continuity. Topologists study this curve because its closure has remarkable connectivity properties that ordinary graphs never exhibit.",
  },
  {
    id: 'shrinking-topologist-sine',
    pageTitle: "Shrinking Topologist's Sine Curve",
    heading: "SHRINKING TOPOLOGIST'S SINE CURVE",
    headerKatex: 'f(x) = x\\sin\\left(\\frac{1}{x}\\right)',
    graphExpression: 'y = x\\sin(1/x)',
    bounds: { left: -0.5, right: 0.5, bottom: -0.5, top: 0.5 },
    description: 'Multiplying the Topologist\'s Sine Curve by x dampens its wild oscillations: the graph of x·sin(1/x) still wiggles furiously near zero, but the amplitude shrinks to 0 as x → 0. This is one of calculus\'s most important counterexamples — the two-sided limit exists and equals 0, so defining f(0) = 0 gives a continuous extension even though the raw formula is undefined at the origin. It bridges exotic pathology with mainstream limit theorems, showing how a removable discontinuity can hide inside an expression that looks hopelessly chaotic.',
  },
  {
    id: 'heartbeat',
    pageTitle: 'Heartbeat Function',
    heading: 'HEARTBEAT FUNCTION',
    headerKatex: 'f(x)=\\sqrt{|x|}+\\sin(\\pi^{3}x)\\sqrt{\\frac{e^{2}-x^{2}}{2}}',
    graphExpression: 'y = \\sqrt{\\sqrt{x^2}} + \\sin(\\pi^3 x) \\sqrt{(e^2 - x^2)/2}',
    bounds: { left: -3.5, right: 3.5, bottom: -1, top: 3 },
    points: [
      { id: 'heart-0', latex: '(-e, \\sqrt{e})', pointStyle: 'POINT', color: '#f87171' },
      { id: 'heart-1', latex: '(e, \\sqrt{e})', pointStyle: 'POINT', color: '#f87171' },
    ],
    description: 'This handcrafted combination of roots and sine — living on the bounded interval [−e, e] — produces a silhouette that resembles a cardiogram or heartbeat on the monitor. The nested square-root factors sculpt endpoint behavior at the domain boundaries while the sine term, scaled by √(e² − x²)/2, superimposes rapid interior oscillation that fades toward the edges. It is exotic not because of a single pathology, but because it stitches several distinct graphical personalities — bounded growth, high-frequency ripples, and symmetric endpoints — into one memorable shape that rewards free exploration in the graph above.',
  },
  {
    id: 'all-features',
    pageTitle: 'Function with All Features',
    heading: 'FUNCTION WITH ALL FEATURES',
    headerKatex: 'g(x)=\\frac{x}{x}\\sqrt{10+x}\\left(\\frac{-1}{x+4}\\right)\\left(\\frac{\\left|x+1\\right|}{x+1}\\right)\\left(x-1\\right)^{\\frac{1}{3}}\\left(x-2\\right)^{\\frac{2}{3}}',
    graphExpression: 'g(x)=\\frac{x}{x}\\sqrt{10+x}\\left(\\frac{-1}{x+4}\\right)\\left(\\frac{\\left|x+1\\right|}{x+1}\\right)\\left(x-1\\right)^{\\frac{1}{3}}\\left(x-2\\right)^{\\frac{2}{3}}',
    bounds: { left: -10, right: 10, bottom: -8.5, top: 8.5 },
    points: [
      { id: 'hole', latex: '(0,1.254951)', pointStyle: 'OPEN', color: '#f87171' },
    ],
    description: 'This custom graph — from Dr. W\'s Desmos calculator — multiplies six Basic Zoo building blocks into one expression: x/x contributes a removable discontinuity (hole) at x = 0; √(10 + x) creates a domain endpoint at x = −10; −1/(x + 4) plants a vertical asymptote at x = −4; |x + 1|/(x + 1) inserts a sign-function jump at x = −1; (x − 1)^(1/3) brings a vertical tangent at x = 1; and (x − 2)^(2/3) adds a cusp at x = 2. It is less a function you would analyze with a single global derivative chart, and more a deliberate field guide to the discontinuities, corners, and asymptotes that every calculus student must learn to spot. Zoom and pan through the graph above to hunt each feature in the wild.',
  },
];