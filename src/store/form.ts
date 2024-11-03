import { FormBuilderSchemaType } from "@/zod/form-builder-schema";
import { create } from "zustand";

type UseFormStore = {
  formFields: FormBuilderSchemaType["fields"] | null;
  setFormFields: (formFields: FormBuilderSchemaType["fields"]) => void;
};

export const useFormStore = create<UseFormStore>((set) => ({
  formFields: [],
  setFormFields: (formFields) => set({ formFields }),
}));
