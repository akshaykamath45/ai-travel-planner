import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firbaseConfig';

export const savePlaceFeedback = async (placeData) => {
  try {
    const docRef = await addDoc(collection(db, 'placeFeedback'), {
      ...placeData,
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving feedback:', error);
    return { success: false, error };
  }
};

export const getPlaceFeedback = async (placeName, userEmail) => {
  try {
    const q = query(
      collection(db, 'placeFeedback'),
      where('placeName', '==', placeName),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting feedback:', error);
    return [];
  }
};