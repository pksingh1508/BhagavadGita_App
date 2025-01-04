import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ChapterResponseProps } from '@/types'
import Colors from '@/constants/Colors'
import Button from './Button'
import { router } from 'expo-router'

const SingleChapters = ({id, name, name_meaning, chapter_number, verses_count, chapter_summary, chapter_summary_hindi}: ChapterResponseProps) => {
  const [visible, setVisible] = useState(false);
  const verseBtnHandler = () => {
    setVisible(false);
    router.push(`/chapter/${id}`);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
      <Text style={[styles.text, {color: Colors.orange}]}>Chapter : {chapter_number}</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Name Meaning: {name_meaning}</Text>
      <Text style={styles.text}>कुल श्लोक : {verses_count}</Text>
      <Modal
        animationType='slide'
        visible={visible}
        transparent={false}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <ScrollView style={styles.modalContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.modalChapterText}>Chapter : {chapter_number}</Text>
          <Text style={styles.modalChapterName}>{name}</Text>
          <Text style={styles.modalChapterName}>{name_meaning}</Text>
          <View style={styles.modalSummary}>
            <Text style={styles.summaryText}>{chapter_summary_hindi}</Text>
          </View>
          <View style={styles.modalSummary}>
            <Text style={styles.summaryText}>{chapter_summary}</Text>
          </View>
          <View style={{marginVertical: 20}}>
            <Button title='सभी श्लोक देखें' onPress={verseBtnHandler}/>
            <Button title='See All Verses' onPress={verseBtnHandler}/>
          </View>
        </ScrollView>
      </Modal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.background,
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 9,
        marginVertical: 7,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: Colors.backgroundFade,
        elevation: 4
    },
    text: {
      color: Colors.white,
      fontSize: 18,
      fontFamily: 'nm'
    },
    modalContainer: {
      flex: 1, 
      backgroundColor: Colors.background,
      padding: 15
    },
    modalHeading: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalChapterText: {
      color: Colors.orange,
      fontSize: 20,
      fontFamily: 'pb',
      textAlign: 'center',
      paddingVertical: 9
    },
    modalChapterName: {
      color: Colors.white,
      fontSize: 20,
      fontFamily: 'nb',
      textAlign: 'center',
      paddingVertical: 8
    },
    modalSummary: {
      backgroundColor: Colors.backgroundFade,
      padding: 10,
      borderRadius: 8,
      marginVertical: 10
    },
    summaryText: {
      color: Colors.whiteFade,
      fontSize: 17,
      fontFamily: 'nm'
    }
})

export default SingleChapters;