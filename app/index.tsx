import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useChapter } from '@/Hooks/useChapter'
import SingleChapters from '@/components/SingleChapters';
import Colors from '@/constants/Colors';

export default function MainPage() {
    const { loading, chapter } = useChapter();
    if(loading) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator size='large' color={Colors.orange}/>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <FlatList 
            data={chapter}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <SingleChapters {...item}/>
            )}
            showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingVertical: 10
    },
    activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundFade
    }
})