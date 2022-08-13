const statusDict = {
  0: 'neverSeen',
  1: 'regular',
  2: 'good',
  3: 'proficient',
};

export const newStatus = (current: number): number => {
  if (current < Object.keys(statusDict).length - 1) {
    return current + 1;
  }

  return 0;
};

export const getStatus = (idx: number): string => statusDict[idx];
