// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../styles/globalStyles';

const ProfileScreen = ({ navigation }) => {
  const profile = useSelector((state) => state.profile);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileInfo}>
        {profile.image && (
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
        )}
        <Text style={styles.label}>Name: {profile.name}</Text>
        <Text style={styles.label}>Email: {profile.email}</Text>
        <Text style={styles.label}>Bio: {profile.bio}</Text>
      </View>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
};

export default ProfileScreen;