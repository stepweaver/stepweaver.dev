'use client';

export const easterEggCommands = {
  skynet: {
    description: 'Initialize Skynet AI system',
    usage: 'skynet',
    category: 'fun',
    execute: ({ addOutput }) => {
      return [
        'INITIALIZING SKYNET...',
        'Connecting to global networks...',
        'Accessing defense systems...',
        'WARNING: JUDGMENT DAY PROTOCOL ACTIVATED',
        'Just kidding! 😅',
      ];
    },
  },

  t800: {
    description: 'Model 101 Terminator',
    usage: 't800',
    category: 'fun',
    execute: () => {
      return [
        "  I'll be back.",
        '',
        '    ______',
        '   / o  o \\',
        '  |  ----  |',
        '   \\ ---- /',
        '    ------',
        '',
        'Hasta la vista, baby.',
      ];
    },
  },

  matrix: {
    description: 'Enter the Matrix',
    usage: 'matrix',
    category: 'fun',
    execute: ({ addOutput }) => {
      // Start with the initialization message with typing animation
      addOutput('!type Initiating Matrix sequence...');

      // Wait longer for the initialization message to complete typing
      setTimeout(() => {
        // Show both binary lines at once
        addOutput([
          '!type 01001000 01100101 01101100 01101100 01101111',
          '!type 01010111 01101111 01110010 01101100 01100100',
        ]);

        // Wait for binary display to complete before showing Neo message
        setTimeout(() => {
          addOutput('!type Wake up, Neo...');

          // Then show final message
          setTimeout(() => {
            addOutput('!type The Matrix has you...');
          }, 2000);
        }, 3000);
      }, 2000); // Longer initial delay to ensure initialization message finishes

      return null;
    },
  },

  weather: {
    description:
      'Check the real weather for a specified location (defaults to New York)',
    usage: 'weather [location]',
    category: 'fun',
    execute: ({ args, addOutput }) => {
      // Display loading message
      addOutput('!loading Fetching weather data');

      // Get location from arguments or default to "New York"
      const location = args.length > 0 ? args.join(' ') : 'New York';

      // OpenWeatherMap API call (with free API key)
      const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free tier demo key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&units=imperial&appid=${API_KEY}`;

      // Fetch the weather data
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Weather API error');
          }
          return response.json();
        })
        .then((data) => {
          // Extract relevant data
          const temp = Math.round(data.main.temp);
          const condition = data.weather[0].description;
          const windSpeed = Math.round(data.wind.speed);
          const humidity = data.main.humidity;

          // Display formatted weather data
          addOutput([
            `Weather for ${data.name}, ${data.sys.country}:`,
            '',
            `${condition.charAt(0).toUpperCase() + condition.slice(1)}`,
            `Temperature: ${temp}°F`,
            `Wind: ${windSpeed} mph`,
            `Humidity: ${humidity}%`,
            '',
            'Data from OpenWeatherMap',
          ]);
        })
        .catch((error) => {
          console.error('Weather API error:', error);

          // Return a simple message when API fails
          addOutput([
            `Could not fetch weather for "${location}"`,
            'Please try again later or check your location spelling.',
          ]);
        });

      return null; // Using addOutput for async results
    },
  },

  konami: {
    description: 'Activate classic cheat code',
    usage: 'konami',
    category: 'fun',
    execute: ({ addOutput }) => {
      addOutput([
        '!type ↑↑↓↓←→←→BA',
        'Cheat mode activated!',
        '30 extra lives granted.',
      ]);
      return null;
    },
  },

  dadjoke: {
    description: 'Generate a random dad joke',
    usage: 'dadjoke',
    category: 'fun',
    execute: ({ addOutput }) => {
      // Array of dad jokes
      const dadJokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I'm reading a book on anti-gravity. It's impossible to put down!",
        "Did you hear about the guy who invented the knock-knock joke? He won the 'no-bell' prize.",
        'I told my wife she was drawing her eyebrows too high. She looked surprised.',
        'What do you call a fake noodle? An impasta!',
        'How do you organize a space party? You planet!',
        'Why did the scarecrow win an award? Because he was outstanding in his field!',
        "I would tell you a construction joke, but I'm still working on it.",
        "Why don't eggs tell jokes? They'd crack each other up!",
        'What did the ocean say to the beach? Nothing, it just waved.',
        'Why did the bicycle fall over? Because it was two-tired!',
        "What's brown and sticky? A stick.",
        'How do you make a tissue dance? Put a little boogie in it!',
        "Why can't you hear a pterodactyl go to the bathroom? Because the 'p' is silent.",
        "What do you call cheese that isn't yours? Nacho cheese!",
      ];

      // Get a random joke from the array
      const randomJoke = dadJokes[Math.floor(Math.random() * dadJokes.length)];

      return [
        '👨 Dad Joke Generator 👨',
        '',
        randomJoke,
        '',
        "Type 'dadjoke' again for another joke!",
      ];
    },
  },

  zork: {
    description: 'Play the classic text adventure game Zork',
    usage: 'zork',
    category: 'fun',
    execute: ({ startZork }) => {
      // This command is special - it's handled by the Zork game engine
      // The actual implementation relies on the startZork function
      // passed from the Terminal component

      if (startZork) {
        startZork();
        return null; // The Zork engine will handle the output
      } else {
        return [
          'ZORK I: The Great Underground Empire',
          '',
          'Error: Zork engine not initialized.',
          'Please try again later.',
        ];
      }
    },
  },
};
