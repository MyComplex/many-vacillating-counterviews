const logoff = async () => {
    const response = await fetch('/api/user/logoff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('A log off failure has occurred.');
    }
  };
  
  document.querySelector('#logoff').addEventListener('click', logoff);
  