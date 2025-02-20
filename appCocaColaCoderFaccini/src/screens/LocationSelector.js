import { StyleSheet, Text, View } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import MapPreview from '../components/MapPreview';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { googleapi } from '../googleApi';
import { useSelector } from 'react-redux';
import { usePatchLocationMutation } from '../services/user';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../globals/colors';

const LocationSelector = () => {
    const navigation = useNavigation();
    const localId = useSelector(state => state.user.localId);
    const [triggerLocation] = usePatchLocationMutation();
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') return;

                const newLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation({
                    lat: newLocation.coords.latitude,
                    long: newLocation.coords.longitude
                });
            } catch (error) {
                setAddress("Error al obtener la ubicación.");
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (location) {
                try {
                    const urlReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${googleapi}`;
                    const response = await fetch(urlReverseGeocoding);
                    const data = await response.json();

                    if (data.results && data.results.length > 0) {
                        setAddress(data.results[0].formatted_address);
                    } else {
                        setAddress('Dirección no encontrada');
                    }
                } catch (error) {
                    setAddress('Error al obtener la dirección');
                }
            }
        })();
    }, [location]);

    const handleConfirmLocation = () => {
        if (!location || !address) return;
        triggerLocation({ localId, address, location });
        navigation.navigate('MyProfile');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.addressText}>{address || 'Buscando...'}</Text>
            {location ? <MapPreview location={location} /> : <Text>Cargando mapa...</Text>}
            <SubmitButton title="Confirmar Ubicación" onPress={handleConfirmLocation} disabled={!location || !address} />
        </View>
    );
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        alignItems: 'center',
        gap: 15,
        paddingHorizontal: 20, 
    },
    addressText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        marginHorizontal: 20, 
    }
});
