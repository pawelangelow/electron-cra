let interval;

const makeid = length => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const startWorking = () => {
  if (!interval) {
    interval = setInterval(() => {
      process.send({ message: 'workers-answer', payload: makeid(10) });
    }, 2000);
  }
};

const stopWorking = () => {
  clearInterval(interval);
  interval = null;
};

process.on('message', m => {
  switch (m.message) {
    case 'start-worker': {
      startWorking();
      break;
    }

    case 'stop-worker': {
      stopWorking();
      break;
    }

    default:
      break;
  }
});
