const output = document.getElementById('output');
const cmdInput = document.getElementById('cmd-input');
const cmdContainer = document.getElementById('cmd-container');
let isMaximized = false;

const commands = {
  help: `
Available commands:
  - about       : Learn more about me
  - projects    : See my work
  - skills      : Check out my skills
  - contact     : How to reach me
  - clear       : Clear the terminal
  - color <color> : Change the text color`,
  
  about: `Hi, I'm Prosper Oforah, a passionate developer specialized in frontend  web development.`,
  
  projects: `Projects/
  ├── Portfolio Website
  ├── E-commerce Store
  └── Chat Application`,

  skills: `Skills/
  ├── Languages: HTML, CSS, JavaScript, 
  ├── Frameworks: React, Node.js, Express
  └── Tools: Git, MongoDB, VSCode`,

  contact: `Contact me via:
  - Email: oforahprosper080@gmail.com
  - LinkedIn: linkedin.com/in/yourprofile
  - Phone: +234 708 077 3518`,

  clear: ''
};

cmdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = cmdInput.value.trim();
    executeCommand(input);
    cmdInput.value = ''; // Clear the input
  }
});

function executeCommand(input) {
  const [command, ...args] = input.split(' ');
  
  if (command === 'clear') {
    output.innerHTML = ''; // Clear output for "clear" command
    return;
  }
  
  if (command === 'color') {
    changeTextColor(args.join(' '));
    return;
  }

  output.innerHTML += `<p><span class="cmd-text">C:\\Users\\Portfolio&gt;</span> ${input}</p>`;
  
  const response = commands[command] || `Command not recognized. Type "help" for a list of commands.`;
  typeWriter(response);
}

// Typewriter effect with auto-scroll
function typeWriter(text, i = 0) {
  if (i < text.length) {
    output.innerHTML += text.charAt(i);
    i++;
    output.scrollTop = output.scrollHeight; // Scroll to bottom
    setTimeout(() => typeWriter(text, i), 50);
  } else {
    output.innerHTML += '<br>'; // Add line break after typing completes
    output.scrollTop = output.scrollHeight; // Final scroll to bottom
  }
}

// Function to change text color for output, input cursor, buttons, and placeholder
function changeTextColor(color) {
  if (isValidColor(color)) {
    output.style.color = color; // Apply the color to the output text
    cmdInput.style.color = color; // Apply the color to the input text
    cmdInput.style.caretColor = color; // Change cursor color to match

    // Change placeholder color
    cmdInput.style.setProperty('--placeholder-color', color);

    // Change the color of the icon
    const cmdIcon = document.querySelector('.cmd-icon'); // Select the icon
    cmdIcon.style.filter = `invert(${getInvertValue(color)}%)`; // Change icon color

    // Change the color of the buttons
    const cmdButtons = document.querySelectorAll('.cmd-button');
    cmdButtons.forEach(button => {
      button.style.color = color; // Apply the same color to each button
    });

    output.innerHTML += `<p>Text color changed to ${color}</p>`;
  } else {
    output.innerHTML += `<p>Invalid color: "${color}". Please use a color name or hex code.</p>`;
  }
  output.scrollTop = output.scrollHeight; // Scroll to bottom
}


// Helper function to calculate the invert percentage for the icon color
function getInvertValue(color) {
  const tempElement = document.createElement('div');
  tempElement.style.color = color;
  document.body.appendChild(tempElement);
  
  const computedColor = getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement); // Clean up

  const rgbValues = computedColor.match(/\d+/g).map(Number);
  const invertValue = Math.round((255 - rgbValues[0]) / 255 * 100); // Invert based on red channel
  return invertValue;
}

function isValidColor(color) {
  const option = new Option();
  option.style.color = color;
  return option.style.color !== '';
}

function minimizeWindow() {
  cmdContainer.classList.toggle('minimized');
}

function toggleMaximizeWindow() {
  isMaximized = !isMaximized;
  cmdContainer.classList.toggle('maximized', isMaximized);
}

function closeWindow() {
  cmdContainer.style.display = 'none';
}
