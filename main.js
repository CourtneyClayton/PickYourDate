
import React, { useState } from 'https://esm.sh/react'
import ReactDOM from 'https://esm.sh/react-dom'

const Button = (props) => <button {...props}>{props.children}</button>;

const data = [
  {
    name: "Trip's Diner",
    type: "Restaurant",
    hours: { mon: [7, 21], tue: [7, 21], wed: [7, 21], thu: [7, 21], fri: [7, 21], sat: [7, 21], sun: [7, 15] },
    address: "6416 N Florida Ave, Tampa, FL 33604"
  },
  {
    name: "Hillsborough River State Park",
    type: "Activity",
    hours: { mon: [8, 19.75], tue: [8, 19.75], wed: [8, 19.75], thu: [8, 19.75], fri: [8, 19.75], sat: [8, 19.75], sun: [8, 19.75] },
    address: "15402 US-301, Thonotosassa, FL 33592"
  }
];

function App() {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);

  const getDayKey = dateStr => ['sun','mon','tue','wed','thu','fri','sat'][new Date(dateStr).getDay()];

  const handleFind = () => {
    const hour = parseInt(time.split(':')[0]);
    const filtered = data.filter(item => {
      if (item.type !== choice) return false;
      const hours = item.hours[getDayKey(date)];
      return hour >= hours[0] && hour <= hours[1];
    });
    const match = filtered[Math.floor(Math.random() * filtered.length)];
    setResult(match);
    setStep(4);
  };

  const calendarLink = () => {
    const start = date.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';
    const endHour = String(parseInt(time.split(':')[0]) + 2).padStart(2, '0');
    const end = date.replace(/-/g, '') + 'T' + endHour + time.split(':')[1] + '00';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(result.name)}&location=${encodeURIComponent(result.address)}&dates=${start}/${end}`;
  };

  return (
    <div>
      {step === 0 && <>
        <h1>Hey Rich, do you want to go on a date?</h1>
        <Button onClick={() => setStep(1)}>Start</Button>
      </>}
      {step === 1 && <>
        <h2>Pick one:</h2>
        <Button onClick={() => { setChoice('Restaurant'); setStep(2); }}>Restaurant</Button>
        <Button onClick={() => { setChoice('Activity'); setStep(2); }}>Activity</Button>
        <Button onClick={() => setStep(0)}>Start Over</Button>
      </>}
      {step === 2 && <>
        <h2>Pick a date:</h2>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        {date && <Button onClick={() => setStep(3)}>Next</Button>}
        <Button onClick={() => setStep(1)}>Back</Button>
      </>}
      {step === 3 && <>
        <h2>Pick a time:</h2>
        <input type="time" onChange={(e) => setTime(e.target.value)} />
        {time && <Button onClick={handleFind}>Find Me a Date</Button>}
        <Button onClick={() => setStep(2)}>Back</Button>
      </>}
      {step === 4 && result && <>
        <h2>Here’s your plan:</h2>
        <p><strong>{result.name}</strong></p>
        <p>{result.address}</p>
        <a href={calendarLink()} target="_blank" rel="noreferrer">
          <Button>Add to Calendar</Button>
        </a>
        <Button onClick={() => setStep(0)}>Start Over</Button>
      </>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
