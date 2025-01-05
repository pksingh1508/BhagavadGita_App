import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { ChapterResponseProps } from '@/types'
import Colors from '@/constants/Colors'
import Button from './Button'
import { router } from 'expo-router'
import * as Speech from 'expo-speech';
import { FontAwesome5 } from '@expo/vector-icons'

const SingleChapters = ({id, name, name_meaning, chapter_number, verses_count, chapter_summary, chapter_summary_hindi}: ChapterResponseProps) => {
  const [visible, setVisible] = useState(false);
  const [isHindiSpeaking, setIsHindiSpeaking] = useState(false);
  const [isEnglishSpeaking, setIsEnglishSpeaking] = useState(false);
  const verseBtnHandler = async () => {
    const isSpeechInProgress = await Speech.isSpeakingAsync();
    if (isSpeechInProgress) {
      setIsHindiSpeaking(false);
      setIsEnglishSpeaking(false);
      await Speech.stop();
    }
    setVisible(false);
    router.push(`/chapter/${id}`);
  }

  const startHindiSpeaking = async () => {
    setIsEnglishSpeaking(false);
    const isSpeechInProgress = await Speech.isSpeakingAsync();
    
    if (isSpeechInProgress) {
        await Speech.stop();
        setIsHindiSpeaking(false);
    } else {
      setIsHindiSpeaking(true);
        try {
            await Speech.speak(chapter_summary_hindi, {
                language: 'hi-IN',
                pitch: 1,
                rate: 0.75,
                onDone: () => setIsHindiSpeaking(false),
                onError: (error) => {
                    console.log('Error:', error);
                    setIsHindiSpeaking(false);
                }
            });
        } catch (error) {
            console.log('Error:', error);
            setIsHindiSpeaking(false);
        }
    }
  };
  const startEnglishSpeaking = async () => {
    setIsHindiSpeaking(false);
    const isSpeechInProgress = await Speech.isSpeakingAsync();
    
    if (isSpeechInProgress) {
        await Speech.stop();
        setIsEnglishSpeaking(false);
    } else {
        setIsEnglishSpeaking(true);
        try {
            await Speech.speak(chapter_summary, {
                language: 'en',
                pitch: 1,
                rate: 1,
                onDone: () => setIsEnglishSpeaking(false),
                onError: (error) => {
                    console.log('Error:', error);
                    setIsEnglishSpeaking(false);
                }
            });
        } catch (error) {
            console.log('Error:', error);
            setIsEnglishSpeaking(false);
        }
    }
  };

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
            {!isHindiSpeaking ? (
              <TouchableOpacity style={{padding: 7}} onPress={startHindiSpeaking}>
                <FontAwesome5 name="play-circle" size={26} color={Colors.orange} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{padding: 7}} onPress={startHindiSpeaking}>
                <FontAwesome5 name="pause-circle" size={26} color={Colors.orange} />
              </TouchableOpacity>
            )}
            <Text style={styles.summaryText}>{chapter_summary_hindi}</Text>
          </View>
          <View style={styles.modalSummary}>
            {!isEnglishSpeaking ? (
              <TouchableOpacity style={{padding: 7}} onPress={startEnglishSpeaking}>
                <FontAwesome5 name="play-circle" size={26} color={Colors.orange} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{padding: 7}} onPress={startEnglishSpeaking}>
                <FontAwesome5 name="pause-circle" size={26} color={Colors.orange} />
              </TouchableOpacity>
            )}
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
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    summaryText: {
      color: Colors.whiteFade,
      fontSize: 17,
      fontFamily: 'nm'
    }
})

export default SingleChapters;