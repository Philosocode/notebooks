import { THookType } from "hook/hook.types";

interface IHook {
  title: string;
  type: THookType;
}

export const connectHooks: IHook[] = [
  {
    type: "connect",
    title: "Can I think of a simile, analogy, or metaphor?",
  },
  {
    type: "connect",
    title: "What does this remind me of?",
  },
  {
    type: "connect",
    title:
      "Is this my first time encountering this? If not, where have I encountered this before?",
  },
  {
    type: "connect",
    title: "Do I have any personal experience with this?",
  },
  {
    type: "connect",
    title: "How can I apply this to my own life?",
  },
  {
    type: "connect",
    title: "What questions does this raise for me?",
  },
  {
    type: "connect",
    title: "What are some practical / real-world applications of this?",
  },
  {
    type: "connect",
    title: "How would I prove this?",
  },
  {
    type: "connect",
    title: "How would I challenge this?",
  },
  {
    type: "connect",
    title: "What do I know that supports this?",
  },
  {
    type: "connect",
    title:
      "How does this fit in with the rest of what I know about this subject?",
  },
];

export const processHooks: IHook[] = [
  {
    type: "process",
    title: "How do I express this in my own words?",
  },
  {
    type: "process",
    title: "How do I explain this so a 5 year old can understand?",
  },
  {
    type: "process",
    title: "Can I think of (simple) concrete examples for this?",
  },
  {
    type: "process",
    title: "What are the key things I need to remember?",
  },
  {
    type: "process",
    title: "Why is this important?",
  },
  {
    type: "process",
    title: "On a scale from 1-10, how well do I understand this?",
  },
  {
    type: "process",
    title: "What's hard about this? Why are they hard?",
  },
  {
    type: "process",
    title: "How do I feel about this? Is this surprising? Interesting?",
  },
  {
    type: "process",
    title: "Do I agree or disagree? Why?",
  },
  {
    type: "process",
    title:
      "How does this work? Why does it work like this? (repeat multiple times)",
  },
  {
    type: "process",
    title: "Can I create an image or visualization to represent this?",
  },
  {
    type: "process",
    title:
      "Write down everything I know about this topic/concept in as much detail as possible",
  },
];

export const memorizeHooks: IHook[] = [
  {
    type: "memorize",
    title: "Create an acronym",
  },
  {
    type: "memorize",
    title:
      "Storage: where & how will this be stored? (e.g. memory palace + location)",
  },
  {
    type: "memorize",
    title:
      "Create a story: incorporate senses, emotions, & movement. Make it exaggerated & ridiculous",
  },
];

export const allHooks = [...processHooks, ...connectHooks, ...memorizeHooks];
