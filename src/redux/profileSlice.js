
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Devesh kumar singh',
  email: 'devesh@example.com',
  bio: 'Software Developer',
  image: null, // Add image field
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { name, email, bio, image } = action.payload;
      state.name = name;
      state.email = email;
      state.bio = bio;
      state.image = image; // Update image
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;