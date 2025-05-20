import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import api from '../api/api';

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

interface Props {
  route: UserProfileRouteProp;
}

export default function UserProfileScreen({ route }: Props) {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    loadUser();
    loadUserPosts();
  }, []);

  const loadUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    }
  };

  const loadUserPosts = async () => {
    try {
      const response = await api.get(`/users/${userId}/posts`);
      setPosts(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as postagens do usuário.');
    }
  };

  if (!user) return <Text style={styles.loading}>Carregando perfil...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>@{user.username}</Text>
      <Text style={styles.info}>{user.email}</Text>
      <Text style={styles.info}>{user.phone}</Text>
      <Text style={styles.info}>{user.company?.name}</Text>

      <Text style={styles.postsTitle}>Postagens</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text numberOfLines={2}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flex: 1,
  },
  loading: {
    padding: 20,
    fontSize: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    color: '#475569',
    marginBottom: 4,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  postItem: {
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
