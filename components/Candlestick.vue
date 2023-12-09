<template>
	<div>
		<!-- <v-overlay>
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay> -->
		<div class="chart" ref="chart"></div>
	</div>
</template>

<script>
    import * as d3 from "d3";
    import data from '../data.json';

    export default {
        name: "CandlestickChart",
        computed: {
            formattedStockData() {
                let dataArray = [];
                const time = "Time Series (Daily)";
                const jsonArray = JSON.parse(JSON.stringify(data))[time];

                for (let data in jsonArray) {
                    let newObject = {
                        Date: data,
						Open: jsonArray[data]["1. open"],
						High: jsonArray[data]["2. high"],
						Low: jsonArray[data]["3. low"],
						Close: jsonArray[data]["4. close"],
						Volume: jsonArray[data]["5. volume"],
                    };
                    dataArray.push(newObject);
                }

                return dataArray.splice(0, 30).reverse();
            }
        },
        mounted() {
            if (document.getElementById("chartsvg")) {
                    const chartsvg = document.getElementById("chartsvg");
                    this.$refs.chart.removeChild(chartsvg);
                }

                let margin = { top: 0, right: 0, bottom: 0, left: 0 };
                let padding = { top: 40, right: 50, bottom: 0, left: 50 };
                let width = 1000;
                let height = 500;
                let space = 10;
                let volWidth = width;
                let volHeight = 100;
                let candlesHeight = height + margin.top;
                let chartHeight = candlesHeight + space + volHeight;
                let chartWidth = width + padding.left + padding.right;
                let svgWidth = chartWidth + margin.left + margin.right;
                let svgHeight = chartHeight + margin.top + margin.bottom;
                let maxList = [];
                let minList = [];

                this.formattedStockData.forEach((item) => {
                    maxList.push(Math.max(item["Open"], item["Close"], item["High"]));
                    minList.push(Math.min(item["Open"], item["Close"], item["Low"]));
                });

                this.formattedStockData.map((data) => data["Volume"]);
                let max_value = Math.max(...maxList);
                let min_value = Math.min(...minList);
                let maxVol = Math.max(
                    ...this.formattedStockData.map((data) => data["Volume"])
                );
                let minVol = Math.min(
                    ...this.formattedStockData.map((data) => data["Volume"])
                );

                console.log('$refs.chart', this.$refs.chart);
                const svg = d3
                    .select(this.$refs.chart)
                    .append("svg")
                    .attr("id", "chartsvg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);
                svg
                    .append("rect")
                    .attr("width", chartWidth)
                    .attr("height", chartHeight)
                    .attr("rx", 7)
                    .attr("ry", 7)
                    .attr("fill", "white")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    const base = svg
                        .append("g")
                        .attr("width", width)
                        .attr("height", height)
                        .attr(
                            "transform",
                            "translate(" +
                                (margin.left + padding.left) +
                                "," +
                                (margin.top + padding.top) +
                                ")"
                    );

                const x = d3
                    .scaleBand()
                    .domain(this.formattedStockData.map((d) => d["Date"]))
                    .range([0, width]);

                base
                    .append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "rotate(-25)")
                    .style("text-anchor", "end");

                const y = d3
                    .scaleLinear()
                    .domain([min_value, max_value])
                    .range([height, 0]);

                base.append("g").call(d3.axisLeft(y));

                base
				.selectAll("candles")
				.data(this.formattedStockData)
				.enter()
				.append("rect")
				.attr("x", function (d) {
					return x(d["Date"]);
				})
				.attr("y", function (d) {
					return y(d3.max([parseFloat(d["Open"]), parseFloat(d["Close"])]));
				})
				.attr("width", 10)
				.attr("height", function (d) {
					return Math.abs(y(d["Open"]) - y(d["Close"]));
				})
				.attr("rx", 3)
				.classed("rise", function (d) {
					return d["Close"] > d["Open"];
				})
				.classed("fall", function (d) {
					return d["Open"] > d["Close"];
				})
				.attr(
					"transform",
					"translate(" +
						(width / this.formattedStockData.length / 2 - 5.5) +
						")"
				);

			base
				.selectAll("sticks")
				.data(this.formattedStockData)
				.enter()
				.append("rect")
				.attr("x", function (d) {
					return x(d["Date"]);
				})
				.attr("y", function (d) {
					if (parseFloat(d["High"]) > parseFloat(d["Low"])) {
						return y(d["High"]);
					} else {
						return y(d["Low"]);
					}
				})
				.attr("width", 2)
				.attr("height", function (d) {
					return y(d["Low"]) - y(d["High"]);
				})
				.classed("rise", function (d) {
					return d["Close"] > d["Open"];
				})
				.classed("fall", function (d) {
					return d["Open"] > d["Close"];
				})
				.attr(
					"transform",
					"translate(" +
						(width / this.formattedStockData.length / 2 - 1.5) +
						")"
				);
        }
    }
</script>

<style>
.container {
	position: relative;
}

.chart {
    border: 1px solid black;
}
.rise {
	fill: rgb(1, 120, 1);
}
.fall {
	fill: rgb(198, 0, 0);
}
.butons-enter-active {
	animation-delay: 0.5s;
	animation: toUp 1s ease-in-out;
}
@keyframes toUp {
	from {
		transform: translateY(200%);
		opacity: 0;
		z-index: -2;
	}
	to {
		transform: translateY(0);
		opacity: 1;
		z-index: 2;
	}
}
</style>