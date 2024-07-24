import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EventForm from './componets/EventForm';
import EventList from './componets/EventList';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/add-event" element={<EventForm />} />
        <Route path="/edit-event/:id" element={<EventForm />} />
        <Route path="/events" element={<EventList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
