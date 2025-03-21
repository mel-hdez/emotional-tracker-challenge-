import { createContext, useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

// API URL
const API_URL = 'http://localhost:5050/api';

export const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all emotions (client-side only, not using getServerSideProps)
  // TODO: Implement server-side fetching
  const getEmotions = async () => {
    try {
      setLoading(true);
      const token = Cookie.get('token');
      
      if (!token) {
        setEmotions([]);
        setLoading(false);
        return;
      }
      
      const res = await axios.get(`${API_URL}/emotions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setEmotions(res.data);
    } catch (error) {
      console.error('Error fetching emotions');
    } finally {
      setLoading(false);
    }
  };

  // Add a new emotion entry (frontend only, not connected to backend)
  const addEmotion = async (emotionData) => {
    // This will be lost on page refresh
    const newEmotion = {
      id: Date.now().toString(),
      ...emotionData,
      date: new Date().toISOString()
    };
    
    setEmotions(prev => [newEmotion, ...prev]);
    
    const token = Cookie.get('token');
    
    const res = await axios.post(`${API_URL}/emotions`, newEmotion,{
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    console.log(res)
  };

  const shareWithTherapist = async (emotionIds) => {
    // TODO: Implement sharing with therapist
    console.log('Sharing emotions with therapist:', emotionIds);
  };

  return (
    <EmotionContext.Provider
      value={{
        emotions,
        loading,
        getEmotions,
        addEmotion,
        shareWithTherapist
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};