import { StyleSheet, Text, View } from "react-native";


const Header = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>My Todos!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginTop: 40,
        alignItems: 'center',
        color: '#FFF'
    },
    headerContainer: {
        alignItems: 'center'
    }
})

export default Header;
