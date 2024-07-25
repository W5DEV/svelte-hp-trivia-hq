<script lang='ts'>
    import { writable } from 'svelte/store';
    import QuestionCanvas from '../../lib/QuestionCanvas.svelte';
    import { questions } from '../../store';

  const currentQuestions = $questions;

  type QuestionRecap = {
    questionNumber: number;
    question: string;
    correct_answer: string;
    your_answer: string;
    correct: boolean;
    isLiked: boolean;
  };

  let currentQuestionIndex = 0;
  let numCorrect = 0;
  let numQuestions = currentQuestions.length;
  let questionArray = writable<QuestionRecap[]>([]);

  async function handleAnswer(answer: string) {
    const sortedCorrectAnswers = currentQuestions[currentQuestionIndex].correct_answer.split(',').sort().join(', ');
    const sortedAnswer = answer.split(',').sort().join(', ');
    if (sortedCorrectAnswers === sortedAnswer) {
      numCorrect++;
      await fetch(`https://hp-api.greatidea.dev/api/questions/answer?questionsId=${currentQuestions[currentQuestionIndex].id}&is_correct=true`, {
        method: 'PUT'
        });
    } else {
        await fetch(`https://hp-api.greatidea.dev/api/questions/answer?questionsId=${currentQuestions[currentQuestionIndex].id}&is_correct=false`, {
        method: 'PUT'
        });
    }
    
    questionArray.update(questionArray => [...questionArray, {
        questionNumber: currentQuestionIndex + 1,
        question: currentQuestions[currentQuestionIndex].question,
        correct_answer: sortedCorrectAnswers,
        your_answer: sortedAnswer,
        correct: sortedCorrectAnswers === sortedAnswer,
        isLiked: false
    }]);

    currentQuestionIndex++;

  }

  async function handleLike(question: QuestionRecap) {
        if (question.isLiked) {
            return;
        } else {
            const updatedQuestion = { ...question, isLiked: true };

            questionArray.update(questions => {
                return questions.map(q => q.questionNumber === question.questionNumber ? updatedQuestion : q);
            });

            await fetch(`https://hp-api.greatidea.dev/api/questions/like?questionsId=${currentQuestions[question.questionNumber - 1].id}`, {
                method: 'PUT'
            });
        }
  }
</script>

{#if currentQuestionIndex < currentQuestions.length}
  <QuestionCanvas question={currentQuestions[currentQuestionIndex]} 
    onAnswer={handleAnswer} 
    questionNumber={currentQuestionIndex + 1}
    totalQuestions={numQuestions} />
{:else}
  <div class="flex flex-col items-center justify-start gap-2">
    <h2 class="text-2xl font-semibold text-primary">Quiz Complete</h2>
    <p class="text-lg font-medium text-info">You answered {numCorrect} out of {numQuestions} questions correctly.</p>
    <div class="flex flex-col items-center justify-start w-full gap-3">
        <h2 class="text-xl font-semibold text-primary">Your Answers</h2>
        {#each $questionArray as question}
            <div class="flex flex-col items-start justify-start w-full gap-4 px-8">
                <p class="text-2xl font-medium text-primary front-semibold">{question.questionNumber}. {question.question}</p>
                <p class="text-lg font-medium text-primary">Correct Answer: {question.correct_answer}</p>
                <p class={question.correct ? `text-lg font-medium text-success` : `text-lg font-medium text-error italic line-through`}>Your Answer: {question.your_answer}</p>
                <button on:click={() => handleLike(question)} class={'btn ' + (question.isLiked ? 'btn-success' : 'btn-info')}> 
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg> 
                    Like
                </button>
            </div>
        {/each}
    </div>
    <a href="/quiz-selection" class="btn btn-primary">Back to Quiz Selection</a>
  </div>
{/if}