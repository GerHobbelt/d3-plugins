

/*
 * ###########################################################
 *
 * D3 Plugin: dag
 *
 * ###########################################################
 */
const HIGHLIGHT_COLOR = "red";

const DOT_RADIUS = 5;

const NORMAL_OPACITY = 0.4;
const HOVER_OPACITY = 1;
const HIGHLIGHT_OPACITY = 1;

var margin = {top: 1, right: 1, bottom: 6, left: 1};

d3.dag = function() {
    var dag = {},
    nodeWidth = 24,
    nodePadding = 16,
    size = [1, 1],
    nodes = [],
    links = [];

    dag.nodeWidth = function(_) {
        if (!arguments.length) return nodeWidth;
        nodeWidth = +_;
        return dag;
    };

    dag.nodePadding = function(_) {
        if (!arguments.length) return nodePadding;
        nodePadding = +_;
        return dag;
    };

    dag.nodes = function(_) {
        if (!arguments.length) return nodes;
        nodes = _;
        return dag;
    };

    dag.links = function(_) {
        if (!arguments.length) return links;
        links = _;
        return dag;
    };

    dag.size = function(_) {
        if (!arguments.length) return size;
        size = _;
        return dag;
    };

    dag.layout = function(iterations) {
        computeNodeLinks();
        computeNodeBreadths();
        computeNodeDepths(iterations);
        computeLinkDepths();
        return dag;
    };

    dag.relayout = function() {
        computeLinkDepths();
        return dag;
    };

    dag.link = function() {
        var curvature = .5;

        function link(d) {
            var x0 = d.source.x + d.source.dx,
            x1 = d.target.x,
            xi = d3.interpolateNumber(x0, x1),
            x2 = xi(curvature),
            x3 = xi(1 - curvature),
            y0 = d.source.y + d.sy + d.dy / 2,
            y1 = d.target.y + d.ty + d.dy / 2;
            return "M" + x0 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1;
        }

        link.curvature = function(_) {
            if (!arguments.length) return curvature;
            curvature = +_;
            return link;
        };

        return link;
    };

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
        nodes.forEach(function(node) {
            node.sourceLinks = [];
            node.targetLinks = [];
        });
        links.forEach(function(link) {
            var source = link.source,
            target = link.target;
            if (typeof source === "number") source = link.source = nodes[link.source];
            if (typeof target === "number") target = link.target = nodes[link.target];
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
        });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
        var remainingNodes = nodes,
        nextNodes,
        x = 0;

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function(node) {
                node.x = x;
                node.dx = nodeWidth;
                node.sourceLinks.forEach(function(link) {
                    nextNodes.push(link.target);
                });
            });
            remainingNodes = nextNodes;
            ++x;
        }

        moveSinksRight(x);
        scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
        nodes.forEach(function(node) {
            if (!node.targetLinks.length) {
                node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
            }
        });
    }

    function moveSinksRight(x) {
        nodes.forEach(function(node) {
            if (!node.sourceLinks.length) {
                node.x = x - 1;
            }
        });
    }

    function scaleNodeBreadths(kx) {
        nodes.forEach(function(node) {
            node.x *= kx;
        });
    }

    function computeNodeDepths(iterations) {
        var nodesByBreadth = d3.nest()
            .key(function(d) { return d.x; })
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function(d) { return d.values; });

        initializeNodeDepth();
        for (var alpha = 1; iterations > 0; --iterations) {
            relaxRightToLeft(alpha *= .99);
            relaxLeftToRight(alpha);
        }
        verticalPositioning();

        function initializeNodeDepth() {
            nodesByBreadth.forEach(function(nodes) {
                nodes.forEach(function(node, i) {
                    node.y = i;
                    node.dy = 2 * DOT_RADIUS;
                });
            });

            links.forEach(function(link) {
                link.dy = 1;
            });
        }

        function relaxLeftToRight(alpha) {
            nodesByBreadth.forEach(function(nodes, breadth) {
                nodes.forEach(function(node) {
                    if (node.targetLinks.length) {
                        var y = d3.sum(node.targetLinks, weightedSource)
                            / d3.sum(node.targetLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedSource(link) {
                return center(link.source);
            }
        }

        function relaxRightToLeft(alpha) {
            nodesByBreadth.slice().reverse().forEach(function(nodes) {
                nodes.forEach(function(node) {
                    if (node.sourceLinks.length) {
                        var y = d3.sum(node.sourceLinks, weightedTarget)
                            / d3.sum(node.sourceLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedTarget(link) {
                return center(link.target);
            }
        }

        function verticalPositioning() {
            var bn = nodesByBreadth.length;
            var breadth = 0;
            function scalar() {
                var x = (2.0 * breadth - (bn - 1)) / (bn - 1);
                return 0.7 + 0.3 * x * x;
            }
            nodesByBreadth.forEach(function(nodes) {
                var node, n = nodes.length;
                var a = scalar();
                nodes.sort(ascendingDepth);
                for (var i = 0; i < n; ++i) {
                    node = nodes[i];
                    if (n > 1) {
                        var ymax = size[1] - 15;
                        var ymin = 15;
                        var ymiddle = 0.5 * (ymin + ymax);
                        ymax = ymiddle + a * (ymax - ymiddle);
                        ymin = ymiddle + a * (ymin - ymiddle);
                        node.y = ymin + i * (ymax - ymin) / (n - 1);
                    } else
                        node.y = size[1] / 2;
                }
                breadth++;
            });
        }

        function ascendingDepth(a, b) {
            return a.y - b.y;
        }
    }

    function computeLinkDepths() {
        nodes.forEach(function(node) {
            node.sourceLinks.sort(ascendingTargetDepth);
            node.targetLinks.sort(ascendingSourceDepth);
        });
        nodes.forEach(function(node) {
            var sy = 0, ty = 0;
            node.sourceLinks.forEach(function(link) {
                link.sy = sy + node.dy / 2;
            });
            node.targetLinks.forEach(function(link) {
                link.ty = ty + node.dy / 2;
            });
        });

        function ascendingSourceDepth(a, b) {
            return a.source.y - b.source.y;
        }

        function ascendingTargetDepth(a, b) {
            return a.target.y - b.target.y;
        }
    }

    function center(node) {
        return node.y + node.dy / 2;
    }

    function value(node) {
        return 1;
    }

    return dag;
};

function makeDag(inputData, width, height) {
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dag = d3.dag()
        .nodeWidth(2 * DOT_RADIUS)
        .nodePadding(15)
        .size([width, height]);

    var path = dag.link();

    var currentlyHighlightedNode;
    var currentlyHighlightedLink;

    function undoHighlighting() {
        if (currentlyHighlightedNode !== undefined) {
            currentlyHighlightedNode.style.fill = "black";
            currentlyHighlightedNode.style.fillOpacity = NORMAL_OPACITY;
        }
        if (currentlyHighlightedLink !== undefined) {
            currentlyHighlightedLink.style.stroke = "black";
            currentlyHighlightedLink.style.strokeOpacity = NORMAL_OPACITY;
        }
    }

    dag.nodes(inputData.nodes)
        .links(inputData.links)
        .layout(32);

    var link = svg.append("g").selectAll(".link")
        .data(inputData.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-opacity", NORMAL_OPACITY)
        .style("stroke-width", 1)
        .sort(function(a, b) { return b.dy - a.dy; })
        .on("mousedown", function (d) {
            var label = d.source.name + "->" + d.target.name;
            var content = "<h2>" + label + "</h2>" +
                "<div>Information about " + label + "...</div>";
            document.getElementById("details").innerHTML = content;
            undoHighlighting();
            this.style.stroke = HIGHLIGHT_COLOR;
            this.style.strokeOpacity = HIGHLIGHT_OPACITY;
            currentlyHighlightedLink = this;
        })
        .on("mouseover", function(d) {
            if (this === currentlyHighlightedLink) {
                this.style.strokeOpacity = HIGHLIGHT_OPACITY;
            } else {
                this.style.strokeOpacity = HOVER_OPACITY;
            }
        })
        .on("mouseout", function(d) {
            if (this === currentlyHighlightedLink) {
                this.style.strokeOpacity = HIGHLIGHT_OPACITY;
            } else {
                this.style.strokeOpacity = NORMAL_OPACITY;
            }
        })

    var node = svg.append("g").selectAll(".node")
        .data(inputData.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .call(d3.behavior.drag()
              .origin(function(d) { return d; })
              .on("dragstart", function() { this.parentNode.appendChild(this); })
              .on("drag", dragmove));

    node.append("text")
        .attr("y", -2)
        .attr("transform", null)
        .text(function(d) { return d.name; })
        .filter(function(d) { return d.x > width / 2; })
        .attr("x", 5)
        .attr("text-anchor", "end");

    node.append("circle")
        .style("fill-opacity", 0.3)
        .attr("cx", function(d) { return d.dx - DOT_RADIUS; })
        .attr("cy", function(d) { return d.dy - DOT_RADIUS; })
        .attr("r", DOT_RADIUS)
        .on("mousedown", function (d) {
            var content = "<h2>" + d.name + "</h2>" +
                "<div>Information about " + d.name + "...</div>";
            document.getElementById("details").innerHTML = content;
            undoHighlighting();
            this.style.fill = HIGHLIGHT_COLOR;
            this.style.fillOpacity = HIGHLIGHT_OPACITY;
            currentlyHighlightedNode = this;
        })
        .on("mouseover", function(d) {
            if (this === currentlyHighlightedNode) {
                this.style.fillOpacity = HIGHLIGHT_OPACITY;
            } else {
                this.style.fillOpacity = HOVER_OPACITY;
            }
        })
        .on("mouseout", function(d) {
            if (this === currentlyHighlightedNode) {
                this.style.fillOpacity = HIGHLIGHT_OPACITY;
            } else {
                this.style.fillOpacity = NORMAL_OPACITY;
            }
        })

    function dragmove(d) {
        d3.select(this)
            .attr("transform",
                  "translate(" + d.x + "," +
                  (d.y = Math.max(15, Math.min(height - d.dy,
                                               d3.event.y)))
                  + ")");
        dag.relayout();
        link.attr("d", path);
    }
}
