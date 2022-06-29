import { View, ImageBackground, StatusBar, StyleSheet, Dimensions, NativeEventEmitter } from 'react-native'
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoListHolder from '../components/TodoListHolder';
import {useState, useEffect} from 'react'
import {findAll} from '../database/DbUtils'

const MainTodosScreen = ({ navigation }) => {

    // Innehåller en lista med todos
    const [todos, setTodos] = useState([])

    // Skapar event variabel emitter
    const emitter = new NativeEventEmitter()

    
    // Skapar en variabel deleteListenter
    // emitter använder addLister för att hantera delete vid bortagning av i klickad todo
    const deleteListener = emitter.addListener('delete', (todoName) => {
        
        // Letar vad som finns i databasen
        findAll()
             // Hämtat vad som finns i databasen & uppdaterar todo list om resolve(res) annars reject(err)
            .then(res => setTodos(res))
            .catch(err => console.log(err))
    })




// Använder useEffect för att hålla koll på ändringar som gjorts i todo Listan
// findAll metoden för att hitta alla todos
// Returnerar todo listan med senaste förändringar
useEffect(() => {
    findAll()
        .then(res => setTodos(res))
    return () => deleteListener.remove()
}, [])

    return (
        <View style={styles.mainContainer}>
        <ImageBackground
        source={require('../assets/pexels-pixabay-147411.jpg')}
        resizeMode='cover'
        style={styles.imagebackground}
        >
        <Header />
        <TodoInput 
          setTodos={setTodos}
        />
        <TodoListHolder 
         todos={todos}
         navigation={navigation}
        />
      
        <StatusBar style="auto" />
        </ImageBackground>
      </View>


    )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    textinput: {
      backgroundColor: '#FFF',
      width: '70%',
      margin: 20,
      padding: 10, 
      borderRadius: 6
    },
  
    imagebackground: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }
  });
  



export default MainTodosScreen;