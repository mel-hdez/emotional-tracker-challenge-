import { createContext, useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

// API URL
const API_URL = 'http://localhost:5050/api';

export const ReminderContext = createContext();

export function ReminderProvider({ children }) {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReminders = async()=>{
      try {
        setLoading(true);
        const token = Cookie.get('token')
        if (!token) {
            setReminders([]);
            setLoading(false);
            return;
          }
          
          const res = await axios.get(`${API_URL}/reminders`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setReminders(res.data);
        } catch (error) {
          console.error('Error fetching reminders');
        } finally {
          setLoading(false);
        }
      };

      const addReminder = async (reminderData) => {
        // This will be lost on page refresh
        const newReminder = {
          id: Date.now().toString(),
          ...reminderData,
          date: new Date().toISOString()
        };
        
        setReminders(prev => [newReminder, ...prev]);
        
        const token = Cookie.get('token');
        
        const res = await axios.post(`${API_URL}/reminders`, newReminder,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        console.log(res)
      };

      const deleteReminder = async(reminderId)=>{
        try {
            setLoading(true);
            const token = Cookie.get('token')
            
            await axios.delete(`${API_URL}/reminders/${reminderId}`, {
              headers: {
               Authorization: `Bearer ${token}`
              }
            });

            const newReminders = reminders.filter(rem => (rem._id !== reminderId));
            
            setReminders(newReminders);
          } catch (error) {
            console.error('Error fetching reminders');
          } finally {
            setLoading(false);
          }
        };

  return (
    <ReminderContext.Provider value={{ reminders, loading, getReminders, addReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
}
