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

      var svg = d3.select("#map_div").append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("background-color", "white");

      var proj = d3.geo.transverseMercator().rotate([122,0]);
      var path = d3.geo.path().projection(proj);

      d3.json("map/simple_sf_coastline.geojson", function(error, j) {
        proj.scale(1).translate([0,0]);
        var coast = j;
        
        var fudge_scale = 5.0;
        var fudge_y = 240;
        var fudge_x = 150;
        var b = path.bounds(coast),
            s = fudge_scale / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2 + fudge_x, (height - s * (b[1][1] + b[0][1])) / 2 + fudge_y];

        proj.scale(s)
          .translate(t);
      
        svg.append("path")
          .datum(coast)
          .attr("d", path)
          .style("fill","#eee")
          .style("stroke-width", "1px")
          .style("stroke","#aaa")

        // 37.782254,-122.39124
        var coords = [-122.39124,37.782254]
        var thecircles = [10,20,30,40,50];
        var theCircle = svg.selectAll(".ring").data(thecircles).enter().append("circle")
          .attr("transform", function(d) { return "translate(" + proj(coords) + ")" })
          .style("fill","none")
          .attr("stroke-width", "2px")
          .attr("stroke", MUNI_YELLOW)
          .attr("r", function(d) { return d });
      });

      d3.unconf = function() { alert("You win") };
