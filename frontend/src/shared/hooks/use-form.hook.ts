import {useState, ChangeEvent, useEffect} from 'react';

interface ITouchedState {
  [key: string]: boolean
}

export function useForm<TFormState extends object>(initialValues: TFormState) {
  /**
   * Hook for storing and managing form data
   *
   * @param initialValues - object containing the initial state of the form
   *                        (e.g. { email: "", password: "" })
   *
   * @returns handleChange - event handler to call when a value changes
   *          touched - e.g. { email: false, password: true }
   *          values - values of the form fields
   */
  const [values, setValues] = useState<TFormState>(initialValues);
  const [touched, setTouched] = useState<ITouchedState>({});

  useEffect(() => {
    // Initiate `touched` state from the fields in `initialValues`
    let initTouched: ITouchedState = {};

    Object.keys(initialValues).forEach(fieldName => initTouched[fieldName] = false);

    setTouched(initTouched);
    // eslint-disable-next-line
  }, []);

  function itemsChanged() {
    const keys = Object.keys(initialValues);

    for (let key of keys) {
      // @ts-ignore. Done so numbers and number-strings can be compared
      if (initialValues[key] != values[key]) { // eslint-disable-line
        return true; 
      }
    }

    return false;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    // Change `values` based on input events
    event.persist();

    if (event.target.type === "checkbox") {
      // @ts-ignore
      setValues(values => ({ ...values, [event.target.name]: event.target.checked }));
    } else {
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    }
  }

  return { 
    handleChange,
    touched,
    setTouched,
    values,
    setValues,
    itemsChanged,
  }
}