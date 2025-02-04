import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [errorInput, setErrorInput] = useState('');

  const addItem = () => {
    if (newItem.trim() === '') {
      setErrorInput('El campo no puede estar vacío');
      return;
    }
    setItems([...items, newItem]);
    setNewItem('');
    setErrorInput('');
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={newItem}
          onChangeText={setNewItem}
          style={styles.input}
          placeholder="Ingrese item"
          placeholderTextColor="#fff"
        />
        <Pressable onPress={addItem} style={styles.button}>
          <Text style={styles.textButton}>+</Text>
        </Pressable>
      </View>
      {errorInput ? <Text style={styles.errorText}>{errorInput}</Text> : null}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.textCard}>{item}</Text>
          </View>
        )}
      />
      <Pressable onPress={clearAll} style={styles.clearButton}>
        <Text style={styles.textClearButton}>Borrar Todo</Text>
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 20,
    color: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  textCard: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  textClearButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});