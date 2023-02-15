const data = [55000, 48000, 27000, 66000, 90000];

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME1 = d3.select("#vis1")
                    .append("svg")
                        .attr("height", FRAME_HEIGHT)
                        .attr("width", FRAME_WIDTH)
                        .attr("class", "frame");

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const MAX_Y = d3.max(data, (d) => {return d;});
console.log("Max y: " + MAX_Y);

const Y_SCALE = d3.scaleLinear()
                    .domain([0, (MAX_Y + 10000)])
                    .range([0, VIS_HEIGHT]);
console.log(Y_SCALE(data[1]));


FRAME1.selectAll("points")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", MARGINS.right)
            .attr("cy", (d) => {
                return (Y_SCALE(d) + MARGINS.bottom)
            })
            .attr("r", 20)
            .attr("class", "point");

FRAME1.append("g")
        .attr("transform", 
            "translate(" + MARGINS.top + "," + (VIS_WIDTH + MARGINS.right + ")"))
            .call(d3.axisLeft(Y_SCALE).ticks(4))
                .attr("font-size", "20px");
