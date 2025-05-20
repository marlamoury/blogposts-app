import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../api/api';

interface Post {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
  };
}

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Post[]>([]);

  const loadFavorites = async () => {
    try {
      const response = await api.get('/posts/favorites');
      setFavorites(response.data);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar os favoritos.');
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <Text style={styles.user}>@{item.user.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma publicação favoritada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  user: {
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#475569',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#94A3B8',
  },
});
