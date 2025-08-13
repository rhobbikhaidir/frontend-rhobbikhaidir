import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios'


const api = axios.create({
    baseURL: 'http://202.157.176.100:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

const useGetCountry = (
    config?: Partial<UseQueryOptions>
) => {
    const query = useQuery({
        queryFn: async () => {
            const res = await api.get('/negaras');
            return res.data;
        },
        ...config,
        queryKey: ['data-delta-stepper'],
    });

    return query;
};

export default useGetCountry;


