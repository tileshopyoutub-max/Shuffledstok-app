import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WatermarkSettings } from '../../shared/types/watermark';

const initialState:WatermarkSettings = {
    enabled: false,
    text: "",
    opacity: 50,
    fontSize: 24,
    position: "",
    loopWatermark: false,

    paddingX: 50,
    paddingY: 50
}

const watermarkSlice = createSlice({
    name: 'watermark', 
    initialState,
    reducers: {
        setSettingsWatermark(state, action: PayloadAction<Partial<WatermarkSettings>>){
            Object.assign(state, action.payload);
        },
        resetWatermark(){
            return initialState
        },
        toggleLoopWatermark(state){
            state.loopWatermark = !state.loopWatermark

            if(state.loopWatermark){
                state.position = '';
            }
        }
    }
})

export const {setSettingsWatermark, resetWatermark, toggleLoopWatermark} = watermarkSlice.actions;
export default watermarkSlice.reducer