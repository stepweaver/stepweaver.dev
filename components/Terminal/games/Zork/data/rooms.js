
export const zorkRooms = {
  'west-of-house': {
    name: 'West of House',
    description:
      'You are standing in an open field west of a white house, with a boarded front door.',
    exits: {
      north: 'north-of-house',
      south: 'south-of-house',
      east: 'behind-house',
    },
    items: ['mailbox'],
  },
  'north-of-house': {
    name: 'North of House',
    description:
      'You are facing the north side of a white house. There is no door here, and all the windows are boarded up.',
    exits: {
      west: 'west-of-house',
      east: 'behind-house',
    },
    items: [],
  },
  'south-of-house': {
    name: 'South of House',
    description:
      'You are facing the south side of a white house. There is no door here, and all the windows are boarded.',
    exits: {
      west: 'west-of-house',
      east: 'behind-house',
    },
    items: [],
  },
  'behind-house': {
    name: 'Behind House',
    description:
      'You are behind the white house. A path leads into the forest to the east. In one corner of the house there is a small window which is slightly ajar.',
    exits: {
      west: 'west-of-house',
      north: 'north-of-house',
      south: 'south-of-house',
      east: 'forest',
    },
    items: ['window'],
  },
  forest: {
    name: 'Forest',
    description:
      'This is a forest, with trees in all directions. To the east, there appears to be sunlight.',
    exits: {
      west: 'behind-house',
      east: 'forest-clearing',
    },
    items: [],
  },
  'forest-clearing': {
    name: 'Forest Clearing',
    description:
      'You are in a small clearing in the forest. There is a narrow path leading north and south.',
    exits: {
      west: 'forest',
      north: 'forest-path',
      south: 'forest-path',
    },
    items: ['leaflet'],
  },
};