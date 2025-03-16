// A simple Zork-like text adventure game implementation
export function initializeZork({ addOutput }) {
  // Initialize game state
  const initialState = {
    isPlaying: false,
    location: 'westOfHouse',
    inventory: [],
    gameMap: {
      westOfHouse: {
        description:
          'You are standing in an open field west of a white house, with a boarded front door.',
        exits: {
          north: 'northOfHouse',
          south: 'southOfHouse',
          east: 'behindHouse',
        },
      },
      northOfHouse: {
        description:
          'You are facing the north side of a white house. There is no door here, and all the windows are boarded up.',
        exits: {
          west: 'westOfHouse',
          east: 'behindHouse',
        },
      },
      southOfHouse: {
        description:
          'You are facing the south side of a white house. There is no access to the house from here.',
        exits: {
          west: 'westOfHouse',
          east: 'behindHouse',
        },
      },
      behindHouse: {
        description:
          'You are behind the white house. A path leads into the forest to the east. There is a small window at the back of the house.',
        exits: {
          west: 'westOfHouse',
          north: 'northOfHouse',
          south: 'southOfHouse',
          east: 'forest',
        },
        items: ['window'],
      },
      forest: {
        description: 'You are in a dense forest. Paths lead west and south.',
        exits: {
          west: 'behindHouse',
          south: 'clearing',
        },
      },
      clearing: {
        description:
          'You are in a small clearing in the forest. There is an old mailbox here.',
        exits: {
          north: 'forest',
        },
        items: ['mailbox'],
      },
    },
  };

  // Create mutable state
  let gameState = { ...initialState };

  // Display current location
  const showLocation = () => {
    const location = gameState.gameMap[gameState.location];
    addOutput([location.description, '']);

    // List available exits
    const exits = Object.keys(location.exits);
    if (exits.length > 0) {
      addOutput(`Exits: ${exits.join(', ')}`);
    }

    // List items
    if (location.items && location.items.length > 0) {
      addOutput(`You can see: ${location.items.join(', ')}`);
    }
  };

  // Start the game
  const startZork = () => {
    gameState = { ...initialState };
    gameState.isPlaying = true;

    addOutput([
      '!type ZORK I: The Great Underground Empire',
      'A text adventure game by Infocom.',
      '(Simplified version for terminal demo)',
      '',
      'Type "look" to look around, "go [direction]" to move, "examine [item]" to look at something,',
      'and "exit" to quit the game.',
      '',
    ]);

    showLocation();
  };

  // Process game commands
  const processZorkCommand = (input) => {
    const command = input.trim().toLowerCase();
    const parts = command.split(' ');
    const action = parts[0];
    const target = parts.slice(1).join(' ');

    if (command === 'exit' || command === 'quit') {
      addOutput('Exiting Zork. Thank you for playing!');
      gameState.isPlaying = false;
      return;
    }

    if (command === 'look') {
      showLocation();
      return;
    }

    if (
      action === 'go' ||
      ['north', 'south', 'east', 'west'].includes(action)
    ) {
      // Handle movement
      const direction = action === 'go' ? target : action;
      const location = gameState.gameMap[gameState.location];

      if (location.exits[direction]) {
        gameState.location = location.exits[direction];
        addOutput(`You move ${direction}...`);
        showLocation();
      } else {
        addOutput('You cannot go that way.');
      }
      return;
    }

    if (action === 'examine' && target) {
      const location = gameState.gameMap[gameState.location];
      if (location.items && location.items.includes(target)) {
        if (target === 'mailbox') {
          addOutput('The mailbox contains a leaflet.');
        } else if (target === 'window') {
          addOutput(
            'The window is slightly ajar, but you cannot fit through it.'
          );
        } else {
          addOutput(`You see nothing special about the ${target}.`);
        }
      } else {
        addOutput(`You don't see any ${target} here.`);
      }
      return;
    }

    // Default response for unrecognized commands
    addOutput("I don't understand that command.");
  };

  return {
    zorkState: gameState,
    startZork,
    processZorkCommand,
  };
}
