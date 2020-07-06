import { writable } from 'svelte/store';

const PollStore = writable([
    {
        id: 1,
        question: 'Python or JavaScript?',
        answerA: 'Python',
        answerB: 'JavaScript',
        votesA: 7,
        votesB: 23,
    },
    {
        id: 4,
        question: 'Theory or Practical?',
        answerA: 'Theory',
        answerB: 'Practical',
        votesA: 31,
        votesB: 11,
    },
]);

export default PollStore;