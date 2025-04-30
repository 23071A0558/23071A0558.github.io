const API_KEY = '8c72a5b86a406d4281b35d5f99200149';
const fetchWeatherData = async (city) => {
const response = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
);
if (!response.ok) throw new Error("City not found");
return await response.json();
};

const prepareChartData = (data) => {
return {
labels: data.list.slice(0, 8).map(item => item.dt_txt),
temps: data.list.slice(0, 8).map(item => item.main.temp)
};
};

const drawChart = ({ labels, temps }) => {
const ctx = document.getElementById("weatherChart").getContext("2d");
new Chart(ctx, {type: "line",data: {labels: labels,datasets: [{label: "Temperature (°C)",data: temps,backgroundColor: 
"#12345855",
borderColor: "#581212",
borderWidth: 2,
fill: true
}]
},
options: {responsive: true,plugins: {legend: {labels: {color: "#000"}}},
scales: {x: {ticks: {color: "#000"}},y: {beginAtZero: false,ticks: {color: "#000"
}
}}
}});};
document.getElementById("getWeatherBtn").addEventListener("click", async () => {
const city = document.getElementById("cityInput").value;
if (!city) return alert("Please enter a city");
try {
const data = await fetchWeatherData(city); 
const chartData = prepareChartData(data); 
drawChart(chartData); 
} catch (error) {
alert(error.message);
}
});