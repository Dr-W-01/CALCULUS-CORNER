/** Calculus I definitions & theorems — accordion content for the definitions page. */

export const CALCULUS1_DEFINITION_TOPICS = [
  {
    id: 'limits',
    title: 'Limits',
    items: [
      {
        term: 'Limit',
        katex: String.raw`L=\lim_{x\to a} f(x)\text{ means that for every }\varepsilon > 0\text{ there exists a }\delta > 0\text{ such that if }0 < |x-a| < \delta\text{ then }|f(x)-L| < \varepsilon.`,
      },
      {
        term: 'Left-Hand Limit',
        katex: String.raw`L=\lim_{x\to a^-} f(x)\text{ means that }f(x)\text{ approaches }L\text{ as }x\text{ approaches }a\text{ from values less than }a.`,
      },
      {
        term: 'Right-Hand Limit',
        katex: String.raw`L=\lim_{x\to a^+} f(x)\text{ means that }f(x)\text{ approaches }L\text{ as }x\text{ approaches }a\text{ from values greater than }a.`,
      },
      {
        term: 'Continuity at a Point',
        katex: String.raw`\text{A function }f\text{ is continuous at a number }a\text{ if }\lim_{x\to a} f(x) = f(a).`,
      },
      {
        term: 'Removable Discontinuity',
        katex: String.raw`\text{A function }f\text{ has a removable discontinuity at }a\text{ if }\lim_{x\to a} f(x)\text{ exists but either }f(a)\text{ is not defined or }f(a) \neq \lim_{x\to a} f(x).`,
      },
      {
        term: 'Jump Discontinuity',
        katex: String.raw`\text{A function }f\text{ has a jump discontinuity at }a\text{ if both one-sided limits }\lim_{x\to a^-} f(x)\text{ and }\lim_{x\to a^+} f(x)\text{ exist but are not equal.}`,
      },
      {
        term: 'Infinite Discontinuity',
        katex: String.raw`\text{A function }f\text{ has an infinite discontinuity at }a\text{ if at least one of the one-sided limits is }\pm\infty.`,
      },
    ],
  },
  {
    id: 'derivatives',
    title: 'Derivatives',
    items: [
      {
        term: 'Critical Point',
        katex: String.raw`\textbf{Definition.}\ \text{We say that the number }c\text{ is a }\underline{\text{critical point of }f}\text{ if }c\text{ is in the domain of }f\text{ and either }f'(c)=0\text{ or }f'(c)\text{ does not exist.}`,
      },
      {
        term: 'Absolute Maximum',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }f\text{ has an }\underline{\text{absolute maximum}}\text{ at }c\text{ if }f(c)\ge f(x)\text{ for all }x\text{ in the domain of }f.`,
      },
      {
        term: 'Absolute Minimum',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }f\text{ has an }\underline{\text{absolute minimum}}\text{ at }c\text{ if }f(c)\le f(x)\text{ for all }x\text{ in the domain of }f.`,
      },
      {
        term: 'Local Maximum',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }f(c)\text{ is a }\underline{\text{local maximum of }f}\text{ at }x=c\text{ if there exists an interval }(a,b)\text{ containing }c\text{ such that for all }x\text{ with }a < x < b\text{ and }x\text{ in the domain of }f,\ f(c)\ge f(x).`,
      },
      {
        term: 'Local Minimum',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }f(c)\text{ is a }\underline{\text{local minimum of }f}\text{ at }x=c\text{ if there exists an interval }(a,b)\text{ containing }c\text{ such that for all }x\text{ with }a < x < b\text{ and }x\text{ in the domain of }f,\ f(c)\le f(x).`,
      },
      {
        term: 'Increasing on an Interval',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }f\text{ is }\underline{\text{increasing on an interval }(a,b)}\text{ if }f(x_1)<f(x_2)\text{ whenever }a<x_1<x_2<b.`,
      },
      {
        term: 'Decreasing on an Interval',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }f\text{ is }\underline{\text{decreasing on an interval }(a,b)}\text{ if }f(x_1)>f(x_2)\text{ whenever }a<x_1<x_2<b.`,
      },
      {
        term: 'Concave Up',
        katex: String.raw`\textbf{Definition.}\ \text{We say that the graph of }f\text{ is }\underline{\text{concave up on }(a,b)}\text{ if the graph of }f(x)\text{ lies above all its tangent lines on }(a,b).`,
      },
      {
        term: 'Concave Down',
        katex: String.raw`\textbf{Definition.}\ \text{We say that the graph of }f\text{ is }\underline{\text{concave down on }(a,b)}\text{ if the graph of }f(x)\text{ lies below all its tangent lines on }(a,b).`,
      },
      {
        term: 'Point of Inflection',
        katex: String.raw`\textbf{Definition.}\ \text{We say that }(c,f(c))\text{ is a }\underline{\text{point of inflection of }f}\text{ if the concavity of }f\text{ changes at }x=c.`,
      },
    ],
  },
  {
    id: 'integrals',
    title: 'Integrals',
    items: [
      {
        term: 'Antiderivative',
        katex: String.raw`F\text{ is an antiderivative of }f\text{ on an interval if }F'(x)=f(x)\text{ for all }x\text{ in that interval.}`,
      },
      {
        term: 'Indefinite Integral',
        katex: String.raw`\int f(x)\,dx = F(x)+C\text{ denotes the family of all antiderivatives of }f.`,
      },
      {
        term: 'Definite Integral',
        katex: String.raw`\int_a^b f(x)\,dx\text{ represents the signed area under the curve }y=f(x)\text{ from }x=a\text{ to }x=b.`,
      },
      {
        term: 'Riemann Sum',
        katex: String.raw`\sum_{i=1}^{n} f(x_i^*)\,\Delta x\text{ approximates the area under }f\text{ by summing areas of rectangles on }[a,b].`,
      },
    ],
  },
  {
    id: 'theorems',
    title: 'Theorems',
    items: [
      {
        term: 'Intermediate Value Theorem',
        katex: String.raw`\textbf{Theorem.}\ \text{If }f\text{ is continuous on }[a,b]\text{ and }N\text{ is any number between }f(a)\text{ and }f(b)\text{, then there exists }c\in(a,b)\text{ such that }f(c)=N.`,
      },
      {
        term: 'Squeeze Theorem',
        katex: String.raw`\textbf{Theorem.}\ \text{If }f(x)\le g(x)\le h(x)\text{ when }x\text{ is near }a\text{ (except possibly at }a\text{) and }\lim_{x\to a}f(x)=\lim_{x\to a}h(x)=L\text{, then }\lim_{x\to a}g(x)=L.`,
      },
      {
        term: 'Mean Value Theorem',
        katex: String.raw`\textbf{Theorem.}\ \text{If }f\text{ is continuous on }[a,b]\text{ and differentiable on }(a,b)\text{, then there exists }c\in(a,b)\text{ such that }f'(c)=\dfrac{f(b)-f(a)}{b-a}.`,
      },
      {
        term: 'Extreme Value Theorem',
        katex: String.raw`\textbf{Theorem.}\ \text{If }f\text{ is continuous on a closed interval }[a,b]\text{, then }f\text{ attains an absolute maximum and an absolute minimum on }[a,b].`,
      },
      {
        term: "Rolle's Theorem",
        katex: String.raw`\textbf{Theorem.}\ \text{If }f\text{ is continuous on }[a,b]\text{, differentiable on }(a,b)\text{, and }f(a)=f(b)\text{, then there exists }c\in(a,b)\text{ such that }f'(c)=0.`,
      },
    ],
  },
];