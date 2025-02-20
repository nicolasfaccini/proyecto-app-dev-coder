import { StyleSheet, View, Image, Text } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useGetUserQuery } from '../services/user';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors } from '../globals/colors';

const MyProfile = () => {
    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId);
    const { data: user, isLoading } = useGetUserQuery({ localId });

    if (isLoading) return <LoadingSpinner />;

    return (
        <View style={styles.container}>
            <Image
                source={user?.image ? { uri: user.image } : require("../../assets/profile_default.png")}
                resizeMode='cover'
                style={styles.image}
            />
            <SubmitButton title="Agregar imagen de perfil" onPress={() => navigation.navigate("ImageSelector")} />
            <SubmitButton title="Agregar localización" onPress={() => navigation.navigate("LocationSelector")} />
            <Text style={styles.addressText}>
                {user?.address ? user.address : "Ubicación no definida"}
            </Text>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 20, 
    },
    image: {
        width: 150,
        height: 150
    },
    addressText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        marginHorizontal: 20, 
        marginTop: 10,
    }
});
