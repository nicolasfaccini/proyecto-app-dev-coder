import { StyleSheet, Text, View, TextInput } from 'react-native';
import { colors } from '../globals/colors';

const InputForm = ({ label, value, onChangeText, isSecure, error }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.titleInput}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} style={styles.input} secureTextEntry={isSecure} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
      width: "100%",
  },
  input: {
      width: "90%",
      backgroundColor: "rgba(255,255,255,0.9)", 
      borderWidth: 1,
      borderColor: colors.accent, 
      padding: 12, 
      fontFamily: "Poppins",
      fontSize: 16,
      marginHorizontal: "5%",
      marginVertical: 10,
      borderRadius: 8, 
      color: colors.primary, 
  },
  titleInput: {
      width: "90%",
      marginHorizontal: "5%",
      fontSize: 16,
      fontFamily: "Poppins",
      color: colors.primary, 
  },
  error: {
      fontSize: 14,
      color: "red",
      fontFamily: "Poppins",
      fontStyle: "italic",
      marginLeft: 20,
  }
});

