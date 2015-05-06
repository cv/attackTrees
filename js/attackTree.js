var root = {
  "name": "Open Safe",
  "children": [
    { "name": "Pick Lock" },
    { "name": "Learn Combo",
      "children": [
        { "name": "Find Written Combo" },
        { "name": "Get Combo From Target",
          "children": [
            { "name": "Threaten" },
            { "name": "Blackmail" },
            { "name": "Eavesdrop",
              "children": [
                { "name": "Listen to Conversation" },
                { "name": "Get Target to State Combo" }
              ],
              "conjunction": "and"
            },
            { "name": "Bribe" }
          ]
        }
      ]
    },
    { "name": "Cut Open Safe" },
    { "name": "Install Improperly" }
  ]
};

var margin = { top: 50, right: 0, bottom: 100, left: 0 };
var width = 1000 - margin.left - margin.right;
var height =  1000 - margin.top - margin.bottom - 20;

var svg = d3.select("body")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tree = d3.layout.tree().size([width, height]);
var nodes = tree.nodes(root);
var links = tree.links(nodes);
		
var rectWidth = 150;
var rectHeight = rectWidth / 2;
var rectRounding = 15;

var diagonal = d3.svg.diagonal()
		.source(function(d) { return { "x": d.source.x, "y": (d.source.y + rectHeight) }; })
    .target(function(d) { return { "x": (d.target.x), "y": d.target.y }; })
		.projection(function(d) { return [d.x, d.y]; });

svg.selectAll("path.link")
    .data(links)
    .enter()
    .append("path")
      .attr("class", "link")
      .attr("d", diagonal);

svg.selectAll("rect.node")
    .data(nodes)
    .enter()
    .append("rect")
      .attr("class", "node")
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("x", function(d) { return d.x - rectHeight; })
      .attr("y", function(d) { return d.y; })
      .attr("rx", rectRounding)
      .attr("ry", rectRounding);

svg.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y + (rectHeight / 2) + 3; })
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });
