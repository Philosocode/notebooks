import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { selectCurrentConcept } from "concept/redux/concept.selectors";

// components

// styles
import { CreateHookForm } from "./create-hook-form.component";
import { getHooks } from "hook/redux/hook.thunks";
import { IConcept } from "concept/redux/concept.types";

interface IProps {
  currentConcept: IConcept;
}
export const ConceptHooks: React.FC<IProps> = ({ currentConcept }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentConcept.hooks) {
      dispatch(getHooks(currentConcept.id));
    }
  }, [currentConcept, dispatch]);

  if (!currentConcept?.hooks) return null;
  return (
    <>
    <CreateHookForm />
    {
      currentConcept.hooks.map(hook => (
        <div>
          <h1>{hook.title}</h1>
          <p>{hook.content}</p>
          <p>{hook.position}</p>
        </div>
      ))
    }
    </>
  );
};

