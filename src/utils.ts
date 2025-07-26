export function project3D(
  x: number,
  y: number,
  z: number,
  perspective: number
) {
  const scale = perspective / (perspective + z);
  return {
    x: x * scale,
    y: y * scale,
    scale,
  };
}

export const isFaceVisible = (
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
  const dx1 = p1.x - p0.x;
  const dy1 = p1.y - p0.y;
  const dx2 = p2.x - p0.x;
  const dy2 = p2.y - p0.y;
  // Z component of cross product (in 2D): dx1 * dy2 - dx2 * dy1
  return dx1 * dy2 - dx2 * dy1 < 0; // Negative = facing the camera
};

export const orbIndexToStart = (index: number, circleRadius: number) => [
  circleRadius * Math.cos((index / 7) * Math.PI * 2),
  circleRadius * Math.sin((index / 7) * Math.PI * 2),
  1,
];

// 4. Each orb chasing each other into pair pattern
/**
       * Pair Patterns order:
        | 1 of 7         |
        | 1 of 2         |
        | 2 of 2         |
        | 3 of 2         |
        | 2 of 2; 1 of 3 |
        | 2 of 2         |
        | 1 of 3; 1 of 4 |
        | 2 of 2         |
        | 2 of 2; 1 of 3 |
        | 3 of 2         |
        | 2 of 2         |
       */
/**
 * Given a list of patterns, map to an object of indexes for each orb
 * that should move and where they should move too
 * @param chainGroups array of pattern
 * @param chainGroups.numberOfChain number amount of this chain
 * @param chainGroups.amountInChain number how many orbs should be in this chain
 * @returns Object map of each orb that should move and where it should move to by index
 * @example pairPatternToIndex([{count: 2, amountInPair: 3}], 7) { 1: 0, 2: 0, 4: 3, 5: 3 }
 */
export const chainPatternToIndex = (
  chainGroups: { numberOfChain: number; amountInChain: number }[],
  totalNumberOfOrbs: number = 7
) => {
  const chasePattern: { [index: number]: number } = {};
  chainGroups.forEach(
    ({ numberOfChain: count, amountInChain: amountInPair }) => {
      for (let i = 0; i < count; i++) {
        const startIndex = i * amountInPair;
        for (let j = 1; j < amountInPair; j++) {
          const orbIndex = startIndex + j;
          if (orbIndex < totalNumberOfOrbs) {
            chasePattern[orbIndex] = startIndex; // each orb chases the first orb in the pair
          }
        }
      }
    }
  );

  return chasePattern;
};

export const chasePatterns = [
  chainPatternToIndex([{ numberOfChain: 1, amountInChain: 7 }]), // 1 of 7
  chainPatternToIndex([{ numberOfChain: 1, amountInChain: 2 }]), // 1 of 2
  chainPatternToIndex([{ numberOfChain: 2, amountInChain: 2 }]), // 2 of 2
  chainPatternToIndex([{ numberOfChain: 3, amountInChain: 2 }]), // 3 of 2
  chainPatternToIndex([
    { numberOfChain: 2, amountInChain: 2 },
    { numberOfChain: 1, amountInChain: 3 },
  ]), // 2 of 2; 1 of 3
  chainPatternToIndex([{ numberOfChain: 2, amountInChain: 2 }]), // 2 of 2
  chainPatternToIndex([
    { numberOfChain: 1, amountInChain: 3 },
    { numberOfChain: 1, amountInChain: 4 },
  ]), // 1 of 3; 1 of 4
  chainPatternToIndex([{ numberOfChain: 2, amountInChain: 2 }]), // 2 of 2
  chainPatternToIndex([
    { numberOfChain: 2, amountInChain: 2 },
    { numberOfChain: 1, amountInChain: 3 },
  ]), // 2 of 2; 1 of 3
  chainPatternToIndex([{ numberOfChain: 3, amountInChain: 2 }]), // 3 of 2
  chainPatternToIndex([{ numberOfChain: 2, amountInChain: 2 }]), // 2 of 2
];
