import { useEffect, useState } from "react";

interface IExpandedHash {
  [key: string]: boolean;
}
interface IEntity {
  id: string;
}
export function useExpandHash(entities: IEntity[], initialValue = false) {
  const [expandedHash, setExpandedHash] = useState<IExpandedHash>({});

  // recompute hash whenever entities change
  useEffect(() => {
    setExpandedHash(oldHash => {
      const newHash = {...oldHash};

      entities.forEach(entity => {
        // ID not added yet. Add it to hash
        if (!newHash.hasOwnProperty(entity.id)) {
          newHash[entity.id] = initialValue;
        }
      });

      return newHash;
    });
  }, [entities]);

  function toggleAllExpansions() {
    const shouldExpand = !hasExpandedEntity();

    setExpandedHash(oldHash => {
      const newHash = {...oldHash};

      entities.forEach(entity => newHash[entity.id] = shouldExpand);

      return newHash;
    });
  }

  function toggleEntityExpansion(entityId: string) {
    const updatedValue = !expandedHash[entityId];

    setExpandedHash(prevState => ({ ...prevState, [entityId]: updatedValue }));
  }

  function hasExpandedEntity() {
    return Object.values(expandedHash).includes(true);
  }

  return {
    expandedHash,
    toggleAllExpansions,
    toggleEntityExpansion,
    hasExpandedEntity,
  }
}