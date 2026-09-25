// import { evaluate } from 'mathjs';

// export const MathEngine = {
//     /**
//      * Processes a single math formula string.
//      * @param {string} formulaString - e.g., "velocity = distance / time"
//      * @param {object} scope - The globalMetrics dictionary from Zustand
//      * @returns {object} - A dictionary of the newly calculated result
//      */
//     processFormula: (formulaString, scope = {}) => {
//         const result = {};
//         if (!formulaString || typeof formulaString !== 'string') return result;

//         try {
//             // Evaluates the math and MUTATES the shared scope
//             const value = evaluate(formulaString, scope);

//             // Extract the variable name (e.g., "velocity")
//             if (formulaString.includes('=')) {
//                 const variableName = formulaString.split('=')[0].trim();
//                 result[variableName] = value;
//             }
//         } catch (error) {
//             console.warn(`[Math Engine] Failed on: "${formulaString}"`, error.message);
//         }

//         return result;
//     },

//     evaluateCondition: (conditionString, scope = {}) => {
//         try {
//             if (!conditionString) return false;
//             return Boolean(evaluate(conditionString, scope));
//         } catch (error) {
//             console.warn(`[Math Engine] Condition failed: "${conditionString}"`, error.message);
//             return false;
//         }
//     }
// };

import { evaluate } from 'mathjs';

export const MathEngine = {
    /**
     * Extracts variable names from a math string
     */
    extractVariables: (formulaString) => {
        // Matches standard variable names (e.g., thermalPower, x, windowSize)
        const matches = formulaString.match(/[a-zA-Z_][a-zA-Z0-9_]*/g);
        // Filter out mathjs built-in functions like 'max', 'min', 'sum'
        const builtIns = ['max', 'min', 'sum', 'abs', 'round', 'floor', 'ceil'];
        return matches ? matches.filter(v => !builtIns.includes(v)) : [];
    },

    /**
     * Creates a safe scope by injecting 0 for any missing variables
     */
    buildSafeScope: (formulaString, scope) => {
        const safeScope = { ...scope };
        const variables = MathEngine.extractVariables(formulaString);

        variables.forEach(v => {
            if (safeScope[v] === undefined) {
                safeScope[v] = 0; // Default undefined AI variables to 0
            }
        });

        return safeScope;
    },

    processFormula: (formulaString, scope = {}) => {
        const result = {};
        if (!formulaString || typeof formulaString !== 'string') return result;

        try {
            // Build a mathematically safe scope
            const safeScope = MathEngine.buildSafeScope(formulaString, scope);

            // Extract the target variable name (e.g., "velocity" from "velocity = d/t")
            let expressionToEvaluate = formulaString;
            let targetVariable = null;

            if (formulaString.includes('=')) {
                const parts = formulaString.split('=');
                targetVariable = parts[0].trim();
                expressionToEvaluate = parts[1].trim();
            }

            // Evaluate the clean expression
            const value = evaluate(expressionToEvaluate, safeScope);

            if (targetVariable) {
                result[targetVariable] = value;
            }

        } catch (error) {
            console.warn(`[Math Engine] Failed on: "${formulaString}"`, error.message);
        }

        return result;
    },

    evaluateCondition: (conditionString, scope = {}) => {
        try {
            if (!conditionString) return false;

            // Build a mathematically safe scope for gates (e.g., "oxygenLevel < 5")
            const safeScope = MathEngine.buildSafeScope(conditionString, scope);

            return Boolean(evaluate(conditionString, safeScope));
        } catch (error) {
            console.warn(`[Math Engine] Condition failed: "${conditionString}"`, error.message);
            return false;
        }
    }
};