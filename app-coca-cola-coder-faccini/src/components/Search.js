import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../globals/colors';
import { useState } from 'react';

const Search = ({ onChangeKeyword }) => {
  const [textInput, setTextInput] = useState('');

  const handleChangeText = (text) => {
    setTextInput(text);
    onChangeKeyword(text); 
  };

  const removeSearch = () => {
    setTextInput('');
    onChangeKeyword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={handleChangeText} 
          placeholderTextColor={colors.lightGray}
          placeholder="Buscar"
        />
        {textInput.length > 0 && (
          <Pressable style={styles.button} onPress={removeSearch}>
            <FontAwesome name="times" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    color: colors.lightGray,
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
  },
});
