import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import shuffle from "lodash/shuffle";

import { IFact } from "../../fact/redux/fact.types";
import { api } from "../../services/api.service";
import { selectPracticeState } from "../redux/practice.selectors";
import { Loader } from "loading/components/loader.component";

export const PracticePage: React.FC = () => {
  const practiceState = useSelector(selectPracticeState);
  const history = useHistory();

  const [facts, setFacts] = useState<IFact[]>();
  const [totalFacts, setTotalFacts] = useState(0);

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

    let requestUrl: string;
    switch(practiceState.source) {
      case "all":
        requestUrl = "/facts?mastered=false";
        break;
      case "material":
        requestUrl = `/materials/${practiceState.id}?mastered=false`;
        break;
      case "part":
        requestUrl = `/parts/${practiceState.id}/facts?mastered=false`;
        break;
    }

    api.get<IFactsResponse>(requestUrl)
      .then(response => {
        const rawFacts = response.data.data.facts;

        setTotalFacts(rawFacts.length);
        setFacts(shuffle(rawFacts));
      });
  }, [practiceState, facts, history]);

  if (!facts) return <Loader />;
  return (
    <div>
      {
        facts.map(f => <div>{f.question}</div>)
      }
    </div>
  );
}