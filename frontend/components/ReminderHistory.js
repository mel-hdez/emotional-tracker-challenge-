import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ReminderContext } from '../context/ReminderContext';
import { RiDeleteBinLine } from "react-icons/ri";

// Icono de eliminar
const DeleteIcon = styled(RiDeleteBinLine)`
  font-size: 1.5rem;
  margin-bottom: 0.2rem; /* Separación opcional */
`;

const HistoryContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const EmptyState = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
`;

const ReminderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReminderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReminderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ReminderActivity = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #1F5AAE;
`;

const ReminderDateTime = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ReminderNotes = styled.p`
  margin: 0;
  color: #34495e;
`;

const CreatedText = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  padding: 0.2rem;
  background-color: transparent ;
  color: #e74c3c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ReminderHistory = () => {
  const { reminders, loading, getReminders, deleteReminder } = useContext(ReminderContext);
  
  useEffect(() => {
    getReminders();
  }, []);
  

const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "p.m." : "a.m";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minutes} ${ampm}`;
};


  const handleDelete = (id) => {
    deleteReminder(id);
    alert(`Se ha eliminado correctamente su recordatorio`);
  };
  return (
    <HistoryContainer>
      {loading ? (
        <p>Cargando...</p>
      ) : reminders.length === 0 ? (
        <EmptyState>No hay recordatorios registrados aún.</EmptyState>
      ) : (
        <ReminderList>
          {reminders.map((reminder) => (
            <ReminderCard key={reminder.id || reminder._id}>
              <ReminderHeader>
                <TextContainer>
                  <ReminderActivity>{reminder.activity}</ReminderActivity>
                  <CreatedText>Recordatorio a las {formatTime(reminder.time)}</CreatedText>
                </TextContainer>
                <ActionButton onClick={() => handleDelete(reminder.id || reminder._id)}>
                  <DeleteIcon />
                </ActionButton>
              </ReminderHeader>
              {reminder.notes && <p>{reminder.notes}</p>}
            </ReminderCard>
          ))}
        </ReminderList>
      )}
    </HistoryContainer>
  );
};

export default ReminderHistory;
