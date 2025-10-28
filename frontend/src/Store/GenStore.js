import { create } from "zustand";
import axios from "axios";
import variables from "../env";

export const useGenStore = create((set) => ({
  messages: [
    {
      sender: "bot",
      message:
        "Hello, I am MedGenAi, a medical AI that provides personalized health advice and recommendations.",
    },
  ],
  isLoading: false,
  generate: async (promt) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      set((state) => ({
        ...state,
        messages: [...state.messages, { sender: "user", message: promt }],
      }));
  
      const predata = {
        contents: [
          {
            parts: [
              {
                text: promt,
                // text: `Check is this promt is related to medical if not then don't respond any thingjust say I can't help with that or something like that make sure to not always say I can't Help with that every time change or say some thing new but if the promt is related to medical then respond the promt or describe what the promt is.  promt:"${promt}"`,
              },
            ],
          },
        ],
      };
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${variables.gemini}`,
        predata
      );
      const data = await response.data.candidates[0].content.parts[0].text;
      set((state) => ({
        ...state,
        messages: [...state.messages, { sender: "bot", message: data }],
      }));
      set((state) => ({ ...state, isLoading: false }));   
    } catch (error) {
      console.log(error);
      set((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            sender: "bot",
            message: "Sorry, I am unable to generate a response at the moment. may be this is a Internal Or Network Error",
          },
        ],
      }));
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
