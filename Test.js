const fileDirectory = {};

function processCommand(command) {
  const commands = command.split('/');

  let currentDirectory = fileDirectory;

  for (const directory of commands) {
    if (directory) {
      if (!currentDirectory[directory]) {
        currentDirectory[directory] = {};
        console.log({ currentDirectory })
      }
      currentDirectory = currentDirectory[directory];
    }
  }
}

function deleteDirectory(path) {
  const directories = path.split('/');
  let currentDirectory = fileDirectory;

  for (const directory of directories) {
    if (directory) {
      if (currentDirectory[directory]) {
        currentDirectory = currentDirectory[directory];
      } else {
        console.log(`Cannot delete ${path} - ${directory} does not exist`);
        return;
      }
    }
  }

  // Check if the target directory has any subdirectories or files
  if (Object.keys(currentDirectory).length > 0) {
    console.log(`Cannot delete ${path} - directory is not empty`);
  } else {
    // Delete the target directory
    const targetDirectory = directories.pop();
    delete currentDirectory[targetDirectory];
    console.log(`Deleted ${path}`);
  }
}



// Process the CREATE command
processCommand("car/book/boy");
processCommand("train/pencil");

// console.log(fileDirectory);
console.log(JSON.stringify(fileDirectory, null, 2));


// Example usage:
deleteDirectory("car/book/boy");
console.log(JSON.stringify(fileDirectory, null, 2));