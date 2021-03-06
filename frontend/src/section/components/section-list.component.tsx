import React from "react";
import { useSelector } from "react-redux";
import { selectSectionsForPart } from "../redux/section.selectors";

export const SectionList: React.FC = () => {
  const sectionsForPart = useSelector(selectSectionsForPart);

  if (!sectionsForPart) return null;
  return (
    <>
      <ul>
        {
          sectionsForPart.map(section => (
            <div>{section.id} {section.name}</div>
          ))
        }
      </ul>
    </>
  )
}