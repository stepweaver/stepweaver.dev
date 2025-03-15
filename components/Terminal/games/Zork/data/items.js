
export const zorkItems = {
  mailbox: {
    name: 'mailbox',
    description: 'There is a small mailbox here.',
    canTake: false,
    interactions: {
      open: 'Opening the small mailbox reveals a leaflet.',
      close: 'The mailbox is now closed.',
    },
    contains: ['leaflet'],
  },
  leaflet: {
    name: 'leaflet',
    description: 'A simple leaflet.',
    canTake: true,
    interactions: {
      read: 'WELCOME TO ZORK!\nZork is a game of adventure, danger, and low cunning.\nIn it you will explore some of the most amazing territory ever seen by mortals.\nNo computer should be without one!',
    },
  },
  window: {
    name: 'window',
    description: 'The window is slightly ajar.',
    canTake: false,
    interactions: {
      open: 'The window is already slightly open.',
      enter: 'You enter the house through the window.',
    },
  },
};