import { useState, useCallback } from 'react';

function useExpandCollapse({ allowMultiple = false } = {}) {
  const [openIds, setOpenIds] = useState(new Set());

  const toggleItem = useCallback(
    (id) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const isOpen = useCallback(
    (id) => openIds.has(id),
    [openIds]
  );

  return [openIds, toggleItem, isOpen];
}

export default useExpandCollapse;