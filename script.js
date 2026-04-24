const cards = document.getElementById("cards");
const chartCanvas = document.getElementById("chart");
const intersections = [1, 2, 3, 4];
let trafficChart;
function generateVehicleCount() {
    return Math.floor(Math.random() * 61);
}
function getTrafficLevel(count) {
    if (count <= 20) return "LOW";
    if (count <= 40) return "MEDIUM";
    return "HIGH";
}
function getGreenTime(level) {
    if (level === "LOW") return 20;
    if (level === "MEDIUM") return 35;
    return 60;
}
function getColor(level) {
    if (level === "LOW") return "red";
    if (level === "MEDIUM") return "yellow";
    return "green";
}
function renderCards(data) {
    cards.innerHTML = data.map(item => `
        <div class="glass">
            <h2>Intersection ${item.id}</h2>
            <p>Vehicles: <strong>${item.count}</strong></p>
            <p>Level: <strong class="${item.color}-text">${item.level}</strong></p>
            <p>Green Time: <strong>${item.time}s</strong></p>

            <div class="lights">
                <div class="light red ${item.color === 'red' ? 'active' : ''}"></div>
                <div class="light yellow ${item.color === 'yellow' ? 'active' : ''}"></div>
                <div class="light green ${item.color === 'green' ? 'active' : ''}"></div>
            </div>
        </div>
    `).join("");
}
function renderChart(data) {
    const values = data.map(item => item.count);
    if (!trafficChart) {
        trafficChart = new Chart(chartCanvas, {
            type: "bar",
            data: {
                labels: intersections.map(id => `Intersection ${id}`),
                datasets: [{
                    label: "Vehicle Count",
                    data: values,
                    backgroundColor: "#60a5fa",
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 60
                    }
                }
            }
        });
    } else {
        trafficChart.data.datasets[0].data = values;
        trafficChart.update();
    }
}
function updateSystem() {
    const data = intersections.map(id => {
        const count = generateVehicleCount();
        const level = getTrafficLevel(count);
        const time = getGreenTime(level);
        const color = getColor(level);
        return { id, count, level, time, color };
    });
    renderCards(data);
    renderChart(data);
}
updateSystem();
setInterval(updateSystem, 3000);
