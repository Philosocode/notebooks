export interface ILibrarySection {
  name: string;
  pages: string[];
}

const theorySection = {
  name: "Theory",
  pages: [
    "concrete-examples",
    "dual-coding",
    "interleaving",
    "analogy-metaphor",
    "spacing",
    "variation",
  ]
}

export const sections = [
  theorySection,
  theorySection,
  theorySection,
  theorySection,
];
