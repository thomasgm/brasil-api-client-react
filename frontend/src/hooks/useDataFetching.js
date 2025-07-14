// src/hooks/useDataFetching.js
import { useState, useEffect } from 'react';

export function useDataFetching(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost/brasil-api-client/backend/api.php?endpoint=${endpoint}`);
                
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.message || 'Erro na requisição');
                
                setData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}