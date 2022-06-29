import { NativeEventEmitter, Pressable, StyleSheet, Text, View, Dimensions, ImageBackground } from "react-native"
import { deleteById } from "../database/DbUtils"

const SelectedTodoScreen = ({ route, navigation }) => {

    const { todo } = route.params

    // emitter lyssnar på om en todo ska tas bort
    const emitter = new NativeEventEmitter()


    // onPress anropar funktionen handlePress
    // handlePress tar in ett id från iklickad(selected) todo
    const handlePress = (id) => {

        // deleteById tar bort todo endast i databasen
        deleteById(id)
          // emitter.emit tar bort todo i mobilapplikationen
        .then(res => emitter.emit('delete', todo))

        // Skickar tillbaka användaren till MainTodoScreen
        navigation.goBack()
    }



    return (

// Tar med all information om den selectade todo
 // Kollar om boolean Completed är true med turnery operator Yes : No
      <View style={styles.container}>
      
             <View style={styles.todoinfo}>
               <Text>Title: {todo.title}</Text>
               <Text>Id: {todo.id}</Text>
               <Text>Completed: {todo.isCompleted ? "Yes" : "No"}</Text>
               <Pressable onPress={() => handlePress (todo.id)}>
               <Text> Remove </Text>
               </Pressable>
            </View>
      
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      
    },
    
   /* imagebackground: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },*/
      todoinfo: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, 
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#c1d8f0"
        
      }
})

export default SelectedTodoScreen;
