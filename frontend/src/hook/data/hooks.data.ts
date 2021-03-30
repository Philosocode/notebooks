const connectHooks = [
  "Can I think of a simile, analogy, or metaphor?",
  "What does this remind me of?",
  "Is this my first time encountering this? If not, where have I encountered this before?",
  "Do I have any personal experience with this?",
  "How can I apply this to my own life?",
  "What questions does this raise for me?",
  "What are some practical / real-world applications of this?",
  "How would I prove this?",
  "How would I challenge this?",
  "What do I know that supports this?",
  "How does this fit in with the rest of what I know about this subject?",
];

const processHooks = [
  "How do I express this in my own words?",
  "How do I explain this so a 5 year old can understand?",
  "Can I think of (simple) concrete examples for this?",
  "What are the key things I need to remember?",
  "Why is this important?",
  "On a scale from 1-10, how well do I understand this?",
  "What's hard about this? Why is this hard?",
  "How do I feel about this? Is this surprising? Interesting?",
  "Do I agree or disagree? Why?",
  "How does this work? Why does it work like this? (repeat multiple times)",
  "Can I create an image or visualization to represent this?",
  "Write down everything I know about this topic/concept in as much detail as possible",
];

const memorizeHooks = [
  "Create an acronym",
  "Storage: where & how will this be stored? (e.g. memory palace + location)",
  "Create a story: incorporate senses, emotions, & movement. Make it exaggerated & ridiculous",
];

export const allHooksArray = [
  ...connectHooks,
  ...memorizeHooks,
  ...processHooks,
];

export const allHooksHash = {
  connect: connectHooks,
  memorize: memorizeHooks,
  process: processHooks,
};
