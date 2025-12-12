import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';


interface WatermarkSettings {
    enabled: boolean;
    text: string;
    opacity: string;
    fontSize: string;
    position: string;
}

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
            return action.payload;
        },
        resetWatermark(){
            return initialState
        }
    }
})

export const {setSettingsWatermark, resetWatermark} = watermarkSlice.actions;
export default watermarkSlice.reducer