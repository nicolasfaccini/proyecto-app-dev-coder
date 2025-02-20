import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors } from '../globals/colors';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.lightGray} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
    zIndex: 1000,
  },
});
