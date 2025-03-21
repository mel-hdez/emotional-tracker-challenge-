import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { EmotionContext } from '../context/EmotionContext';

const HistoryContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #2c3e50;
`;

const EmptyState = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
`;

const EmotionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmotionCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EmotionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmotionName = styled.span`
  font-weight: bold;
  text-transform: capitalize;
  
  &.happy { color: #27ae60; }
  &.sad { color: #2980b9; }
  &.angry { color: #c0392b; }
  &.anxious { color: #f39c12; }
  &.neutral { color: #7f8c8d; }
`;

const EmotionDate = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const EmotionIntensity = styled.div`
  margin: 0.5rem 0;
  
  span {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
`;

const EmotionNotes = styled.p`
  margin: 0;
  color: #34495e;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const EmotionHistory = () => {
  const { emotions, loading, getEmotions } = useContext(EmotionContext);
  
  // Fetch emotions on component mount
  useEffect( () => {
  getEmotions();
  }, []);
  
  const translateEmotion = (emotion) => {
    const translations = {
      happy: "Feliz",
      sad: "Triste",
      angry: "Enojado",
      anxious: "Ansioso",
      neutral: "Neutral"
    };
    return translations[emotion] || emotion;
  };
  
  return (
    <HistoryContainer>
      <Title>Historial de Emociones</Title>
      
      {loading ? (
        <p>Cargando...</p>
      ) : emotions.length === 0 ? (
        <EmptyState>No hay emociones registradas aún. ¡Comienza a hacer seguimiento de tus emociones arriba!</EmptyState>
      ) : (
        <EmotionList>
          {emotions.map((emotion) => (
            <EmotionCard key={emotion.id || emotion._id}>
              <EmotionHeader>
                <EmotionName className={emotion.emotion}>
                  {translateEmotion(emotion.emotion)}
                </EmotionName>
                <EmotionDate>{formatDate(emotion.date)}</EmotionDate>
              </EmotionHeader>
              
              <EmotionIntensity>
                Intensidad: <span>{emotion.intensity}/10</span>
              </EmotionIntensity>
              
              {emotion.notes && <EmotionNotes>{emotion.notes}</EmotionNotes>}
            </EmotionCard>
          ))}
        </EmotionList>
      )}
    </HistoryContainer>
  );
};

export default EmotionHistory;