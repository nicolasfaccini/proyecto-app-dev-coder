import { StyleSheet, View, Image } from 'react-native';
import { googleapi } from '../googleApi';

const MapPreview = ({ location }) => {
    if (!location.lat || !location.long) {
        return <View style={styles.imagePlaceholder} />;
    }

    const mapStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?
                            center=${location.lat},${location.long}
                            &zoom=13
                            &size=600x300
                            &maptype=roadmap
                            &markers=color:red%7Clabel:S%7C${location.lat},${location.long}
                            &key=${googleapi}`;

    return (
        <View>
            <Image
                source={{ uri: mapStaticUrl }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    imagePlaceholder: {
        width: 300,
        height: 300,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }
});
