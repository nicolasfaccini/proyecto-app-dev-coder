import { object, string } from 'yup';

export const loginSchema = object({
    password: string()
        .required("Contraseña incorrecta")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "La contraseña debe tener al menos una letra mayúscula, una minúscula y un número"),

    email: string()
        .email("El correo electrónico no es válido")
        .required("Correo electrónico incorrecto"),
});
