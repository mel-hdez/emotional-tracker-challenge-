import { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { MdDateRange } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { LuMessageCircle } from "react-icons/lu";

//icons
const DateIcon = styled(MdDateRange)`
  font-size: 1.3rem;
  margin-right: 3px;
  color: #1F5AAE;
  `;
const EmotionIcon = styled(GoGraph)`
  font-size: 1.3rem;
  margin-right: 3px;
  color: #1F5AAE;
  `;
  const MessageIcon = styled(LuMessageCircle)`
  font-size: 1.3rem;
  margin-right: 3px;
  color: #1F5AAE;
  `;
const Hero = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.primary ? '#1F5AAE' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#1F5AAE'};
  border: 2px solid #1F5AAE;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : 'rgba(52, 152, 219, 0.1)'};
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 1rem 4rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #1F5AAE;
`;

const Divider = styled.div`
  width: calc(100% + 3rem);
  margin: 0.75rem -1.5rem; 
  border: none;
  border-top: 1px solid #1F5AAE;
  
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
`;

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  
  return (
    <Layout
      title="Terapia Emocional - Seguimiento de tu bienestar mental"
      description="Realiza un seguimiento de tus emociones diarias y mejora tu bienestar mental entre sesiones de terapia."
    >
      <Hero>
        <Title>Seguimiento de tu bienestar emocional</Title>
        <Subtitle>
          Monitorea tus emociones, identifica patrones y comparte descubrimientos con tu terapeuta.
        </Subtitle>
        
        <ButtonGroup>
          {user ? (
            <Button primary onClick={() => router.push('/dashboard')}>
              Ir al Panel
            </Button>
          ) : (
            <>
              <Button primary onClick={() => router.push('/register')}>
                Comenzar
              </Button>
              <Button onClick={() => router.push('/login')}>
                Iniciar Sesión
              </Button>
            </>
          )}
        </ButtonGroup>
      </Hero>
      
      <Features>
        <FeatureCard>
          <FeatureTitle><DateIcon/>Seguimiento Diario</FeatureTitle>
          <Divider />
          <FeatureDescription>
            Registra tus emociones y su intensidad para hacer un seguimiento de tu bienestar mental.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle><EmotionIcon/>Identifica Patrones</FeatureTitle>
          <Divider />
          <FeatureDescription>
            Descubre patrones en tu salud emocional y comprende los desencadenantes.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle><MessageIcon/>Comparte con tu Terapeuta</FeatureTitle>
          <Divider />
          <FeatureDescription>
            Comparte fácilmente tu diario emocional con tu terapeuta para mejorar las sesiones.
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Layout>
  );
}