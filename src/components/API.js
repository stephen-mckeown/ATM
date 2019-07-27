


export const fetchPin = (url = '', data = {}) => {
  
  // Default options are marked with *
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', 
    referrer: 'no-referrer', 
    body: JSON.stringify(data), 
  })
    .then(response => 
    {
      return response}); 
}