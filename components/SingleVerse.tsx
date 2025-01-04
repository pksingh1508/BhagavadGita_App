import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CommentaryTypes, SingleVerseProps } from '@/types'
import Colors from '@/constants/Colors'

const SingleVerse = ({ text, verse_number, commentaries}: SingleVerseProps) => {
    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState<any>([]);
    useEffect(() => {
        const filterData = commentaries.filter((commentry: CommentaryTypes) => commentry.language === 'hindi');
        setDescription(filterData);
    }, [])
  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
      <Text style={[styles.text, {color: Colors.orange}]}>श्लोक : {verse_number}</Text>
      <Text style={styles.text}>{text}</Text>
      <Modal
        animationType='slide'
        transparent={false}
        visible={visible}
        onRequestClose={() => {
            setVisible(!visible);
        }}
      >
        <View style={styles.modalContainer}>
            <Text style={styles.modalText}>श्लोक : {verse_number}</Text>
            <FlatList 
                data={description}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.singleDes}>
                        <Text style={styles.singleDesText}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
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
      fontSize: 16,
      fontFamily: 'nm'
    },
    modalContainer: {
      flex: 1, 
      backgroundColor: Colors.background,
      padding: 15,
    },
    modalText: {
        textAlign: 'center',
        color: Colors.orange,
        fontSize: 20,
        fontFamily: 'nb'
    },
    singleDes: {
        backgroundColor: Colors.backgroundFade,
        marginVertical: 12,
        padding: 9,
        borderRadius: 9
    },
    singleDesText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'nm'
    }
});

export default SingleVerse
