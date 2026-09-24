import { evaluate } from 'mathjs';

export const MathEngine = {
    /**
     * Processes a single math formula string.
     * @param {string} formulaString - e.g., "velocity = distance / time"
     * @param {object} scope - The globalMetrics dictionary from Zustand
     * @returns {object} - A dictionary of the newly calculated result
     */
    processFormula: (formulaString, scope = {}) => {
        const result = {};
        if (!formulaString || typeof formulaString !== 'string') return result;

        try {
            // Evaluates the math and MUTATES the shared scope
            const value = evaluate(formulaString, scope);

            // Extract the variable name (e.g., "velocity")
            if (formulaString.includes('=')) {
                const variableName = formulaString.split('=')[0].trim();
                result[variableName] = value;
            }
        } catch (error) {
            console.warn(`[Math Engine] Failed on: "${formulaString}"`, error.message);
        }

        return result;
    },

    evaluateCondition: (conditionString, scope = {}) => {
        try {
            if (!conditionString) return false;
            return Boolean(evaluate(conditionString, scope));
        } catch (error) {
            console.warn(`[Math Engine] Condition failed: "${conditionString}"`, error.message);
            return false;
        }
    }
};