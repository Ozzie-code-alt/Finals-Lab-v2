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
    const expectedTypes = ['Identifier', 'Operator', 'Operator', 'Operator', 'Operator', 'Literal', 'Literal', 'Literal'];
    // removed local txt file for parsing here, because why dfuq? 
    // console.log(expectedSet)
    const tokenSet = new Set(tokens.map(token => token.type));

    for (const expectedType of expectedTypes) {
        if (!tokenSet.has(expectedType)) {
            return false;
        }
    }

    return true;
}


const expression = "number = (x + 10) * 8";
const tokens = identifyTokens(expression);


console.log("############################ Identified Tokens with their Types #########################################");
console.log(tokens.map(token => `${token.type}: ${token.value}`).join('\n'));


const isSyntaxValid = syntaxChecker(tokens);
console.log("\n ########################## Syntax Check Result ########################################");
console.log(isSyntaxValid ? "Syntax is valid." : "Syntax is not valid.");

if (isSyntaxValid) {
    console.log("\n ###################################### DATA TYPES ###########################################")
    const identifierTypes = tokens
        .filter(token => token.type === 'Identifier')
        .map(token => token.value + ": " + typeof token.value);

    const literalTypes = tokens
        .filter(token => token.type === 'Literal')
        .map(token => token.value + ": " + (token.value.includes('.') ? 'int' : 'int'));

    console.log("\nIdentifier Types:");
    console.log(identifierTypes.join('\n'));

    console.log("\nLiteral Types:");
    console.log(literalTypes.join('\n'));
}