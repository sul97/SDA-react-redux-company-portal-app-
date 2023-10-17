import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    data : [],
    isLoading : false,
    error: null as string | null 
} 

export const fetchData = createAsyncThunk('companies/fetchData', async () => {
    try {
      const response = await fetch('https://api.github.com/organizations');
      
      if (!response.ok) {
        throw new Error('Network response error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
    console.log(error) 
    }
});

//pandin || fulfilled || rejected
 const companiesReducer = createSlice({
    name : "companies",
    initialState : initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchData.pending,( state ) => {
        state.isLoading = true;
        state.error = null;
        })

        .addCase(fetchData.fulfilled,(state , action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        })

        .addCase(fetchData.rejected,(state , action) => {
            state.isLoading = false;
            state.error = "Failed to fetch data";
        })
    }
});

export default companiesReducer.reducer;
