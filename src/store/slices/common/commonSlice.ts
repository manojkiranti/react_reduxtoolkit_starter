import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isLoading: boolean;
  openAIAssistant: boolean;
}
const initialState: CommonState = {
  isLoading: false,
  openAIAssistant: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleAIAssistant: (state) => {
      state.openAIAssistant = !state.openAIAssistant;
    },
  },
});
export const { setLoading, toggleAIAssistant } = commonSlice.actions;
export default commonSlice.reducer;
