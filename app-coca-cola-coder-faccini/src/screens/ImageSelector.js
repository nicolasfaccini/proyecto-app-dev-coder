import { StyleSheet, View, Image } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { usePatchImageProfileMutation } from '../services/user';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ImageSelector = () => {
  const localId = useSelector(state => state.user.localId);
  const [image, setImage] = useState('');
  const [triggerAddImageProfile] = usePatchImageProfileMutation();
  const navigation = useNavigation();

  const pickImage = async (method) => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return;

    const config = {
      aspect: [1, 1],
      quality: 0.2,
      base64: true,
      allowsEditing: true,
    };

    const result = method === "camera" 
      ? await ImagePicker.launchCameraAsync(config) 
      : await ImagePicker.launchImageLibraryAsync(config);

    if (!result.canceled && result.assets.length > 0) {
      setImage(`data:image/jpg;base64,${result.assets[0].base64}`);
    }
  };

  const confirmImage = async () => {
    if (!image) return;
    await triggerAddImageProfile({ localId, image });
    navigation.navigate("MyProfile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={image ? { uri: image } : require("../../assets/profile_default.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <SubmitButton title="Tomar Imagen con cámara" onPress={() => pickImage("camera")} />
      <SubmitButton title="Seleccionar Imagen de galería" onPress={() => pickImage("gallery")} />
      <SubmitButton title="Confirmar" onPress={confirmImage} />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignItems: "center",
    gap: 20
  },
  containerImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
  }
});
