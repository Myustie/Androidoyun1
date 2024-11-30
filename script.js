document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    // Yorumları saklayacak basit bir array
    const comments = [];

    // Yeni yorum ekleme
    function addComment(name, text, parentId = null) {
        const commentId = comments.length + 1;
        const newComment = {
            id: commentId,
            name,
            text,
            parentId,
            replies: []
        };

        // Yorum ana mı yoksa bir yanıt mı?
        if (parentId) {
            const parentComment = comments.find(comment => comment.id === parentId);
            parentComment.replies.push(newComment);
        } else {
            comments.push(newComment);
        }

        renderComments();
    }

    // Yorumları ekranda gösterme
    function renderComments() {
        commentList.innerHTML = '';
        comments.forEach(comment => renderComment(comment));
    }

    function renderComment(comment, parentElement = commentList) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p><strong>${comment.name}:</strong> ${comment.text}</p>
            <button class="reply-btn" data-id="${comment.id}">Reply</button>
            <div class="replies"></div>
        `;
        parentElement.appendChild(commentDiv);

        const repliesDiv = commentDiv.querySelector('.replies');
        comment.replies.forEach(reply => renderComment(reply, repliesDiv));

        const replyButton = commentDiv.querySelector('.reply-btn');
        replyButton.addEventListener('click', () => {
            const replyBox = document.createElement('textarea');
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit Reply';
            replyBox.placeholder = 'Your Reply...';
            commentDiv.append(replyBox, submitButton);

            submitButton.addEventListener('click', () => {
                const replyText = replyBox.value.trim();
                if (replyText) {
                    addComment('Anonymous', replyText, comment.id);
                    replyBox.remove();
                    submitButton.remove();
                }
            });
        });
    }

    // Yorum ekleme formunu dinleme
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const text = document.getElementById('comment').value.trim();

        if (name && text) {
            addComment(name, text);
            commentForm.reset();
        }
    });
});
