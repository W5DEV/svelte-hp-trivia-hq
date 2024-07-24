import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Question = {
	id: string;
	question: string;
	answers: string[];
	source: string;
	tags: string[];
	type: string;
	difficulty: string;
	correct_answer: string;
	question_origin: string;
	completed: string;
	updated_at: string;
	created_at: string;
};

export const token = writable((browser && localStorage.getItem('token')) || '');
token.subscribe((val) => {
	if (browser) return (localStorage.token = val);
});

export const current_question = writable<Question | null>(null);
current_question.subscribe((val) => {
	if (browser) return (localStorage.current_question = JSON.stringify(val));
});
