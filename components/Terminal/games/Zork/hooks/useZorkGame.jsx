'use client';

import { useState } from 'react';
import { zorkRooms } from '../data/rooms';
import { zorkItems } from '../data/items';

export default function useZorkGame({ addOutput }) {
  const [zorkState, setZorkState] = useState({
    isPlaying: false,
    currentRoom: 'west-of-house',
    inventory: [],
    gameStarted: false,
  });

  // Start the Zork game
  const startZork = () => {
    setZorkState((prev) => ({
      ...prev,
      isPlaying: true,
      gameStarted: true,
    }));

    // Display welcome message
    addOutput([
      'ZORK I: The Great Underground Empire',
      '==============================',
      '',
      zorkRooms[zorkState.currentRoom].description,
      describeItems(zorkState.currentRoom),
    ]);
  };

  // Process Zork command
  const processZorkCommand = (command) => {
    const normalizedCommand = command.toLowerCase().trim();
    const words = normalizedCommand.split(' ');
    const verb = words[0];
    const noun = words.slice(1).join(' ');

    // Handle movement commands
    if (['north', 'south', 'east', 'west', 'n', 's', 'e', 'w'].includes(verb)) {
      return handleMovement(getDirectionFromCommand(verb));
    }

    // Handle other commands
    switch (verb) {
      case 'look':
        return handleLook();
      case 'inventory':
      case 'i':
        return handleInventory();
      case 'take':
      case 'get':
        return handleTake(noun);
      case 'drop':
        return handleDrop(noun);
      case 'examine':
      case 'x':
        return handleExamine(noun);
      case 'read':
        return handleRead(noun);
      case 'open':
        return handleOpen(noun);
      case 'quit':
        return handleQuit();
      case 'help':
        return handleHelp();
      default:
        return "I don't understand that command.";
    }
  };

  // Helper functions
  const getDirectionFromCommand = (cmd) => {
    const directionMap = {
      n: 'north',
      s: 'south',
      e: 'east',
      w: 'west',
    };
    return directionMap[cmd] || cmd;
  };

  const describeItems = (roomId) => {
    const room = zorkRooms[roomId];
    if (!room || !room.items || room.items.length === 0) return '';

    return room.items
      .map((itemId) => {
        const item = zorkItems[itemId];
        return item ? item.description : '';
      })
      .join('\n');
  };

  // Command handlers
  const handleMovement = (direction) => {
    const currentRoom = zorkRooms[zorkState.currentRoom];
    if (!currentRoom.exits[direction]) {
      return "You can't go that way.";
    }

    const newRoomId = currentRoom.exits[direction];
    const newRoom = zorkRooms[newRoomId];

    setZorkState((prev) => ({
      ...prev,
      currentRoom: newRoomId,
    }));

    return [newRoom.name, newRoom.description, describeItems(newRoomId)];
  };

  const handleLook = () => {
    const room = zorkRooms[zorkState.currentRoom];
    return [room.name, room.description, describeItems(zorkState.currentRoom)];
  };

  const handleInventory = () => {
    if (zorkState.inventory.length === 0) {
      return 'You are not carrying anything.';
    }

    return [
      'You are carrying:',
      ...zorkState.inventory.map((itemId) => {
        const item = zorkItems[itemId];
        return item ? `- ${item.name}` : '';
      }),
    ];
  };

  const handleQuit = () => {
    setZorkState((prev) => ({
      ...prev,
      isPlaying: false,
    }));

    return "Thanks for playing Zork! You've returned to the terminal.";
  };

  const handleHelp = () => {
    return [
      'ZORK HELP:',
      '- Use compass directions (north, south, east, west) or shortcuts (n, s, e, w) to move',
      '- Common commands: look, inventory (i), take [item], drop [item], examine [item], read [item]',
      "- Type 'quit' to exit Zork and return to the terminal",
    ];
  };

  // Implementation for item interactions would go here
  const handleTake = (itemName) => {
    // Implementation omitted for brevity
    return `You take the ${itemName}.`;
  };

  const handleDrop = (itemName) => {
    // Implementation omitted for brevity
    return `You drop the ${itemName}.`;
  };

  const handleExamine = (itemName) => {
    // Implementation omitted for brevity
    return `You examine the ${itemName}.`;
  };

  const handleRead = (itemName) => {
    // Implementation omitted for brevity
    return `You read the ${itemName}.`;
  };

  const handleOpen = (itemName) => {
    // Implementation omitted for brevity
    return `You open the ${itemName}.`;
  };

  return {
    zorkState,
    startZork,
    processZorkCommand,
  };
}
