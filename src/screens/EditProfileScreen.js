// src/screens/EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/profileSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../styles/globalStyles';

const EditProfileScreen = ({ navigation }) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [image, setImage] = useState(profile.image);

  const handleImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => launchCamera({ mediaType: 'photo' }, handleImageResponse),
        },
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary({ mediaType: 'photo' }, handleImageResponse),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.assets && response.assets[0].uri) {
      const uri = response.assets[0].uri;
      setImage(uri); // Update local state
    }
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !bio.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      dispatch(updateProfile({
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
        image: image, // Include image in payload
      }));

      Alert.alert(
        'Success',
        'Profile updated successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.error('Update profile error:', error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.form}>
        <TouchableOpacity onPress={handleImagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text>Tap to add image</Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={bio}
          onChangeText={setBio}
          placeholder="Bio"
          multiline
          numberOfLines={3}
        />
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
};

export default EditProfileScreen;