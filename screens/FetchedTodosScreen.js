import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


const FetchedTodosScreen = () => {

    const [fetchedTodos, setFetchedTodos] = useState([])


    useEffect(() => {
        // Hämtar data från jsonplaceholder sidan
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")

        // converterar data från javascript till json data format
            .then(res => res.json())
            .then(res => setFetchedTodos(res))
    }, [])

    // RenderFetchedTodo tar in todo som representerar item
    const renderFetchedTodo = ({ item: todo }) => {

       
        return (    
        //Representerar hur varje Fechedtodo ska visas i applikationen
            <View style={styles.todo} >
                <Text>Title: {todo.title}</Text>
                <Text>Id: {todo.id}</Text>
                <Text>Completed: {todo.completed ? "Yes" : "No"}</Text>
            </View>
        )
    }

    return (
        
        <View style={styles.container}>
            <FlatList
                data={fetchedTodos}
                keyExtractor={(item) => item.id}
                renderItem={renderFetchedTodo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todo: {
        borderBottomColor: 'black',
        borderBottomWidth: 1.0
    }
})

export default FetchedTodosScreen;
