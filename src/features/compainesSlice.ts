import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import { InitialState} from '../types'

  const initialState: InitialState = {
    data : [],
    isLoading : false,
    error: null,
    singleCompany: null
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

export const fetchSingleData = createAsyncThunk('companies/fetchSingleData', async (id: number) => {
  try {
    const response = await fetch(`https://api.github.com/orgs/${id}`);
    
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
    initialState,
    reducers : {
      sortCompanies: (state , action) =>{
      const sortingCriteria = action.payload;

      if(sortingCriteria == 'login'){
        state.data.sort((a, b) => a.login.localeCompare(b.login))
      }else if(sortingCriteria =='id'){
        state.data.sort((a, b) => a.id - b.id)
      }
      } 
    },
    extraReducers : (builder) => {
        builder
        //all companies
        .addCase(fetchData.pending,(state , action) => {
        state.isLoading = true;
        state.error = null;
        })

        .addCase(fetchData.fulfilled,(state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        })

        .addCase(fetchData.rejected,(state , action) => {
        state.isLoading = false;
        state.error = "Failed to fetch data";
        })
      //single company
        .addCase(fetchSingleData.pending,(state , action) => {
         state.isLoading = true;
         state.error = null;
          })
  
        .addCase(fetchSingleData.fulfilled,(state, action) => {
          state.isLoading = false;
          state.singleCompany = action.payload;
          state.error = null;
          })
  
        .addCase(fetchSingleData.rejected,(state , action) => {
          state.isLoading = false;
          state.error = "Failed to fetch data";
          })
    }
});

export const {sortCompanies} = companiesReducer.actions;
export default companiesReducer.reducer;
