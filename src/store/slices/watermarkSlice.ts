import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type {WatermarkSettings} from '../../shared/types/watermark';

const initialState:WatermarkSettings = {
    enabled: false,
    text: "",
    opacity: "",
    fontSize: "",
    position: ""
}

const watermarkSlice = createSlice({
    name: 'watermark', 
    initialState,
    reducers: {
        setSettingsWatermark(state, action: PayloadAction<WatermarkSettings>){
            state.enabled = action.payload.enabled;
            state.text = action.payload.text;
            state.opacity = action.payload.opacity;
            state.fontSize = action.payload.fontSize;
            state.position = action.payload.position;
        },
        resetWatermark(){
            return initialState
        }
    }
})

export const {setSettingsWatermark, resetWatermark} = watermarkSlice.actions;
export default watermarkSlice.reducer