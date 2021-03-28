import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectPracticeState } from "../redux/practice.selectors";
import { IFact } from "../../fact/redux/fact.types";

export const PracticePage: React.FC = () => {
  const practiceState = useSelector(selectPracticeState);
  const history = useHistory();

  const [facts, setFacts] = useState<IFact[]>();

  useEffect(() => {
    // if Redux state missing, exit
    if (!practiceState.source) {
      return history.push("/concepts");
    }

    // don't load facts if already loaded
    if (facts !== undefined) {
      return;
    }

    switch(practiceState.source) {
      case "all":
        break;
      case "material":
        break;
      case "part":
        break;
    }
  }, [practiceState]);

  return (
    <div>

    </div>
  );
}