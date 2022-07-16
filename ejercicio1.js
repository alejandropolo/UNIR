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

			//Se crean las escalas correspondientes
			var xScale = d3.scaleLinear()
								 .domain(d3.extent(datos, d => (d.nota)))
								 .range([padding, w - padding * 2]);

			var yScale = d3.scaleLinear()
								 .domain(d3.extent(datos, d => (d.ranking)))
								 .range([h - padding, padding]);

			var aScale = d3.scaleSqrt()
								 .domain(d3.extent(datos, d => (d.nota)))
								 .range([0, 10]);

            var escalaColor = d3.scaleLinear ()
                                .domain ([1, 5, 10])//las notas van del 1 al 10
                                .range (["red", "grey", "green"])//escala de colores de rojo a azul
			//Define X axis
			var xAxis = d3.axisBottom()
							.scale(xScale)
                            .ticks(10); //Para fijar el numero de ticks
            
            var yAxis = d3.axisLeft()
                          .scale(yScale)
                          .ticks(10);

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create circles
			svg.selectAll("circle")
			   .data(datos)
			   .enter()
			   .append("circle")
               .transition()
			   .attr("cx", function(d) {
			   		return xScale(d.nota);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d.ranking);
			   })
			   .attr("r", function(d) {
			   		return aScale(d.nota);
			   })
               .attr ("fill", function(d){
                return escalaColor(d.nota);
               });

			//Create labels
			svg.selectAll("text")
			   .data(datos)
			   .enter()
			   .append("text")
               .transition()
			   .text(function(d) {
			   		return d.nota + "," + d.ranking;
			   })
			   .attr("x", function(d) {
			   		return xScale(d.nota);
			   })
			   .attr("y", function(d) {
			   		return yScale(d.ranking);
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