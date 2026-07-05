/** Dedicated visualizer pages — header, iframe embed, description */

export const VISUALIZERS = [
  {
    id: 'riemann-sums',
    desmosEmbedId: '6930d99975',
    pageTitle: 'Riemann Sum Explorer',
    heading: 'RIEMANN SUM EXPLORER',
    description: 'This explorer shows how Riemann sums approximate the area under f(x) = x² + 1 on an interval [a, b]. Use the sliders to change the number of subintervals n and the sample point c (left, right, or midpoint rule). Watch the rectangles fill in and the sum approach the true definite integral as n grows — the bridge between finite sums and integration.',
  },
  {
    id: 'secant-line',
    desmosEmbedId: 'qmw6rh0if7',
    pageTitle: 'Secant to Tangent',
    heading: 'SECANT TO TANGENT',
    description: 'A secant line through two points on f(x) = x² measures the average rate of change. Drag the second point closer by shrinking h and watch the secant rotate toward the tangent at x = a. This is the geometric meaning of the derivative: the slope of the tangent is the limit of slopes of secant lines as h → 0.',
  },
  {
    id: 'taylor-polynomials',
    desmosEmbedId: '561294d70a',
    pageTitle: 'Taylor Polynomial Approximations',
    heading: 'TAYLOR POLYNOMIAL APPROXIMATIONS',
    description: 'Taylor polynomials approximate a smooth function near a point using derivatives. Here sin(x) is matched by polynomials T₁, T₂, … built from successive derivatives at x = a. Move a and compare the curves: each additional term captures more local behavior, and the approximation tightens near the center of expansion.',
  },
  {
    id: 'ftc-part-2',
    desmosEmbedId: 'snkp74u6bt',
    pageTitle: 'Fundamental Theorem of Calculus, Part 2',
    heading: 'FUNDAMENTAL THEOREM OF CALCULUS, PART 2',
    description: 'Part 2 of the Fundamental Theorem says: if F(x) = ∫ₐˣ f(t) dt, then F′(x) = f(x). With f(x) = 2x, sweep the upper limit with the slider c and watch the shaded area accumulate. The area function F(x) is an antiderivative — differentiating it recovers the original integrand, linking integration and differentiation as inverse processes.',
  },
];