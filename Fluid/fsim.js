const N = 100; // Grid size
const canvas = document.getElementById("fluidCanvas"); 
canvas.width = N; 
canvas.height = N;

const ctx = canvas.getContext("2d");
let imageData = ctx.createImageData(N, N); // 1 pixel per grid cell

let density = new Float32Array(N * N);

function IX(x, y) {
    return x + y * N;
}

for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
        let d = Math.exp(-((x - N/2) ** 2 + (y - N/2) ** 2) / 200);
        density[IX(x, y)] = d;
    }
}

function renderDensity() {
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            let d = Math.min(1, Math.max(0, density[IX(x, y)]));
            let color = d * 255;

            let i = (x + y * N) * 4;
            imageData.data[i + 0] = color; // R
            imageData.data[i + 1] = color; // G
            imageData.data[i + 2] = color; // B
            imageData.data[i + 3] = 255;   // A
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

renderDensity();
