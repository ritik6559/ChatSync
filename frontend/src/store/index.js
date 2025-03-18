import {create} from "zustand";
import {createAuthSlice} from "@/store/slices/auth-slice.js";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
}));