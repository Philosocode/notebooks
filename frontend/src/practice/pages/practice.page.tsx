import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IFact } from "../../fact/redux/fact.types";
import { api } from "../../services/api.service";
import { selectPracticeState } from "../redux/practice.selectors";

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

    interface IFactsResponse {
      data: {
        facts: IFact[];
      };
    }
    let rawFacts: IFact[];

    switch(practiceState.source) {
      case "all":
        api.get("/facts?mastered=false")
          .then(response => {
            rawFacts = response.data.data.facts;
          });
        break;
      case "material":
        api.get(`/materials/${practiceState.id}?mastered=false`)
          .then(response => {
            rawFacts = response.data.data.facts;
          });
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