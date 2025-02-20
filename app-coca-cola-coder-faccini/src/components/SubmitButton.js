import { StyleSheet, Text, Pressable } from 'react-native';
import { colors } from '../globals/colors';

const SubmitButton = ({ title, onPress, disabled = false }) => {
return (
    <Pressable 
    style={[styles.button, disabled && styles.buttonDisabled]} 
    onPress={!disabled ? onPress : null}
    >
    <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
    </Text>
    </Pressable>
);
};

export default SubmitButton;

const styles = StyleSheet.create({
button: {
    minWidth: "60%",
    backgroundColor: colors.accent,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
},
buttonDisabled: {
    backgroundColor: "#ccc",
},
text: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins",
},
textDisabled: {
    color: "#888",
},
});
