function fetchURL(url) {
    fetch(url)
        .then(response => {
          console.log(`Time: (${thenCouter + 1}/${_fetchTime}); response code: ${response.status};`);
          thenCouter++;
          if(fetchCounter === 0) thenCouter = fetchCounter;
        })
        .catch(error => {
          console.log(`Time: (${thenCouter + 1}/${_fetchTime}); response code: Promise rejected;`);
          thenCouter++;
        });
  }
  
  
  const url = 'http://fail2ban.local/';
  let fetchCounter = 0;
  let thenCouter = 0;  // counted after request is responsed.
  const _fetchTime = 30; // amount of fetch times will be exected
  const _intervalTime = 500; // <number> ms
  
  const fetchInterval = setInterval(() => {
    fetchURL(url);
    fetchCounter++;
  
    if (fetchCounter === _fetchTime) {
        clearInterval(fetchInterval);
        fetchCounter = 0;
    }
  }, _intervalTime);