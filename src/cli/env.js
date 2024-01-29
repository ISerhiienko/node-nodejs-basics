const parseEnv = () => {
    const parsedVars = {};

    for (const key in process.env) {
      if (key.startsWith('RSS_')) {
        const varName = key;
        const varValue = process.env[key];
        parsedVars[varName] = varValue;
      }
    }
  
    for (const [varName, varValue] of Object.entries(parsedVars)) {
      console.log(`${varName}=${varValue}`);
    }
};

parseEnv();