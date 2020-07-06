<script>
    import PollStore from '../stores/PollStore';
    import { createEventDispatcher } from 'svelte';
    import Button from '../shared/Button.svelte';
    
    let dispatch = createEventDispatcher();
    let fields = { question: '', answerA: '', answerB: '' };
    let errors = { question: '', answerA: '', answerB: '' };
    let valid = false;

    const submitHandler = () => {
        valid = true;
        // Validate Question
        if (fields.question.trim().length < 7) {
            valid = false;
            errors.question = 'Question must be at least 7 characters long';
        } else {
            errors.question = '';
        }
        // Validate Answer A
        if (fields.answerA.trim().length < 1) {
            valid = false;
            errors.answerA = 'First answer cannot be empty';
        } else {
            errors.answerA = '';
        }
        // Validate Answer B
        if (fields.answerB.trim().length < 1) {
            valid = false;
            errors.answerB = 'Second answer cannot be empty';
        } else {
            errors.answerB = '';
        }

        // Add a new poll
        if (valid) {
            let poll = {...fields, votesA: 0, votesB: 0, id: Math.random()}
            // Save poll to store
            PollStore.update((currentPolls) => {
                return [poll, ...currentPolls];
            });
            dispatch('add');
        }
    }
</script>

<form on:submit|preventDefault={submitHandler} autocomplete="off">
    <div class="form-field">
        <label for="question">Poll Question</label>
        <input type="text" id="question" bind:value={fields.question}>
        <div class="error">{ errors.question }</div>
    </div>
    <div class="form-field">
        <label for="answer-a">First Answer</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
        <div class="error">{ errors.answerA }</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Second Answer</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
        <div class="error">{ errors.answerB }</div>
    </div>
    <Button type="secondary" flat={true}>Add Poll</Button>
</form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field {
        margin: 18px auto;

    }
    input {
        width: 100%;
        border-radius: 6px;
    }
    label {
        margin: 10px auto;
        text-align: left;
    }
    .error {
        font-weight: light;
        font-size: 12px;
        color: #d91b42;
    }
    @media only screen and (max-width: 375px) {
        form {
            width: 350px;
        }
        label {
            font-size: 13.5px;
        }
    }
    @media only screen and (max-width: 320px) {
        form {
            width: 280px;
        }
        label {
            font-size: 14px;
        }
        .error {
            font-size: 10px;
        }
    }
</style>