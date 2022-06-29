import { useNavigation } from '@react-navigation/native'
import { Text, FlatList, Pressable, StyleSheet } from 'react-native'

const TodoListHolder = ({ todos}) => {

  // Skapar variabel för att hantera navigering av olika skärmar
  const navigation = useNavigation()


  // handlepress funktionen körs vid klickande på todo
  // använder navigation.navigate för att välja vilken skärm som ska bytas till
  // navigate tar en todo(property) tillsamans med värdet på todo
  const handlePress = (todo) => {
      navigation.navigate('Modify Todo', { todo: todo })
  }


    
// För varje skapande av todo appliceras en sträng med namnet och title genom {todo.title}
// handlePress skickar iväg den i klickad todo med dess värde till SelectedtodoScreen
const renderTodo = ({item: todo}) => {
    return (
      <Pressable
        onPress={() => handlePress(todo)}
        style={styles.todo}
        >
          <Text>{todo.title}</Text>
      </Pressable>
      
    )
  
  }

    return (
          
      <FlatList 
      // Hämtar ut index på varje todo som läggs till
      // Använder index som key för urskilja varje todo
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(todo, index) => index}

      />
    )
}


const styles = StyleSheet.create({
  todo: {
      margin: 10,
      backgroundColor: '#c1d8f0',
      padding: 10,
      borderRadius: 6,
      width: 200
  }

})





export default TodoListHolder;