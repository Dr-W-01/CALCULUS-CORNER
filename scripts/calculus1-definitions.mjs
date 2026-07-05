/** Calculus I definitions — sourced from chapter 3 Key Definitions (examples omitted). */

export const CALCULUS1_DEFINITION_TOPICS = [
  {
    id: 'limits',
    title: 'Limits',
    placeholder: 'More definitions will be added here soon.',
  },
  {
    id: 'derivatives',
    title: 'Derivatives',
    definitions: [
      String.raw`\textbf{Definition.}\ \text{We say that the number }c\text{ is a }\underline{\text{critical point of }f}\text{ if }c\text{ is in the domain of }f\text{ and either }f'(c)=0\text{ or }f'(c)\text{ does not exist.}`,
      String.raw`\textbf{Definition.}\ \text{We say that }f\text{ has an }\underline{\text{absolute maximum}}\text{ at }c\text{ if }f(c)\ge f(x)\text{ for all }x\text{ in the domain of }f.`,
      String.raw`\textbf{Definition.}\ \text{We say that }f\text{ has an }\underline{\text{absolute minimum}}\text{ at }c\text{ if }f(c)\le f(x)\text{ for all }x\text{ in the domain of }f.`,
      String.raw`\textbf{Definition.}\ \text{We say that }f(c)\text{ is a }\underline{\text{local maximum of }f}\text{ at }x=c\text{ if there exists an interval }(a,b)\text{ containing }c\text{ such that for all }x\text{ with }a < x < b\text{ and }x\text{ in the domain of }f,\ f(c)\ge f(x).`,
      String.raw`\textbf{Definition.}\ \text{We say that }f(c)\text{ is a }\underline{\text{local minimum of }f}\text{ at }x=c\text{ if there exists an interval }(a,b)\text{ containing }c\text{ such that for all }x\text{ with }a < x < b\text{ and }x\text{ in the domain of }f,\ f(c)\le f(x).`,
      String.raw`\textbf{Definition.}\ \text{We say that }f\text{ is }\underline{\text{increasing on an interval }(a,b)}\text{ if }f(x_1)<f(x_2)\text{ whenever }a<x_1<x_2<b.`,
      String.raw`\textbf{Definition.}\ \text{We say that }f\text{ is }\underline{\text{decreasing on an interval }(a,b)}\text{ if }f(x_1)>f(x_2)\text{ whenever }a<x_1<x_2<b.`,
      String.raw`\textbf{Definition.}\ \text{We say that the graph of }f\text{ is }\underline{\text{concave up on }(a,b)}\text{ if the graph of }f(x)\text{ lies above all its tangent lines on }(a,b).`,
      String.raw`\textbf{Definition.}\ \text{We say that the graph of }f\text{ is }\underline{\text{concave down on }(a,b)}\text{ if the graph of }f(x)\text{ lies below all its tangent lines on }(a,b).`,
      String.raw`\textbf{Definition.}\ \text{We say that }(c,f(c))\text{ is a }\underline{\text{point of inflection of }f}\text{ if the concavity of }f\text{ changes at }x=c.`,
    ],
  },
  {
    id: 'integrals',
    title: 'Integrals',
    placeholder: 'More definitions will be added here soon.',
  },
];