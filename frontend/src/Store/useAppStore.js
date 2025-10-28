import { create} from "zustand"
import { doctors } from "../assets/assets"

export const useAppStore = create((set) => ({
    doctors:doctors,
}))