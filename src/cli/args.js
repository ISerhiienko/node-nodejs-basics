const parseArgs = () => {
    const [, , ...commandLineArgs] = process.argv;

    const parsedArgs = parseCommandLineArgs(commandLineArgs);
    printParsedArgs(parsedArgs);
  };
  
  const parseCommandLineArgs = (args) => {
    const parsedArgs = {};
  
    for (let i = 0; i < args.length; i += 2) {
      const argName = cleanArgName(args[i]);
      const argValue = args[i + 1];
      parsedArgs[argName] = argValue;
    }
  
    return parsedArgs;
  };
  
  const cleanArgName = (arg) => arg.replace(/^--/, '');
  
  const printParsedArgs = (parsedArgs) => {
    for (const [argName, argValue] of Object.entries(parsedArgs)) {
      console.log(`${argName} is ${argValue}`);
    }
  };

parseArgs();