function encode_utf8(s) {
	return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
	return decodeURIComponent(escape(s));
}
$(document)
		.ready(
				function() {
					var locallang = 'DE';
					var Language = locallang.substring(0, 2);
					// alert(Language);
					var date = new Date();
					var d = date.getDate();
					var m = date.getMonth();
					var y = date.getFullYear();

					var zone = "05:30"; // Change this to your timezone

					$
							.ajax({
								// url : 'process.php',
								url : new API().hostName+'webservices/client.php?q=getFullCalendar&IsSort=0&cdate=2017-04-18 15:23:09&value1=1&value2=1',
								type : 'POST', // Send post data
								data : 'type=fetch',
								async : false,
								success : function(s) {
									json_events = s;
								}
							});

					var currentMousePos = {
						x : -1,
						y : -1
					};
					jQuery(document).on("mousemove", function(event) {
						currentMousePos.x = event.pageX;
						currentMousePos.y = event.pageY;
					});

					/*
					 * initialize the external events
					 * -----------------------------------------------------------------
					 */

					$('#external-events .fc-event').each(function() {

						// store data so the calendar knows to render an event
						// upon drop
						$(this).data('event', {
							title : $.trim('A-' +utf8_encode( $(this).text())), // use
							// the
							// element's
							// text as the event
							// title
							stick : true
						// maintain when user navigates (see docs on the
						// renderEvent method)
						});

						// make the event draggable using jQuery UI
						$(this).draggable({
							zIndex : 999,
							revert : true, // will cause the event to go back
							// to its
							revertDuration : 0
						// original position after the drag
						});

					});

					/*
					 * initialize the calendar
					 * -----------------------------------------------------------------
					 */
					var oJson;
					try {
						if (typeof (json_events) === 'string'
								|| json_events instanceof String) {
							oJson = JSON.parse(json_events);
						}
					} catch (e) {
						console.log('is object' + e.message + e.stack);
					}
					$('#fullcalendar').html('');
					$('#fullcalendar')
							.fullCalendar(
									{
										events : oJson,
										utc : true,
										lang : '' + Language,
										// defaultView: 'year',
										header : {
											left : 'prev,next today',
											center : 'title',
											// right :
											// 'year,month,agendaWeek,agendaDay'
											right : 'year,month,agendaWeek,agendaDay'
										},

										editable : false,

										droppable : false,
										slotDuration : '00:30:00',

										eventResize : function(event, delta,
												revertFunc) {
											console.log(event);
											var title = 'B-' + utf8_decode(event.title);
											var end = event.end.format();
											var start = event.start.format();
											update(title, start, end, event.id);
										},
										dayClick : function(date, allDay,
												jsEvent, view) {
											$(this).css('background-color',
													'green');
											if (allDay) {

												$("#fullcalendar")
														.fullCalendar(
																'changeView',
																'basicDay'/*
																			 * or
																			 * 'basicDay'
																			 */)
														.fullCalendar(
																'gotoDate',
																date
																		.getFullYear(),
																date.getMonth(),
																date.getDate());
											}
											$(this).css('background-color',
													'white');

										},
										eventRender : function(event, element) {
											var js = "javascript:showModalDialog('"
													+ utf8_decode( event.title)
													+ "','"
													+ moment(event.start)
															.format(
																	'DD MMM YYYY hh:mm:ss a')
													+ "','" + event.url + "');";
											element.attr('href', js);
											$('#eventTitleLink').attr("href",
													event.url);
											$('#modalTitle').html(utf8_decode(event.title));
											$('#startTime').html(event.start);
											$('#eventLink').attr('href',
													event.url);
										},
										eventClick : function(event, jsEvent,
												view) {
											// $('#eventContent').toggleClass("visibleUI");
										}

									});

					function getFreshEvents() {
						$.ajax({
							url : 'process.php',
							type : 'POST', // Send post data
							data : 'type=fetch',
							async : false,
							success : function(s) {
								freshevents = s;
							}
						});
						$('#fullcalendar').fullCalendar('addEventSource',
								JSON.parse(freshevents));
					}

					function isElemOverDiv() {
						var trashEl = jQuery('#trash');

						var ofs = trashEl.offset();

						var x1 = ofs.left;
						var x2 = ofs.left + trashEl.outerWidth(true);
						var y1 = ofs.top;
						var y2 = ofs.top + trashEl.outerHeight(true);

						if (currentMousePos.x >= x1 && currentMousePos.x <= x2
								&& currentMousePos.y >= y1
								&& currentMousePos.y <= y2) {
							return true;
						}
						return false;
					}
					$('.fc-title')
							.each(
									function() {
										$(this)
												.html(
														""
																+ $(this)
																		.html()
																		.replace(
																				/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,
																				'<a href="#" rel="external" onclick="jQuery.fancybox.open({href : \'./openlink?$1\',	type : \'iframe\',padding : 5,height:400,autoSize: true});">$1</a>')
																		.replace(
																				"&amp;auml;",
																				"&auml;")
																		.replace(
																				"&amp;ouml;",
																				"&ouml;")
																		.replace(
																				"&amp;uuml;",
																				"&uuml;")
																		.replace(
																				"&amp;quot;",
																				"&quot;")
																		.replace(
																				"ÃÂ§",
																				"§")
																		.replace(
																				"&amp;szlig;",
																				"&szlig;"));

									});
				});