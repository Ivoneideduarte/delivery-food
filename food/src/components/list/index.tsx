import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { RestaurantItem } from './item';

export interface RestaurantsProps {
    id: string;
    name: string;
    image: string;
}

export function RestaurantVerticalList() {
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
        <View className='px-4 flex-1 w-full h-full mb-11 gap-4'>
            {restaurants.map( item => (
                <RestaurantItem item={item} key={item.id} />
            ))}
        </View>
    );
}