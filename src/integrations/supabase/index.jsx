import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();

export function SupabaseProvider({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// hooks

export const useFetchData = (table, queryKey) => useQuery({
    queryKey: [queryKey],
    queryFn: () => fromSupabase(supabase.from(table).select('*')),
    onError: (error) => {
        console.error(`Error fetching data from ${table}:`, error.message);
    },
});

export const useAddData = (table, queryKey) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newData) => fromSupabase(supabase.from(table).insert(newData)),
        onSuccess: () => {
            queryClient.invalidateQueries([queryKey]);
        },
        onError: (error) => {
            console.error(`Error adding data to ${table}:`, error.message);
        },
    });
};

export const useUpdateData = (table, queryKey) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedData) => fromSupabase(supabase.from(table).update(updatedData).eq('id', updatedData.id)),
        onSuccess: () => {
            queryClient.invalidateQueries([queryKey]);
        },
        onError: (error) => {
            console.error(`Error updating data in ${table}:`, error.message);
        },
    });
};

export const useDeleteData = (table, queryKey) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from(table).delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries([queryKey]);
        },
        onError: (error) => {
            console.error(`Error deleting data from ${table}:`, error.message);
        },
    });
};
