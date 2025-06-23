import React, { useState } from 'react';

export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const events = [
    { id: 1, title: 'Team Standup', time: '09:00', date: '2024-12-23' },
    { id: 2, title: 'Project Review', time: '14:00', date: '2024-12-23' },
    { id: 3, title: 'Client Meeting', time: '16:00', date: '2024-12-24' },
  ];

  return (
    <div className="tamly-page">
      <h2>Task Calendar</h2>
      <p>Schedule and track your tasks and meetings.</p>
      
      <div className="calendar-container">
        <div className="calendar-header">
          <h3>December 2024</h3>
          <div className="calendar-nav">
            <button>←</button>
            <button>→</button>
          </div>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-day-header">Sun</div>
          <div className="calendar-day-header">Mon</div>
          <div className="calendar-day-header">Tue</div>
          <div className="calendar-day-header">Wed</div>
          <div className="calendar-day-header">Thu</div>
          <div className="calendar-day-header">Fri</div>
          <div className="calendar-day-header">Sat</div>
          
          {Array.from({ length: 31 }, (_, i) => (
            <div 
              key={i + 1} 
              className={`calendar-day ${i + 1 === 23 ? 'today' : ''}`}
            >
              {i + 1}
              {(i + 1 === 23 || i + 1 === 24) && (
                <div className="event-indicator"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="events-list">
          <h4>Upcoming Events</h4>
          {events.map(event => (
            <div key={event.id} className="event-item">
              <div className="event-time">{event.time}</div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-date">{event.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 