// Vapour boundary https://doi.org/10.1115/1.483186
function vapourBoundary(T) {
    const Tastk = 1; // K 
    const Pastk = 1e6; // Pa
    let Theta = T/Tastk;
    if (T > 623.15){ // 623.15K @ P=16.5292 MPa < T < 863.15K @ 100MPa
        let pi = 0.34805185628969e3 + ( - 0.11671859879975e1 * Theta) + (0.10192970039326e-2 * ((Theta ** 2)));
        return Pastk * pi; // Returns pressure in Pa
        }// test case T = 0.623150000e3 K, P = 0.165291643e2 MPa
    else { // 273.15 K < T < 647.096 K
        let theta = Theta + (-0.23855557567849 / (Theta - 0.65017534844798e3))
        let A = theta ** 2 + 0.11670521452767e4 * theta - 0.72421316703206e6
        let B = (- 0.17073846940092e2) * (theta ** 2) + 0.12020824702470e5 * theta - 0.32325550322333e7
        let C = 0.14915108613530e2 * (theta ** 2) + (- 0.48232657361591e4) * theta + 0.40511340542057e6
        return Pastk * (( 2 * C / (- B + (( B ** 2 - (4 * A * C) ) ** (1/2)))) ** 4)
    } // test cases: 300K P = 0.353658941e-2 MPa, 500K P = 0.263889776e1 MPa, 600K P = 0.123443146e2 MPa
}
// console.log("Test case 1: 300K: %s, Test case 2: %s, Test case 3: %s", vapourBoundary(300) / 1e6, vapourBoundary(500) / 1e6, vapourBoundary(600) / 1e6); // Should print all zeros
// console.log("Vapour Boundary at 623.15K: %s MPa", vapourBoundary(623.15) /1e6 ); // Should print 165291.643 Pa

// Sublimation boundary https://doi.org/10.1063
function sublimationBoundary(T) {
    const Tastk = 273.16; // K 
    const Pastk = 611.657; // Pa
    let theta = T/Tastk;
    const ai = [-0.212144006e2, 0.273203819e2, -0.610598130e1]
    const bi = [0.333333333e-2, 0.120666667e1, 0.170333333e1];
    let lnpi = 0;
    for (let i = 0; i < 3; i++) {
        lnpi += ai[i] * (theta ** bi[i]);
    }
    let pi = Math.exp(lnpi / theta); // Returns pressure in Pa 
    return Pastk * pi ; // Returns pressure in Pa
} // test case T = 230.0 K, P = 8.94735 Pa
// console.log("Sublimation Boundary at 230.0K: %s Pa", sublimationBoundary(230.0)); // Should print 8.94735 Pa

// Ice boundary Ih https://doi.org/10.1063
function iceBoundary(T) {
    const Tastk = 273.16; // K 
    const Pastk = 611.657; // Pa
    let theta = T/Tastk;
    const ai = [ 0.119539337e7, 0.808183159e5, 0.333826860e4]
    const bi = [ 0.300000e1, 0.257500e2, 0.103750e3];
    let pi = 1;
    for (let i = 0; i < 3; i++) {
        pi += ai[i] * (1 - (theta ** bi[i]));
    } 
    return Pastk * pi; // Returns pressure in Pa
} // test case T = 260.0 K, P = 138.268 MPa
// console.log("Ice Boundary Ih at 260.0K: %s Pa", iceBoundary(260.0)); // Should print 138268000 Pa

