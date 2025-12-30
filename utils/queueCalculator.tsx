export const calculateWaitTime = (peopleAhead, avgTimePerPerson) => {
  return peopleAhead * avgTimePerPerson;
};

export const generateQueueNumber = (servicePrefix = 'A') => {
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${servicePrefix}${randomNum}`;
};

export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
};

export const getNextNumber = (currentNumber) => {
  const prefix = currentNumber.charAt(0);
  const number = parseInt(currentNumber.slice(1));
  return `${prefix}${(number + 1).toString().padStart(3, '0')}`;
};