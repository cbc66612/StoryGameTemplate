
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "intro";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  intro: {
    title: "The School Mystery",
    character: "You",
     text: 'You stay at school after class, but your friend Maya is missing. The front doors are locked. You find a note that says, "Find the records." You decide to look for Maya.',
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Go to the library",
        nextScene: "library"
      },
      {
        text: "Go to the principal's office",
        nextScene: "office"
      }
    ]
  },

  office: {
    title: "Principal's office",
    character: "You",
    text: "You find a folder about students who disappeared years ago. Some pages are missing. Inside the folder, you find a map showing where a spare storage room key is hidden in the basement. Suddenly, you hear footsteps outside the door. You hide under the desk until the footsteps fade away.",
    choices: [
      {
        text: "Take the folder and go to the library",
        action: function() { pickUpItem("folder"); },
        nextScene: "library"
      },
         {
        text: "Leave it on the desk and go to the library",
        nextScene: "library"
      }
    ]
  },

  library: {
    title: "The Library",
    character: "You",
   text: 'Maya’s backpack is on a chair. In her notebook, you read, "Check the storage room in the basement." As you walk toward the exit, a heavy book falls from a shelf and hits your head. You lose 30 HP.',
    choices: [
  {
    text: "Look for the janitor",
    action: hitByBook,
    nextScene: "janitor"
  },
  {
    text: "Go to the basement",
    action: hitByBook,
    nextScene: "basement"
  }
]},
    
  

   janitor: {
    title: "Janitor's Closet",
    character: "The Janitor",
    text: "The janitor says he saw Maya walk toward the basement. He offers you a flashlight and says you can borrow his storage room key if the door is locked. He cannot open the front doors because the electronic locks are not working.",
    choices: [
      {
        text: "Take the flashlight and go to the basement",
        action: function() { pickUpItem("flashlight"); },
        nextScene: "basement"
      },
      {
        text: "Borrow the key and go to the basement",
        action: function() { pickUpItem("storage key"); },
        nextScene: "basement"
      }
    ]
  },
     basement: {
    title: "The Basement",
    character: "You",
    text:"The basement is dark and quiet. You hear Maya calling for help behind the locked storage room door.",
    choices: [
      {
        text: "Try to open the storage room door",
        nextScene: "lockedDoor"
      },
      {
       text: "Search for a spare key",
        nextScene: "searchKey"
      }
    ]
  },
    lockedDoor: {
      title: "Storage Room Door",
      character: "Maya",
      text: 'You try the handle, but the door is locked. From inside, Maya calls, "Please help me open the door!"',
    choices: [
      {
        text: "Use the key",
        action: unlockDoor
      },
      {
        text: "Go back to the basement",
        nextScene: "basement"
      }
    ]
},
   searchKey: {
    title: "Search for the Spare Key",
    character: "You",
    text: "The basement is too dark to search easily. You need the map in the folder and a flashlight to find the spare key.",
    choices: [
      {
        text: "Use the map and flashlight",
        action: findSparekey
      },
      {
        text: "Go ask the janitor for a key",
        nextScene: "janitor"
      }
    ]
  },

  storage: {
    title: "Storage Room",
    character: "Maya",
    text: "You open the door and find Maya. She says she was searching for records about students who disappeared years ago, but the door locked behind her. Together, you find the records in a box. As you leave the basement, the power returns and the front doors unlock.",
    choices: [
      {
        text: "Give the records to the principal",
        nextScene: "goodEnding"
      },
      {
        text: "Take the records home",
        nextScene: "badEnding"
      }
    ]
  },

  goodEnding: {
    title: "Ending 1: You Solve the Mystery",
    character: "You and Maya",
    text: "You and Maya give the records to the principal. The principal promises to investigate the students' disappearances. You and Maya leave the school, relieved that you found each other and saved the records.",
    choices: []
  
},
badEnding: {
    title: "Ending 2: The Records Follow You",
    character: "You",
    text: 'You leave the school with Maya, but take the records home. That night, you open the folder and find a new page with your name and photo. Beside your name are the words "Next one." You call Maya, but she does not answer. A school bell rings inside your house. The lights go out, and someone knocks on your bedroom door.',
    choices: []
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;
  messageDisplay.textContent = ""; 

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene



// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("storage key")) {
    updateScene("storage");
  } else {
    messageDisplay.textContent = "The door is locked. You need a key to open it.";
  }
}

function findSparekey() {
  if (inventory.includes("folder") && inventory.includes("flashlight")) {
    pickUpItem("storage key");
    updateScene("lockedDoor");
  } else {
    messageDisplay.textContent = "You need the map in the folder and a flashlight to find the spare key.";
  }
}
let bookHit = false;

function hitByBook() {
  if (bookHit === false) {
    updateHealth(-30);
    bookHit = true;
  }
}
updateScene(currentScene);
