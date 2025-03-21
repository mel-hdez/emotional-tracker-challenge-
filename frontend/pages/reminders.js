import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import ReminderTracker from '../components/ReminderTracker';
import ReminderHistory from '../components/ReminderHistory';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { EmotionContext } from '../context/EmotionContext';
import { LuClock4 } from "react-icons/lu";

//icons
const ClockIcon = styled(LuClock4)`
  font-size: 1rem;
  margin-right: 3px;
  `;
  const AddEmotionIcon = styled(IoIosAddCircleOutline)`
  font-size: 1.2rem;
  margin-right: 5px;
  color: #1F5AAE; 
  `;
const HistoryIcon = styled(GoHistory)`
  font-size: 1.2rem;
  margin-right: 5px;
  color: #1F5AAE; 
  `;

const EmotionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const HeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h1`
  color: #1F5AAE;
  margin: 0;
`;

const EmotionText = styled.p`
  color: #7f8c8d;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  background-color: #F1F7FF;
  overflow: hidden;
`;

const ActionButton = styled.button`
  flex: 1;
  font-size: 1rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${props => props.active ? '#FFFFFF' : '#F4F4F5'};
  color: #1F5AAE;
  border: none;
  cursor: pointer;
  transition: background-color .2s;

  &:hover {
    background-color: #FFFFF;
  }
`;


export default function Emotions() {
  const { user, loading } = useContext(AuthContext);
  const {getEmotions} = useContext(EmotionContext);
  const router = useRouter();
  const [view, setView] = useState('tracker');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

 

  if (loading || !user) {
    return (
      <Layout title="Emociones - Terapia Emocional">
        <p>Cargando...</p>
      </Layout>
    );
  }
  return (
    <Layout title="Emociones - Terapia Emocional">
      <EmotionsContainer>
      <HeaderGroup>
        <Title>Recordatorios</Title>
      </HeaderGroup>
        <ButtonGroup>
          <ActionButton 
            active={view === 'tracker'} 
            onClick={() => setView('tracker')}
          >
            <ClockIcon/> Registrar Recordatorio
          </ActionButton>
          <ActionButton 
            active={view === 'history'} 
            onClick={() => setView('history')}
          >
            <ClockIcon/> Recordatorios
          </ActionButton>
        </ButtonGroup>

        {view === 'tracker' && <ReminderTracker />}
{view === 'history' && <ReminderHistory />}
      </EmotionsContainer>
    </Layout>
  );
}
