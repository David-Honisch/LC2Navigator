$(function() {
//	$("#imdb-tab").click(function(event) {
//$("#imdb").html(getOpenIMDB(query));
//$("#t").val(query);
$('#t').keyup(function() {
	if (event.keyCode == 13) {
		$('#search-by-title-button').click();
	} else {
		return false
	}
});
$('#i').keyup(function() {
	if (event.keyCode == 13) {
		$('#search-by-id-button').click();
	} else {
		return false
	}
});
$('#search-by-id-button')
		.click(
				function() {
//					alert('Debug');
					var c = $("#search-by-id-form :input").filter(
							function(index, element) {
								return $(element).val() != "";
							}).serialize();
					var d = 'http://www.omdbapi.com/?' + c;
					var e = $('#search-by-id-request');
					e.find('a').attr('href', d).html(d);
					e.show('slow');
					var f = $('#search-by-id-progress');
					f.show('slow');
					var g = $('#search-by-id-response');
					$
							.ajax({
								type : 'GET',
								dataType : 'text',
								/*
								 * sure you could easily steal this key, but
								 * I'll be keeping a close eye on it ;)
								 */
								url : '/?' + c + '&apikey=BanMePlz',
								statusCode : {
									401 : function() {
										$('#oimdbout')
												.html(
														'Error: Daily request limit reached!')
									}
								},
								success : function(a) {
									var text = a.replace(/</g, '&lt;').replace(
											/>/g, '&gt;');
									var t = JSON.parse(text);
									$('#oimdbout').append(t.Title + "<br>");
									$('#oimdbout')
											.html(
													"<img src=\""
															+ t.Poster
															+ "\" height=\"466\" width=\"300\"></img><br>");
									$('#oimdbout').append(
											"<strong>imdbRating:</strong>"
													+ t.imdbRating + "<br>");
									$('#oimdbout').append(
											"<strong>Writer:</strong>"
													+ t.Writer + "<br>");
									$('#oimdbout').append(
											"<strong>Source:</strong>"
													+ t.Source + "<br>");
									$('#oimdbout').append(
											"<strong>imdbID:</strong>"
													+ t.imdbID + "<br>");
									$('#oimdbout').append(
											"<strong>Director:</strong>"
													+ t.Director + "<br>");
									$('#oimdbout').append(
											"<strong>Runtime:</strong>"
													+ t.Runtime + "<br>");
									$('#oimdbout').append(
											"<strong>Genre:</strong>" + t.Genre
													+ "<br>");
									$('#oimdbout').append(
											"<strong>Actors:</strong>"
													+ t.Actors + "<br>");
									$('#oimdbout').append(
											"<strong>Plot:</strong>" + t.Plot
													+ "<br>");
									$('#oimdbout').append(
											"<strong>Type:</strong>" + t.Type
													+ "<br>");
									$('#oimdbout').append(text);
								},
								complete : function() {
									f.hide();
									g.show('slow')
								}
							})
				});
$('#search-by-id-reset').click(function() {
	var a = $('#search-by-id-request');
	a.hide('slow');
	a.find('a').attr('href', 'javascript:;').html('');
	var b = $('#search-by-id-progress');
	b.hide('slow');
	var c = $('#search-by-id-response');
	c.hide('slow');
	c.find('pre').html('');
});
$('#search-by-title-button')
		.click(
				function() {
					try {
						var c = $("#search-by-title-form :input").filter(
								function(index, element) {
									return $(element).val() != "";
								}).serialize();
						var d = 'http://www.omdbapi.com/?' + c;
						var e = $('#search-by-title-request');
						e.find('a').attr('href', d).html(d);
						e.show('slow');
						var f = $('#search-by-title-progress');
						f.show('slow');
						var g = $('#search-by-title-response');
						$
								.ajax({
									type : 'GET',
									dataType : 'text',
									/*
									 * sure you could easily steal this key, but
									 * I'll be keeping a close eye on it ;)
									 */
									url : 'http://www.omdbapi.com/?' + c
											+ '&apikey=92d5513b',
									statusCode : {
										401 : function() {
											$('#oimdbout')
													.html(
															'Error: Daily request limit reached!')
										}
									},
									success : function(a) {
										var text = a.replace(/</g, '&lt;')
												.replace(/>/g, '&gt;');
										var t = JSON.parse(text);
										$('#oimdbout').append(
												"<strong>Title:</strong>"
														+ t.Title + "<br>");
										$('#oimdbout')
												.html(
														"<img src=\""
																+ t.Poster
																+ "\" height=\"466\" width=\"300\"></img><br>");
										$('#oimdbout')
												.append(
														"<strong>imdbRating:</strong>"
																+ t.imdbRating
																+ "<br>");
										$('#oimdbout').append(
												"<strong>Writer:</strong>"
														+ t.Writer + "<br>");
										$('#oimdbout').append(
												"<strong>Source:</strong>"
														+ t.Source + "<br>");
										$('#oimdbout').append(
												"<strong>imdbID:</strong>"
														+ t.imdbID + "<br>");
										$('#oimdbout').append(
												"<strong>Director:</strong>"
														+ t.Director + "<br>");
										$('#oimdbout').append(
												"<strong>Runtime:</strong>"
														+ t.Runtime + "<br>");
										$('#oimdbout').append(
												"<strong>Genre:</strong>"
														+ t.Genre + "<br>");
										$('#oimdbout').append(
												"<strong>Actors:</strong>"
														+ t.Actors + "<br>");
										$('#oimdbout').append(
												"<strong>Plot:</strong>"
														+ t.Plot + "<br>");
										$('#oimdbout').append(
												"<strong>Type:</strong>"
														+ t.Type + "<br>");

									},
									complete : function() {
										f.hide();
										g.show('slow');
									}
								})
					} catch (e) {
						printOut("#error", e.stack)
					}
				});
$('#search-by-title-reset').click(function() {
	var a = $('#search-by-title-request');
	a.hide('slow');
	a.find('a').attr('href', 'javascript:;').html('');
	var b = $('#search-by-title-progress');
	b.hide('slow');
	var c = $('#search-by-title-response');
	c.hide('slow');
	c.find('pre').html('');
});
$('#search-by-title-button').click();
});