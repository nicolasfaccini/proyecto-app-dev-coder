import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';
import { useSignUpMutation } from '../services/auth';
import { signupSchema } from '../validations/signupSchema';
import { base_url } from '../database';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const navigation = useNavigation();
    const [triggerSignup] = useSignUpMutation();

    const onSubmit = async () => {
        try {
            signupSchema.validateSync({ email, password, confirmPassword });

            const response = await triggerSignup({ email, password }).unwrap();

            if (!response.localId) {
                setGeneralError("Error al registrarse. Intenta nuevamente.");
                return;
            }

            const userProfile = {
                email: response.email,
                createdAt: new Date().toISOString(),
            };

            await fetch(`${base_url}/users/${response.localId}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile),
            });

            
            navigation.replace("Login");

        } catch (error) {
            if (error.data && error.data.error && error.data.error.message === "EMAIL_EXISTS") {
                setGeneralError("El correo electrónico ya está registrado. Intenta iniciar sesión.");
            } else {
                setGeneralError("Ocurrió un error inesperado. Intenta nuevamente.");
            }
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Registrarme</Text>
                {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}
                <InputForm label="Correo electrónico" value={email} onChangeText={setEmail} isSecure={false} error={emailError} />
                <InputForm label="Contraseña" value={password} onChangeText={setPassword} isSecure={true} error={passwordError} />
                <InputForm label="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} isSecure={true} error={confirmPasswordError} />
                <SubmitButton title="Registrarme" onPress={onSubmit} />
                <Text style={styles.sub}>¿Tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')} style={styles.buttonOutline}>
                    <Text style={styles.subLink}>Iniciar sesión</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: 'white',
        gap: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Pacifico',
        color: colors.primary,
    },
    sub: {
        fontSize: 14,
        fontFamily: 'Poppins',
        color: colors.primary,
    },
    buttonOutline: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    subLink: {
        fontSize: 14,
        fontFamily: "Poppins",
        color: colors.primary,
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    }
});
