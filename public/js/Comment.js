const newFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#Comment-description').value.trim();
  
    if (description) {
      const response = await fetch(`/api/Comment`, {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/comment');
      } else {
        alert('Failed to create Comment');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/Comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/Comment');
      } else {
        alert('Failed to delete Comment');
      }
    }
  };
  
  document
    .querySelector('.new-Comment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.Comment-list')
    .addEventListener('click', delButtonHandler);
  