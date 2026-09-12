import { evaluate } from 'mathjs';

export const MathEngine = {
    /**
     * Processes an array of AI-generated formulas sequentially.
     * @param {Array<string>} formulas - e.g., ["accel = thrust / mass", "gForce = accel / 9.8"]
     * @param {object} scope - The globalMetrics dictionary from Zustand
     * @returns {object} - A dictionary of the newly calculated results
     */
    processFormulas: (formulas, scope = {}) => {
        const results = {};

        if (!formulas || !Array.isArray(formulas)) return results;

        formulas.forEach(formulaString => {
            try {
                // Evaluates the math and MUTATES the shared scope
                const value = evaluate(formulaString, scope);

                // Extract the variable name (e.g., "gForce")
                if (formulaString.includes('=')) {
                    const variableName = formulaString.split('=')[0].trim();
                    results[variableName] = value;
                }
            } catch (error) {
                console.warn(`[Math Engine] Failed on: "${formulaString}"`, error.message);
            }
        });

        return results; // Returns { acceleration: 50, gForce: 5.1 }
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