import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Country, Harbor, Product } from '../model/types';


const api = axios.create({
    baseURL: 'http://202.157.176.100:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const useGetCountry = (
    config?: Partial<UseQueryOptions<AxiosResponse<Country[]>>>
) => {
    return useQuery<AxiosResponse<Country[]>>({
        queryKey: ['list-country'],
        queryFn: async () => {
            const res = await api.get<Country[]>('/negaras');
            return res;
        },
        ...config,
    });
};


export const useGetHarbor = ({
    onSuccess = () => { },
    onError = () => { },
}) => {
    const mutation = useMutation({
        mutationFn: async (id_negara: number) => {
            const filter = {
                where: { id_negara },
            };
            const res: AxiosResponse<Harbor[]> = await api.get("/pelabuhans", {
                params: {
                    filter: JSON.stringify(filter),
                },
            });

            return res.data;
        },
        onError: () => {
            onError();
        },
        onSuccess: () => {
            onSuccess();
        },
    });

    return mutation;
};

export const useGetProduct = ({
    onSuccess = () => { },
    onError = () => { },
}) => {
    const mutation = useMutation({
        mutationFn: async (id_negara: number) => {
            const filter = {
                where: { id_negara },
            };
            const res: AxiosResponse<Product[]> = await api.get("/barangs", {
                params: {
                    filter: JSON.stringify(filter),
                },
            });

            return res.data;
        },
        onError: () => {
            onError();
        },
        onSuccess: () => {
            onSuccess();
        },
    });

    return mutation;
};