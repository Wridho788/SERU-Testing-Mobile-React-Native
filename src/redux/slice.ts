import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  inputData: string;
  inputData2: string;
  claimData: any;
}

const initialState: InputState = {
  inputData: '',
  inputData2: '',
  claimData: null,
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputData: (state, action: PayloadAction<string>) => {
      state.inputData = action.payload;
    },
    setInputData2: (state, action: PayloadAction<string>) => {
      state.inputData2 = action.payload;
    },
    setClaimData: (state, action: PayloadAction<any>) => {
      state.claimData = action.payload;
    },
  },
});

export const { setInputData, setInputData2, setClaimData } = inputSlice.actions;
export default inputSlice.reducer;
