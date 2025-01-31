import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Chhota Bheem Chota Bheem!</Text>
    </View>
  );
};

export default HomeScreen;