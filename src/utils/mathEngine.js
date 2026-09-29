// import { evaluate } from 'mathjs';

// export const MathEngine = {
//     /**
//      * Extracts variable names from a math string
//      */
//     extractVariables: (formulaString) => {
//         // Matches standard variable names (e.g., thermalPower, x, windowSize)
//         const matches = formulaString.match(/[a-zA-Z_][a-zA-Z0-9_]*/g);
//         // Filter out mathjs built-in functions like 'max', 'min', 'sum'
//         const builtIns = ['max', 'min', 'sum', 'abs', 'round', 'floor', 'ceil'];
//         return matches ? matches.filter(v => !builtIns.includes(v)) : [];
//     },

//     /**
//      * Creates a safe scope by injecting 0 for any missing variables
//      */
//     buildSafeScope: (formulaString, scope) => {
//         const safeScope = { ...scope };
//         const variables = MathEngine.extractVariables(formulaString);

//         variables.forEach(v => {
//             if (safeScope[v] === undefined) {
//                 safeScope[v] = 0; // Default undefined AI variables to 0
//             }
//         });

//         return safeScope;
//     },

//     processFormula: (formulaString, scope = {}) => {
//         const result = {};
//         if (!formulaString || typeof formulaString !== 'string') return result;

//         try {
//             // Build a mathematically safe scope
//             const safeScope = MathEngine.buildSafeScope(formulaString, scope);

//             // Extract the target variable name (e.g., "velocity" from "velocity = d/t")
//             let expressionToEvaluate = formulaString;
//             let targetVariable = null;

//             if (formulaString.includes('=')) {
//                 const parts = formulaString.split('=');
//                 targetVariable = parts[0].trim();
//                 expressionToEvaluate = parts[1].trim();
//             }

//             // Evaluate the clean expression
//             const value = evaluate(expressionToEvaluate, safeScope);

//             if (targetVariable) {
//                 result[targetVariable] = value;
//             }

//         } catch (error) {
//             console.warn(`[Math Engine] Failed on: "${formulaString}"`, error.message);
//         }

//         return result;
//     },

//     evaluateCondition: (conditionString, scope = {}) => {
//         try {
//             if (!conditionString) return false;

//             // Build a mathematically safe scope for gates (e.g., "oxygenLevel < 5")
//             const safeScope = MathEngine.buildSafeScope(conditionString, scope);

//             return Boolean(evaluate(conditionString, safeScope));
//         } catch (error) {
//             console.warn(`[Math Engine] Condition failed: "${conditionString}"`, error.message);
//             return false;
//         }
//     }
// };


import { evaluate, parse } from 'mathjs';

export const MathEngine = {
    /**
     * Extracts variable names safely using an Abstract Syntax Tree (AST).
     * Bypasses native functions (sin, cos) and logical operators (and, true) inherently.
     */
    extractVariables: (expressionString) => {
        try {
            const variables = new Set();
            const node = parse(expressionString);

            // Filter the AST specifically for isolated symbols, ignoring function calls
            node.filter(n => n.isSymbolNode).forEach(n => {
                // mathjs native constants must be explicitly ignored so they aren't zeroed out
                const nativeConstants = ['true', 'false', 'null', 'undefined', 'pi', 'e'];
                if (!nativeConstants.includes(n.name)) {
                    variables.add(n.name);
                }
            });
            return Array.from(variables);
        } catch (e) {
            // Fails safe during active user typing (incomplete syntax)
            return [];
        }
    },

    buildSafeScope: (formulaString, scope) => {
        const safeScope = { ...scope };
        const variables = MathEngine.extractVariables(formulaString);

        variables.forEach(v => {
            if (safeScope[v] === undefined) {
                safeScope[v] = 0; // Retains the AI default behavior safely
            }
        });

        return safeScope;
    },

    processFormula: (formulaString, scope = {}) => {
        const result = {};
        if (!formulaString || typeof formulaString !== 'string') return result;

        try {
            let expressionToEvaluate = formulaString;
            let targetVariable = null;

            // STRICT ASSIGNMENT SPLIT: Matches exactly "var = expr"
            // Completely ignores comparison operators like "==", ">=", or "<="
            const assignmentMatch = formulaString.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)$/);

            if (assignmentMatch) {
                targetVariable = assignmentMatch[1].trim();
                expressionToEvaluate = assignmentMatch[2].trim();
            }

            const safeScope = MathEngine.buildSafeScope(expressionToEvaluate, scope);
            let value = evaluate(expressionToEvaluate, safeScope);

            // ZERO-DIVISION PROTECTION: Catch Infinity or NaN before it crashes downstream UI
            if (typeof value === 'number' && !Number.isFinite(value)) {
                value = 0;
            }

            if (targetVariable) {
                result[targetVariable] = value;
            } else {
                // Fallback key prevents data loss if the user types a raw expression without an '='
                result['out'] = value;
            }

        } catch (error) {
            console.warn(`[Math Engine] Failed on: "${formulaString}"`, error.message);
        }

        return result;
    },

    evaluateCondition: (conditionString, scope = {}) => {
        try {
            if (!conditionString) return false;

            const safeScope = MathEngine.buildSafeScope(conditionString, scope);
            const value = evaluate(conditionString, safeScope);

            return Boolean(value);
        } catch (error) {
            console.warn(`[Math Engine] Condition failed: "${conditionString}"`, error.message);
            return false;
        }
    }
};