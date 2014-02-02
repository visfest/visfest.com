// create small multiples
var sm_svg = d3.select("#smallmultiples").append("svg")
        .attr("width", 430)
        .attr("height", 100)

      // create a map
      var width = 470,
      height = 240;

      // weird arbitrary data
      // same data, 4 different charts
      // magnitude: ratio : ratio
      var datums = [{a:0.2,b:0.9},
                    {a:0.4,b:0.7},
                    {a:0.3,b:0.5},
                    {a:0.7,b:0.6},
                    {a:0.3,b:0.6},
                    {a:0.6,b:0.9},
                    {a:0.4,b:0.8},
                    {a:0.8,b:0.8},
                    {a:0.3,b:0.9}
                   ]

      var MUNI_LIGHT_BLUE = "#48a5cb";
      var MUNI_DARK_BLUE = "#608cdb";
      var MUNI_RED = "#c95565";
      var MUNI_YELLOW = "#f0b63b";
      // chart 1: big arc
      var chart1 = sm_svg.append("g").attr("transform", "translate(0,0)");
      chart1.append("rect").attr({"width":100,"height":100}).style("fill",MUNI_LIGHT_BLUE);
      var bigArc = d3.svg.arc()
                    .innerRadius(function(d,i) { return 1 + i * 5 })
                    .outerRadius(function(d,i) { return 1 + i * 5 + 2 })
                    .startAngle(function(d) { return 2 * Math.PI * d.a }).endAngle(function(d) { return 2 * Math.PI * (d.a + d.b) });

      chart1.selectAll(".bigArcPath").data(datums).enter().append("path").attr("d",bigArc).attr("transform","translate(50,50)");
      
      // chart 2: bar
      var chart2 = sm_svg.append("g").attr("transform", "translate(110,0)");
      chart2.append("rect").attr({"width":100,"height":100}).style("fill",MUNI_LIGHT_BLUE);

      var bar_gs = chart2.selectAll(".barG").data(datums).enter().append("g")
        .attr("transform",function(d,i) { return "translate(" + (13 + (i % 3) * 30) + "," + (10 + 30 * Math.floor(i / 3)) + ")" });
      bar_gs.append("rect").attr("width",6).attr("height", function(d) { return d.a * 20 }).attr("y", function(d) { return 20 - d.a * 20 }).style("fill", "black");
      bar_gs.append("rect").attr("width",6).attr("height", function(d) { return d.b * 20 }).attr("y", function(d) { return 20 - d.b * 20 }).attr("x",8).style("fill", "#eee");
      

      // chart 3: small arc
      var chart3 = sm_svg.append("g").attr("transform", "translate(220,0)");

      chart3.append("rect").attr({"width":100,"height":100}).style("fill",MUNI_LIGHT_BLUE);

      var smallArc = d3.svg.arc()
                      .innerRadius(0)
                      .outerRadius(10)
                      .startAngle(0).endAngle(function(d) { return 2 * Math.PI * d.b });
      var smallarc_g = chart3.selectAll(".smallArcPath").data(datums).enter().append("g")
        .attr("transform",function(d,i) { return "translate(" + (20 + (i % 3) * 30) + "," + (20 + 30 * Math.floor(i / 3)) + ")" });
      smallarc_g.append("path").attr("d", smallArc);
      smallarc_g.append("circle").attr("r", function(d) { return 10 * d.a }).style("fill",MUNI_LIGHT_BLUE);

      // chart 4: ??
      var chart4 = sm_svg.append("g").attr("transform", "translate(330,0)");
      chart4.append("rect").attr({"width":100,"height":100}).style("fill",MUNI_LIGHT_BLUE);


      horiz_g = chart4.selectAll(".horizG").data(datums).enter().append("g")
        .attr("transform", function(d,i) { return "translate(10," + (13 + i * 9) + ")" });
      horiz_g.append("rect").attr("width",function(d) { return 50 * d.a }).attr("x", 0).attr("height", 3);
      horiz_g.append("rect").attr("width",function(d) { return 50 * d.b }).attr("x", function(d) { return 50 * d.a }).attr("height", 3).style("fill", "#eee");

      d3.unconf = function() { alert("You win") };

      var map = L.map('map_div').setView([37.782254,-122.39124], 13);
          L.tileLayer('http://{s}.tile.cloudmade.com/aa0e217a6d1d4c6a847dbb5de74b0227/997/256/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
          maxZoom: 18
      }).addTo(map);
      L.marker([37.782254,-122.39124]).addTo(map)
        .bindPopup('GitHub HQ')
