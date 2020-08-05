import React, { useContext, useEffect } from 'react';

import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { SchoolContext, fetchApi } from '../store/SchoolProvider';

import styles from '../styles';
import Lesson from '../components/Lesson';


const LessonScreen = ({ navigation }) => {

    // ON RECUPERE LE CONTEXTE DANS LEQUEL ON A NOTRE PROVIDER
    // EN FAISANT DE LA DECOMPOSITION value={[state, dispacth]} state et dispatch DE VOTRE useReducer
    const [state, dispatch] = useContext(SchoolContext);

    const { lessons, isLoading, lastIdLesson } = state;

    useEffect(() => {
        const fetchData = async () => {

            dispatch({
                type: "LOADING",
                isLoading: true
            });

            const lessons = await fetchApi('lessons');

            dispatch({
                type: "LOAD_DATA_LESSONS",
                lessons: lessons,
                isLoading: false
            });
        };

        fetchData();

    }, [lastIdLesson]); // on watch le state isLoading

    if ( isLoading )
        return (
            <SafeAreaView style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </SafeAreaView>
        );

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }} >
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Students')}>
                <Text style={styles.buttonText}>Students</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.containerLesson}
                data={lessons}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                   return <Lesson lesson={item} />
                }}
            />
        </SafeAreaView>
    )

}

export default LessonScreen;