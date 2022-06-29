import { Text, TextInput, StyleSheet, View, Button, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native'
import { useState } from 'react'
import Todo from '../models/Todo'
import { findAll, insert } from '../database/DbUtils'


const TodoInput = ({setTodos}) => {

    
const [textInputValue, setTextInputValue] = useState('')



// Funktionen hanterar förändringar vid inskrivning av text i input fälten
const handleTextChange = (newText) =>{
    setTextInputValue(newText)
    
   
  }


  
// Lägger till en ny todo i listan av todos
const handleAdd = () => {
    const todo = new Todo(0, textInputValue, false)
    insert(todo)
        .then(res => {
            console.log("insert result", res)

            // findAll skickas med i resolve callbacken för att hämta listans innehåll
            return findAll()
        })
        .then(res => setTodos(res))
        .catch(err => console.log(err))

}


    // Hanterar ändring av text i inmatningsfältet
    // onChangeText triggas och skickar ett event med textInputValue till handleTextChange 
    // handleTextChange kan välja att lägga till nya värdet
    return (
        <View style={styles.inputcontainer}>
            <TextInput
                style={styles.textinput}
                onChangeText={handleTextChange}
                value={textInputValue}
            />

            <Pressable
            // Hanterar onPress handleAdd  med en BOOLEAN (pressed)
            // BOOLEAN {pressed} används i kombination med turnery operator
            // Turnery operaton gör att ifall addButton är i klickad får knappen 0.5 opacity annars blir opacity 1.0
            
                onPress={handleAdd}
                style={({ pressed }) => [styles.addbutton, { opacity: pressed ? 0.5 : 1.0 }]}
            >
                <Text style={styles.buttontext}>Add Todo</Text>
            </Pressable>
        </View>
)

}


const styles = StyleSheet.create({

    inputcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    addbutton: {
        backgroundColor: 'dodgerblue',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
    },

    textinput: {
        backgroundColor: '#c1d8f0',
        width: '70%',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    buttontext: {
        color: '#FFF'
    }


});


export default TodoInput;