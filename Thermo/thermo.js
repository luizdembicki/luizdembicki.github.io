class Compound {
    constructor(name, formula, MM, antoineParams, Pc, Tc, Zc, Hf = 0) {
        this.name = name;
        this.formula = formula;
        this.MM = MM; // Molecular Mass
        this.antoineParams = antoineParams; // Antoine equation parameters
        this.Pc = Pc; // Critical Pressure in Pa
        this.Tc = Tc; // Critical Temperature in K
        this.Zc = Zc; // Critical Compressibility Factor
    }

    Antoine(T) {
        // Antoine equation: log10(P) = A - B / (T + C)
        const { A, B, C } = this.antoineParams;
        return Math.pow(10, A - B / (T + C)); // Returns pressure
    }

    AntoineInverse(P) {
        // Inverse Antoine equation: T = B / (A - log10(P)) - C
        const { A, B, C } = this.antoineParams;
        return B / (A - Math.log10(P)) - C; // Returns temperature in K
    }

    State (T, P) {
        // Returns the state of the compound based on temperature and pressure
        if (P < 0 || T < 0) {
            throw new Error("Pressure and Temperature must be non-negative.");
        }
        if (T > this.Tc && P < this.Pc) {
            return "Supercritical Fluid"; // Above critical temperature, supercritical fluid state
        }
        else if(T > this.Tc) {
            return "Gas"; // Above critical temperature, gas state
        }
        else if (T < this.Tc) {
            if (P > this.Pc) {
                return "Liquid"; // Below critical temperature and above critical pressure, gas state
            }
            else if (P < this.Antoine(T)) {
                return "Gas"; // Below critical temperature and below critical pressure, gas state
            }
            else {
                return "Liquid"; // Below critical temperature and above Antoine pressure, liquid state
            }
        }
    }
}

let Water = new Compound(
    "Water",
    "H2O",
    18.01528,
    { A: 8.07131, B: 1730.63, C: 233.426 }, // Antoine parameters for water
    22.064e6, // Critical Pressure in Pa
    647.096, // Critical Temperature in K
    0.229, // Critical Compressibility Factor
    -285830 // Enthalpy of formation in J/mol
);

//console.log("Water State at 300K and 101325Pa: %s\n", Water.State(300, 101325)); // Should print "Liquid"