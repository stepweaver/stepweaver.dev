
'use client';

import useZorkGame from './hooks/useZorkGame';
export { zorkRooms } from './data/rooms';
export { zorkItems } from './data/items';

// This function initializes a Zork game with the provided output handler
export function initializeZork({ addOutput }) {
  return useZorkGame({ addOutput });
}