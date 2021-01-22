import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {

  const [term, setTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api?i=' + term.toLowerCase();
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setRecipes(data.results);
    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
    console.log(url)
    console.log(recipes)
  }
  
    const listSeparator = () => {
      return (
        <View
        style={{
          height: 1,
          width: '80%',
          backgroundColor: '#fff',
          marginLeft: '10%'
        }}></View>
      );
    };
  
  return (
    <View style={styles.container}>
      <FlatList keyExtractor={item => item.id} 
      renderItem={({ item }) => <Text>{item.title} <Image style={{width:100,height:100}} source= {{uri: item.thumbnail}}></Image></Text>}
      ItemSeparatorComponent={listSeparator}
      data={recipes}></FlatList>
      <View style= {{margin:10}}> 
        <TextInput
        style={{borderWidth:1, borderColor:'black', width:150}}
        value={term}
        onChangeText={(term) => setTerm(term)}></TextInput>
      </View>
      <View style={{width:50, margin:10}}>
      <Button title="Find" onPress={getRecipes}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
