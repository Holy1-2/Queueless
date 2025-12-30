import React, { createContext, useState, useContext } from 'react';

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [currentQueue, setCurrentQueue] = useState({
    currentNumber: 'A015',
    yourNumber: 'A023',
    peopleAhead: 8,
    estimatedTime: 16,
    service: 'Bank Teller'
  });

  const services = [
    { id: '1', name: 'Bank Teller', waitTime: 2, currentNumber: 'A015', icon: 'bank' },
    { id: '2', name: 'Hospital Doctor', waitTime: 15, currentNumber: 'B042', icon: 'hospital' },
    { id: '3', name: 'Government Office', waitTime: 10, currentNumber: 'C123', icon: 'building' },
    { id: '4', name: 'Post Office', waitTime: 5, currentNumber: 'D087', icon: 'mail' },
  ];

  const takeNumber = (service) => {
    const newNumber = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
      Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    const peopleAhead = Math.floor(Math.random() * 15) + 1;
    const estimatedTime = peopleAhead * service.waitTime;
    
    const updatedQueue = {
      currentNumber: service.currentNumber,
      yourNumber: newNumber,
      peopleAhead,
      estimatedTime,
      service: service.name
    };
    
    setCurrentQueue(updatedQueue);
    return { number: newNumber, estimatedTime };
  };

  return (
    <QueueContext.Provider value={{ currentQueue, services, takeNumber }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};