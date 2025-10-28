import { create} from "zustand"
import { assets } from "../assets/assets"

export const useAuthStore = create((set) => ({
    user:{
      name:"Manash Ranjan",
      image:assets.profile_pic,
      email:"example@example.com",
      phone:'+91 7895645631',
      address:{
        city:"New York",
        state:"NY",
        contry:"India",
        zip:"12345"
      },
      gender:"Male",
      dob:'2000-01-14',
      edited:false
    },
    isLoading:false,
    // setUser: (user) => set({user}),
    // logout: () => set({user: null})
}))