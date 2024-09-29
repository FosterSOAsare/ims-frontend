import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { FieldErrors, FieldValues } from 'react-hook-form'

const useFormErrorCreator = (errors: FieldErrors<FieldValues>) => {
  useEffect(() => {

    let keys = Array.from(Object.keys(errors));
    let err: any = errors[keys[0]]?.message;
    if (keys.length > 0) {
      toast.error(err, { autoClose: 1500 });
    }
  }, [errors]);
};

export default useFormErrorCreator;
