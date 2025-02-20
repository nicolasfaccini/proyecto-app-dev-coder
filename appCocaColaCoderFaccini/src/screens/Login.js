import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../globals/colors';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { loginSchema } from '../validations/loginSchema';
import { deleteSesion, insertSession } from '../config/dbSqlite';
import { base_url } from '../database';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const navigation = useNavigation();
    const [triggerLogin] = useLoginMutation();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            loginSchema.validateSync({ email, password });

            const response = await triggerLogin({ email, password }).unwrap();

            if (!response.localId) {
                setGeneralError("Error al iniciar sesión. Intenta nuevamente.");
                return;
            }

            const userCheck = await fetch(`${base_url}/users/${response.localId}.json`);
            const userData = await userCheck.json();

            if (!userData || userData === null) {
                setGeneralError("Usuario no encontrado. Regístrate nuevamente.");
                return;
            }

            const user = {
                email: response.email,
                idToken: response.idToken,
                localId: response.localId,
            };

            dispatch(setUser(user));
            await deleteSesion();
            await insertSession(user.localId, user.email, user.idToken);

        } catch (error) {
            if (error.data && error.data.error) {
                const firebaseError = error.data.error.message;

                if (firebaseError === "INVALID_PASSWORD") {
                    setPasswordError("Contraseña incorrecta");
                    setEmailError("");
                    setGeneralError("");
                } else if (firebaseError === "EMAIL_NOT_FOUND") {
                    setEmailError("Correo electrónico no registrado");
                    setPasswordError("");
                    setGeneralError("");
                } else {
                    setGeneralError("Ocurrió un error inesperado. Intenta nuevamente.");
                }
            } else {
                setGeneralError("Ocurrió un error inesperado. Intenta nuevamente.");
            }
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Ingresar</Text>
                {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}
                <InputForm label="Correo electrónico" value={email} onChangeText={setEmail} isSecure={false} error={emailError} />
                <InputForm label="Contraseña" value={password} onChangeText={setPassword} isSecure={true} error={passwordError} />
                <SubmitButton onPress={onSubmit} title="Ingresar" />
                <Text style={styles.sub}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')} style={styles.buttonOutline}>
                    <Text style={styles.subLink}>Registrarme</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Login;

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
