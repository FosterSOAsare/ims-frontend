

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import useFormErrorCreator from "./useFormErrorCreator";

const useSelectedValuesFromHookForm = (schema: any) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), shouldFocusError: false, reValidateMode: "onSubmit" });

  useFormErrorCreator(errors);
  return { register, handleSubmit, reset, getValues, errors }

}

export default useSelectedValuesFromHookForm