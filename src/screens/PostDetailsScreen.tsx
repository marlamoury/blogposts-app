import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import api from '../api/api';

// Tipagem das rotas para receber postId
export type PostDetailsRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

interface Props {
  route: PostDetailsRouteProp;
}

export default function PostDetailsScreen({ route }: Props) {
  const { postId } = route.params;
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadPost();
    loadComments();
  }, []);

  const loadPost = async () => {
    try {
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post(`/posts/${postId}/comments`, {
        content: newComment,
      });
      setNewComment('');
      loadComments();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
    }
  };

  return (
    <View style={styles.container}>
      {post && (
        <View style={styles.postContainer}>
          <Text style={styles.author}>{post.user?.name}</Text>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Comentários</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentAuthor}>{item.user?.name}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicione um comentário"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  postContainer: {
    marginBottom: 20,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  commentItem: {
    marginBottom: 10,
    backgroundColor: '#E2E8F0',
    padding: 10,
    borderRadius: 6,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
