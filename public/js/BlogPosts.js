const newFormHandler = async (event) => {
  event.preventDefault();
// hello
  const title = document.querySelector('#BlogPost-title').value.trim();
  const contents = document.querySelector('#BlogPost-desc').value.trim();

  if (title && contents) {
    const response = await fetch(`/api/blogposts`, {
      method: 'POST',
      body: JSON.stringify({ title, contents, date_created: new Date() }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/blogposts');
    } else {
      alert('Failed to create BlogPost');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/blogposts');
    } else {
      alert('Failed to delete BlogPosts');
    }
  }
};

document
  .querySelector('.new-BlogPost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.BlogPost-list')
  .addEventListener('click', delButtonHandler);
