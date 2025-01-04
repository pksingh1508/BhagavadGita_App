import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import Colors from '@/constants/Colors';
import SingleVerse from '@/components/SingleVerse';

const SingleChapter = () => {
  const { chapterId } = useLocalSearchParams();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getChapterData() {
      setLoading(true);
      try {
        const response = await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterId}/verses/`, {
          headers: {
            'x-rapidapi-key': process.env.EXPO_PUBLIC_API_KEY,
          }
        });
        setData(response.data);
      } catch(err) {
        Alert.alert("Something went wrong while getting the chapter data");
      } finally {
        setLoading(false);
      }
    }
    getChapterData();
  }, [])

  if(loading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size='large' color={Colors.orange}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: `Chapter : ${chapterId}`
      }} />
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <SingleVerse {...item}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    text: {
        fontSize: 24,
        marginBottom: 20
    },
    activity: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.backgroundFade
    }
})

export default SingleChapter