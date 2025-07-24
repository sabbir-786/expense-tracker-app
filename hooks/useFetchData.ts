import { useEffect, useState } from 'react';
import {
    collection,
    query,
    onSnapshot,
    QueryConstraint,
    DocumentData,
} from 'firebase/firestore';
import { firestore } from '@/config/firebase';

function useFetchData<T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!collectionName) return;

        const collectionRef = collection(firestore, collectionName);
        const safeConstraints = constraints.filter(Boolean); // filter out undefined/null
        const q = query(collectionRef, ...safeConstraints);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const fetchedData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as T),
                }));
                setData(fetchedData);
                setLoading(false);
            },
            err => {
                console.error('Error fetching data: ', err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe(); // Clean up on unmount
    }, [collectionName, ...constraints]);

    return { data, loading, error };
}

export default useFetchData;
