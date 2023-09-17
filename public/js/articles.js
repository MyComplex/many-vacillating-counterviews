const handlePostArticleForm = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#post-article-title').value.trim();
    const content = document.querySelector('#post-article-content').value.trim();

    if (title && content) {
        const response = await fetch('/post-article', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('An article post failure has occured.');
        }
    }
};

document.querySelector('#post-article-form').addEventListener('submit', handlePostArticleForm);
