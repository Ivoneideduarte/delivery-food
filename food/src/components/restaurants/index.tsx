import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { RestaurantItem } from './horizontal'

export interface RestaurantsProps {
    id: string;
    name: string;
    image: string;
}


export function Restaurants() {

    const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([])

    useEffect(() => {
        async function getFoods() {
            try {
                const response = await fetch('http://192.168.100.11:3000/restaurants');
                const data = await response.json(); // <-- CORREÇÃO
                console.log('Dados recebidos:', data);
                setRestaurants(data);
            } catch (error) {
                console.error('Erro ao buscar os alimentos:', error);
            }
        }

        getFoods();
    }, []);

    return (
        <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantItem item={item} />} // <-- Enviando o item corretamente
            horizontal={true}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />
    );
}