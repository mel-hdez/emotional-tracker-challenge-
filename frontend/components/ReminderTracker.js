import { useState, useContext } from 'react';
import styled from 'styled-components';
import { ReminderContext } from '../context/ReminderContext';

const TrackerContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #1F5AAE;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #34495e;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
`;

const Button = styled.button`
  background-color: #1F5AAE;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  cursor: pointer;

  &:hover { background-color: #2980b9; }
`;

export default function ReminderTracker() {
  const { addReminder } = useContext(ReminderContext);
  const [form, setForm] = useState({
    activity: '',
    schedule: 'onetime',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = ({ target: { name, value } }) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    addReminder({
      activity: form.activity,
      schedule: form.schedule,
      date: form.schedule === 'onetime' ? form.date : null,
      time: form.time,
      notes: form.notes.trim()
    });
    setForm({ activity:'', schedule:'onetime', date:'', time:'', notes:'' });
  };

  return (
    <TrackerContainer>
      <Title>Agregar Recordatorio</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Actividad</Label>
          <Input 
            name="activity"
            value={form.activity}
            onChange={handleChange}
            required 
          />
        </InputGroup>

        <InputGroup>
          <Label>Frecuencia</Label>
          <Select name="schedule" value={form.schedule} onChange={handleChange}>
            <option value="onetime">Única vez</option>
            <option value="daily">Diario</option>
          </Select>
        </InputGroup>

        {form.schedule === 'onetime' && (
          <InputGroup>
            <Label>Fecha</Label>
            <Input type="date" name="date" value={form.date} onChange={handleChange} required />
          </InputGroup>
        )}

        <InputGroup>
          <Label>Hora</Label>
          <Input type="time" name="time" value={form.time} onChange={handleChange} required />
        </InputGroup>

        <Button type="submit">Guardar Recordatorio</Button>
      </Form>
    </TrackerContainer>
  );
}
