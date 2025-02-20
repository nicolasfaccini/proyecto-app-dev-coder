import { object, string, ref } from 'yup';

export const signupSchema = object({
    confirmPassword: string()
        .required("Confirmar la contraseña es requerido")
        .oneOf([ref("password")], "Las contraseñas no coinciden"),

    password: string()
        .required("Contraseña es requerida")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número"),

    email: string()
        .email("El correo electrónico no es válido")
        .required("Correo electrónico requerido"),
});
