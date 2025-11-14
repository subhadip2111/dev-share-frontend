import { createSlice } from '@reduxjs/toolkit'
interface PostState {
    posts: any[];
}


const initialState: any = {

}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPosts: (state, action) => {
            state.posts = action.payload;

        },
        getPosts: (state) => {
            return state.posts;

        }


    },
})

// Action creators are generated for each case reducer function
export const { addPosts, getPosts } = postSlice.actions

export default postSlice.reducer