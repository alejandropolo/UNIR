console.log ("Hello World")

d3.json ("https://raw.githubusercontent.com/alejandropolo/UNIR/main/D3exam.json").then (function (datos){
    
    
    //cargamos el dataset de github
    
    
    console.log ("los datos ya se han recibido")
    
    //Se define el ancho y el alto de acorde a los requisitos
    var w = 400;
    var h = 700;
    var padding = 20; //Se introcuce el padding para que no toque con los laterales de la visualización
    var dataset = [
        [5, 1], [8, 2], [3, 3], [6, 4], [5, 5],
        [9,6], [10, 7], [4, 8], [1, 9], [5, 10]
      ];
    //Create SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    //Se crean las escalas correspondientes
    var xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                .range([padding, w - padding * 2]);

    var yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                .range([h - padding, padding]);

    var aScale = d3.scaleSqrt()
                .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                .range([0, 10]);

    var escalaColor = d3.scaleLinear ()
            .domain ([1, 5, 10])//las notas van del 1 al 10
            .range (["red", "grey", "green"])//escala de colores de rojo a verde

    //Define X axis
    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5); //Para fijar el numero de ticks

    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10);    
    
    //Create circles
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .transition()
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", function(d) {
            return aScale(d[1]);
        })
        .attr ("fill", function(d){
        return escalaColor(d[0]);
        });
    //Create labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .transition()
        .text(function(d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function(d) {
            return xScale(d[0]);
        })
        .attr("y", function(d) {
            return yScale(d[1]);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");
        //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
            
    svg.append("g")
        .attr("class","axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
})