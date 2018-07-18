function DashBoard() {
	this.makeProgressBar = function(catindex) {
		$('#panelprogress').html('Initializing...');
		var result = "<table class=\"table table-bordered\">";
		result += "<tr> ";
		result += "<td style=\"white-space:nowrap\">News</td> ";
		result += "<td> ";
		result += "<div class=\"progress\"> ";
		result += "<div class=\"progress-bar progress-bar-danger\" style=\"width:3%\"></div> ";
		result += "</div> ";
		result += "</td> ";
		result += "<td>3%</td> ";
		result += "</tr> ";
		result += "<tr> ";
		result += "<td style=\"white-space:nowrap\">Security</td> ";
		result += "<td style=\"width:100%\"> ";
		result += "<div class=\"progress\"> ";
		result += "<div class=\"progress-bar progress-bar-warning\" style=\"width:9%\"></div> ";
		result += "</div> ";
		result += "</td> ";
		result += "<td>9%</td> ";
		result += "</tr> ";
		result += "<tr> ";
		result += "<td style=\"white-space:nowrap\">" + msg("Posts") + "</td> ";
		result += "<td> ";
		result += "<div class=\"progress\"> ";
		result += "<div class=\"progress-bar\" style=\"width:12%\"></div> ";
		result += "</div> ";
		result += "</td> ";
		result += "<td>12%</td> ";
		result += "</tr> ";
		result += "<tr> ";
		result += "<td style=\"white-space:nowrap\">" + msg("News") + "</td> ";
		result += "<td>";
		result += "<div class=\"progress\"> ";
		result += "<div class=\"progress-bar\" style=\"width:38%\"></div> ";
		result += "</div> ";
		result += "                             </td> ";
		result += "                             <td>38%</td> ";
		result += "                         </tr> ";
		result += "                         <tr> ";
		result += "                             <td style=\"white-space:nowrap\">Haec dum oriens diu perferret</td> ";
		result += "                             <td style=\"width:100%\"> ";
		result += "                                 <div class=\"progress\"> ";
		result += "                                     <div class=\"progress-bar\" style=\"width:47%\"></div> ";
		result += "                                 </div> ";
		result += "                             </td> ";
		result += "                             <td>47%</td> ";
		result += "                         </tr> ";
		result += "                         <tr> ";
		result += "                             <td style=\"white-space:nowrap\">Nam libero tempore</td> ";
		result += "                             <td> ";
		result += "                                 <div class=\"progress\"> ";
		result += "                                     <div class=\"progress-bar\" style=\"width:73%\"></div> ";
		result += "                                 </div> ";
		result += "                             </td> ";
		result += "                             <td>73%</td> ";
		result += "                         </tr> ";
		result += "</table> ";
		$('#panelprogress').html(result);
	}
	// this.makeProgressBar('');

	this.makeGauge = function(selector, value, color) {
		if (c3 != undefined) {
			c3.generate({
				bindto : selector,
				data : {
					columns : [ [ 'data', value ] ],
					type : 'gauge'
				},
				tooltip : {
					show : false
				},
				gauge : {
					label : {
						format : function(value, ratio) {
							return value + '%';
						},
						show : false
					},
					min : 0,
					max : 100,
					units : ' %',
					width : 50
				},
				color : {
					pattern : [ color, color, color ], // the 3 color levels
				// for
				// the percentage values.
				}
			});
		}
	};

	// this.makeGauge('#d1-c1', 42, '#1abc9c');
	// this.makeGauge('#d1-c2', 22, '#3498db');
	// this.makeGauge('#d1-c3', 72, '#f39c12');

//	this.getEventsByDate = function(eventsResult) {
//		var i = 0;
//		var cyear = new Date().getFullYear();
//		var g = [];
//		for ( var s in eventsResult) {
//			if ((eventsResult[s].start).includes(cyear)) {
//				var str = "" + eventsResult[s].start.substring(0, 10) + "";
//				if (str !== null && str !== "null" && !g.includes(str)) {
//					g[i] = str.toString();
//					i++;
//				}
//			}
//		}
//		g = new UTIL().uniq(g);
//		return g.reverse();
//	}
//
//	this.setEventsSorted = function(g, grid) {		
//		grid[0][1] = g.toString();
//		$("#cnt").append(getBoxFluid("1st:" + JSON.stringify(grid) + "<hr>"));		
//		return grid;
//	}
//	
//	this.setEventsNumbers = function(g, grid, eventsResult) {
//		$("#cnt").append(getBoxFluid("Set Number:" + JSON.stringify(grid) + "<hr>"));
//		
//		grid[1][1] = "10, 20, 20, 50, 25, 35, 110, 233, 10, 60, 20, 150,"+g.toString();
//		return grid;
//	}

	this.makeChart = function(selector, type, colors, legend) {
		var x = [];
		var y = [];
		var count = 0;
		var grid = [
				[ 'x', '2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04',
						'2018-01-05', '2018-01-06', '2018-01-07', '2018-01-08',
						'2018-01-09', '2018-01-10', '2018-01-11', '2018-01-12' ],
				[ 'Request', 30, 40, 20, 50, 25, 35, 130, 333, 20, 50, 20, 50 ],
				[ 'Posts', 30, 200, 100, 40, 150, 25, 30, 20, 112, 32, 70, 30 ] ];
		var util = new UTIL();
		try {
			count = eventsList.length;
			if (eventsList !== undefined) {
				var i = 0;
				var eventsResult = util.uniq(eventsList);
				g = util.getEventsByDate(eventsResult);
//				$("#cnt").append(getBoxFluid("After:" + JSON.stringify(g) + "<hr>"));
				grid = util.setEventsSorted(g, grid);
				grid = util.setEventsNumbers(g, grid, eventsResult);
			}
//			$("#cnt").append(getBoxFluid(JSON.stringify(grid) + "<hr>"));
			c3.generate({
				bindto : selector,
				data : {
					x : 'x',
					// xFormat: '%Y%m%d', // 'xFormat' can be used as custom
					// format
					// of 'x'
					columns : grid,
					// type: 'spline'
					type : type
				},
				axis : {
					x : {
						type : 'timeseries',
						tick : {
							// format : '%Y-%m-%d'
							format : '%Y-%m-%d'
						}
					},

					y : {
						max : 500,
						tick : {
							values : [ 50, 100, 150, 200, 300, 400, 500 ]
						}
					}

				},

				legend : {
					show : legend,
					position : 'inset'
				},

				color : {
					pattern : colors
				}

			});
		} catch (e) {
			console.log("Exception:" + e.message + "" + e.stack);
			$("#error").append(
					getBoxFluid("Exception:" + e.message + "" + e.stack));
		}

	}

	this.makeChart2 = function(selector, type, colors, legend) {
		c3.generate({
			bindto : selector,
			data : {
				x : 'x',
				// xFormat: '%Y%m%d', // 'xFormat' can be used as custom format
				// of 'x'
				columns : [
						[ 'x', '2018-01-01', '2018-01-02', '2018-01-03',
								'2018-01-04', '2018-01-05', '2018-01-06',
								'2018-01-07', '2018-01-08', '2018-01-09',
								'2018-01-10', '2018-01-11', '2018-01-12' ],
						[ 'Request', 130, 340, 200, 500, 250, 350, 130, 333,
								200, 500, 220, 350 ],
						[ 'Posts', 30, 200, 100, 400, 150, 250, 30, 200, 112,
								322, 70, 300 ] ],
				// type: 'spline'
				type : type
			},
			axis : {
				x : {
					type : 'timeseries',
					tick : {
						format : '%Y-%m-%d'
					}
				},

				y : {
					max : 500,
					tick : {
						values : [ 10, 20, 50, 100, 200, 300, 400, 500 ]
					}
				}

			},

			legend : {
				show : legend,
				position : 'inset'
			},

			color : {
				pattern : colors
			}

		});
	}

	// this.makeChart('#d1-c4', 'area-spline', ['#3498db', '#f39c12'], true);
	// this.makeChart('#d1-c4', 'spline', [ '#1abc9c', '#3498db' ], true);
	// // this.makeChart('#d1-c5', 'bar', ['#1abc9c', '#16a085', '#f39c12'],
	// // false);
	// this.makeChart('#d1-c5', 'bar', [ '#3498db', '#2980b9' ], false);

}