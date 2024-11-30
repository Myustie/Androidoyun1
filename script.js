document.addEventListener('DOMContentLoaded', () => {
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const replyBox = document.createElement('textarea');
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit Reply';
            button.parentElement.append(replyBox, submitButton);

            submitButton.addEventListener('click', () => {
                const replyText = replyBox.value.trim();
                if (replyText) {
                    const replyDiv = document.createElement('p');
                    replyDiv.innerHTML = `<strong>You:</strong> ${replyText}`;
                    button.nextElementSibling.append(replyDiv);
                    replyBox.remove();
                    submitButton.remove();
                }
            });
        });
    });
});
