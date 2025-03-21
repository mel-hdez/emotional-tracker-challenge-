import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiLogout,CiBellOn } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";

//icons
const ShareIcon = styled(IoShareSocialOutline)`
  font-size: 1.5rem;
  margin-right: 3px;
  color: #1F5AAE; 
  `;
const EmotionIcon = styled(MdOutlineEmojiEmotions)`
  font-size: 1.5rem;
  margin-right: 3px;
  color: #1F5AAE; 
  `;
  const ReminderIcon = styled(CiBellOn)`
  font-size: 1.5rem;
  margin-right: 3px;
  color: #1F5AAE; 
  `;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #fff;
  background-color: ${props => props.bg || '#ccc'};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BadgeContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressBarFiller = styled.div`
  height: 8px;
  width: ${props => props.percentage || 0}%;
  background-color: #1F5AAE;
  transition: width 0.5s ease-in-out;
`;
const ProgressNumber = styled.span`
  color: #2C3D4F;
`;

const ProgressLabel = styled.p`
  margin-top: 30px;
  color: #2C3D4F;
`;
const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WelcomeCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const WelcomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EstadoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EstadoLabel = styled.span`
  font-size: .8rem;
  color: #2C3D4F;
`;


const EstadoValue = styled.span`
  color: #2C3D4F;
  font-size: .9rem;
  font-weight: bold;
`;

const EstadoIcon = styled(MdOutlineEmojiEmotions)`
  font-size: 3rem;
  color: #2c3e50; 
  background-color: #baffc9;
  border-radius: 50%;
  padding: 4px;
`;

const EstadoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EstadoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EstadoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


const Title = styled.h1`
  color: #1F5AAE;
  margin-top: 0;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  margin-bottom: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  align-items: stretch;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  gap: 1rem;
`;

const CardTitle = styled.p`
  color: #2c3e50;
  margin-top: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem; 
`;

const CardText = styled.p`
  color: #7f8c8d;
  margin: 0;
`;

const CardLink = styled.a`
  background-color: #1F5AAE;
  border-radius: 5px;
  color: #FFFFFF;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  
  // Basic auth protection
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);
  
  if (loading || !user) {
    return (
      <Layout title="Panel - Terapia Emocional">
        <p>Cargando...</p>
      </Layout>
    );
  }
  
  return (
    <Layout title="Panel - Terapia Emocional">
      <DashboardContainer>
        <WelcomeCard>
        <WelcomeHeader>
          <Title className='text-blue'>¡Bienvenido, {user.name}!</Title>
          <EstadoBlock>
      <EstadoTextContainer>
        <EstadoLabel>Estado actual:</EstadoLabel>
        <EstadoValue>Equilibrado</EstadoValue>
      </EstadoTextContainer>
      <EstadoIcon />
    </EstadoBlock>
        </WelcomeHeader>
          <Subtitle>Aquí tienes un resumen de tu bienestar emocional</Subtitle>
          <ProgressHeader>
            <ProgressLabel>Bienestar semanal</ProgressLabel>
            <ProgressNumber>{user.progress || 75}%</ProgressNumber>
          </ProgressHeader>
          
          <ProgressBarContainer>
            <ProgressBarFiller percentage={user.progress || 75} />
          </ProgressBarContainer>
        </WelcomeCard>
        
        <Grid>
          <Card>
            <CardTitle><EmotionIcon/>Seguimiento Emocional</CardTitle>
            <CardText>
              Registra tus emociones diarias y mantén un seguimiento de tu bienestar mental.
            </CardText>
            <BadgeContainer>
              <Badge bg="#ffadad" style={{ color: '#000' }}>Estrés</Badge>
              <Badge bg="#ffecb3" style={{ color: '#000' }}>Ansiedad</Badge>
              <Badge bg="#baffc9" style={{ color: '#000' }}>Calma</Badge>
              <Badge bg="#a0c4ff" style={{ color: '#000' }}>Tristeza</Badge>
              <Badge bg="#d3c0eb" style={{ color: '#000' }}>Alegría</Badge>
            </BadgeContainer>
            <CardLink onClick={() => router.push('/emotions')}>
              Seguimiento de Emociones
            </CardLink>
          </Card>
          
          <Card>
            <CardTitle><ReminderIcon/>Recordatorios</CardTitle>
            <CardText>
              Configura recordatorios para actividades que mejoran tu salud mental.
            </CardText>
            <CardLink onClick={() => router.push('/reminders')}>
              Ver Recordatorios
            </CardLink>
          </Card>
          
          <Card>
            <CardTitle><ShareIcon/>Compartir con Terapeuta</CardTitle>
            <CardText>
              Comparte tus datos de seguimiento emocional con tu terapeuta.
            </CardText>
            <CardLink>
              Ver tu resumen de emociones
            </CardLink>
          </Card>
        </Grid>
        
        {/* TODO: Add charts and statistics */}
      </DashboardContainer>
    </Layout>
  );
}