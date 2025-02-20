import { StyleSheet, View } from 'react-native';

const ShadowCard = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default ShadowCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", 
    shadowColor: "black", 
    shadowOffset: {
      width: 2, 
      height: 4, 
    },
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 6, 
    borderRadius: 8, 
    padding: 10, 
    margin: 10, 
  },
});

