function identifyTokens(expression) {
    
    const regexPatterns = [
        { pattern: /-?\b\d+(\.\d+)?\b/g, type: 'Literal' }, 
        { pattern: /[+\-*\/\(\)]/g, type: 'Operator' },      // Add Equal Here for Operator Do Later... 
        { pattern: /\b[a-zA-Z_]\w*\b/g, type: 'Identifier' }  
    ];

    const tokens = [];


    regexPatterns.forEach(({ pattern, type }) => {
        const matches = expression.match(pattern);
        if (matches) {
            tokens.push(...matches.map(match => ({ type, value: match })));
        }
    });

    return tokens;
}

function syntaxChecker(tokens) {
    const expectedTypes = ['Identifier', 'Identifier', 'Operator', 'Operator', 'Operator', 'Operator', 'Literal', 'Literal'];
    const expectedSet = new Set(expectedTypes);
    const tokenSet = new Set(tokens.map(token => token.type));

    for (const expectedType of expectedSet) {
        if (!tokenSet.has(expectedType)) {
            return false;
        }
    }

    const identifierCount = tokens.filter(token => token.type === 'Identifier').length;
    const operatorCount = tokens.filter(token => token.type === 'Operator').length;
    const literalCount = tokens.filter(token => token.type === 'Literal').length;
    console.log(identifierCount)
    console.log(operatorCount)
    console.log(literalCount)
    // check counter
    if (identifierCount !== 2 || operatorCount !== 4 || literalCount !== 2) {
        return false;
    }

    return true;
}



const expression = "number = (x + 10) * 8.9";
const expression1 = "number = (x + 10) * 8";
const expression2 = "thisIsInvalid = x + 10 * e";
const expression3 = "thisIsInvalid = x + 10 * (8 + 10)";
const tokens = identifyTokens(expression);


console.log("############################ Identified Tokens with their Types #########################################");
console.log(tokens.map(token => `${token.type}: ${token.value}`).join('\n'));


const isSyntaxValid = syntaxChecker(tokens);
console.log("\n ########################## Syntax Check Result ########################################");
console.log(isSyntaxValid ? "Syntax is valid." : "Syntax is not valid.");

if (isSyntaxValid) {
    console.log("\n ###################################### DATA TYPES ###########################################")
    
    const literalTypes = tokens
    .filter(token => token.type === 'Literal')
    .map(token => {
        const isFloat = token.value.includes('.');
        return token.value + ": " + (isFloat ? 'float' : 'int');
    });

    const container = literalTypes[1].split(" ").pop() // this is our float value grabber 
    // console.log(container)
    const identifierTypes = tokens
    .filter(token => token.type === 'Identifier')
    .map(token => token.value + ": " + "int");
    
    const container2 = identifierTypes
    const container3 = identifierTypes[0].split(" ").shift()
    // console.log(container3 )
    const indexNum = container2.indexOf("number: int")
    if(indexNum > -1){ // if true
        identifierTypes.splice(indexNum, 1)
    }
    // console.log(identifierTypes)
        
    console.log("\nIdentifier Types:");
    console.log(`${container3} ${container}`)
    console.log(identifierTypes.join('\n'))
    console.log("\nLiteral Types:");
    console.log(literalTypes.join('\n'));
}
