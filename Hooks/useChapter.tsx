import axios from "axios";
import { useEffect, useState } from "react"
import { Alert } from "react-native";

export const useChapter = () => {
    const [loading, setLoading] = useState(false);
    const [chapter, setChapter] = useState<any>([]);
    const url = process.env.EXPO_PUBLIC_CHAPTER_URL;

    useEffect(() => {
        async function fetchChapter() {
            setLoading(true);
            try {
                const response = await axios.get(`${url}`, {
                    headers: {
                        'x-rapidapi-key': process.env.EXPO_PUBLIC_API_KEY,
                    }
                });
                setChapter(response.data);
            } catch(err: any) {
                Alert.alert("Some Error Occured while getting all the chapters.", err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchChapter();
    }, [])

    return {loading, chapter};
}