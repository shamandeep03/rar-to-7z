function showLoader() {
	$(".progress > .progress-bar").html("15%");
	$(".progress > .progress-bar").css("width", "15%");
	$("#loader").removeClass("hidden");
	hideAlert()
}

function hideLoader() {
	$("#loader").addClass("hidden")
}

function generateViewerLink(n) {
	var t = n.folderName !== undefined ? n.folderName : n.id;
	return encodeURI(o.ViewerPath + "FileName=") + encodeURIComponent(n.fileName) + encodeURI("&FolderName=" + t + "&CallbackURL=" + o.AppURL)
}

// function generateEditorLink(n) {
// 	var t = n.folderName !== undefined ? n.folderName : n.id;
// 	return encodeURI(o.EditorPath + "FileName=") + encodeURIComponent(n.fileName) + encodeURI("&FolderName=" + t + "&CallbackURL=" + o.AppURL)
// }

function sendPageView(n) {
	if("ga" in window) try {
		var t = ga.getAll()[0];
		t !== undefined && t.send("pageview", n)
	} catch(i) {}
}

function setMetricsData(n) {
	const t = {
		product: "pdf",
		application: o.OriginalAppName,
		bytes: 0,
		files: n.forEach.length
	};
	n.forEach(n => {
		t.bytes += n.size
	});
}

function workSuccess(n, t, i, r) {
	var e, s, h, u, c, f;
	if(hideLoader(), r && setMetricsData(r), n.statusCode === 200) {
		if(hideProcessing(), n.fileProcessingErrorCode !== undefined && n.fileProcessingErrorCode !== 0) {
			showAlert(o.FileProcessingErrorCodes[n.fileProcessingErrorCode]);
			return
		}
		if($("#WorkPlaceHolder").addClass("hidden"), $("#HowtoList").addClass("hidden"), $("#Faq").addClass("hidden"), $("#FrequentQueries").addClass("hidden"), $(".app-features-section").addClass("hidden"), $("#DownloadPlaceHolder").removeClass("hidden"), $("#OtherApps").removeClass("hidden"), $("#dvNaviBar").addClass("hidden"), $("#dvVideoSection").addClass("hidden"), $("#dvOverview").addClass("hidden"), $("#dvFeatureList").addClass("hidden"), $("#bProposedAppsContainer").hide(), $("#sendemail").css("display", "flex"), $("#feedback").css("display", "block"), o.ReturnFromViewer === undefined) {
			const n = o.AppDownloadURL.indexOf("?"),
				t = n === -1 ? o.AppDownloadURL : o.AppDownloadURL.substring(0, n);
			sendPageView(t)
		}
		if($("#saveAs").val() == "TEX" && VIEWABLE_IMG_EXTENSIONS.includes(window.location.href.substring(window.location.href.lastIndexOf("/") + 1).toUpperCase()) && $("#ViewerLink").hide(), n.sharedFiles) {
			for(e = [], f = n.sharedFiles[0].uploadFileName, $("#DownloadButton").attr("href", f), $("#DownloadButton").contents().first()[0].textContent = n.sharedFiles[0].fileName + "   ", e.push($("#DownloadBtn")), u = 1; u < n.sharedFiles.length; u++) s = $("#DownloadBtn").clone(), f = n.sharedFiles[u].uploadFileName, s.find("#DownloadButton").attr("href", f), s.find("#DownloadButton").contents().first()[0].textContent = n.sharedFiles[u].fileName + "   ", $("#DownloadContainer").append(s), e.push(s);
			for(h = function(t, i) {
                debugger
					var r = n.files ? n.files[i] : n.fileName;
					$.get(encodeURI(`/${n.folderName}?file=`) + encodeURIComponent(r) + "&locale=" + $("#SendResultTo").attr("data-lang"), function(u) {
						var e = encodeURI(`pdf/api/Download/${n.folderName}?file=`) + encodeURIComponent(r),
							f = "";
						u.forEach(n => {
							var t = '                    <a class="proposedApp" target="_blank" href="../' + n.url + "?url=" + encodeURI(e) + '" title="' + n.title + '"]" onclick="uploadAppClick(\'' + n.appName + "')\">\t\t\t\t\t\t<div style=\"width:28px;height:28px;background-size:contain; background-image: url('data:image/png;base64," + n.dataImageSource + "')\"><\/div>                    <\/a>";
							f += t
						});
						u.length && t.after('<div id="ProposedApps' + i + '" style="margin-left: -30px;">\t\t\t\t\t<label style="vertical-align:super">' + $("#SendResultTo").text() + '<\/label>\t\t\t\t\t\t<div class="ProposedAppsContainer">\t\t\t\t\t\t\t' + f + "\t\t\t\t\t\t<\/div>            <\/div>")
					})
				}, u = 0; u < e.length; u++) c = $(e[u]), h(c, u);
			f = n.files ? encodeURI(+ `Download/${n.folderName}?file=`) + encodeURIComponent(n.files[0]) : encodeURI( `Download/${n.folderName}?file=`) + encodeURIComponent(n.fileName)
		} else if(n.files) {
			for(e = [], f = encodeURI(o.APIBasePath + `Download/${n.folderName}?file=`) + encodeURIComponent(n.files[0]), $("#DownloadButton").attr("href", f), $("#DownloadButton").contents().first()[0].textContent = n.files[0] + "   ", e.push($("#DownloadBtn")), u = 1; u < n.files.length; u++) s = $("#DownloadBtn").clone(), f = encodeURI(o.APIBasePath + `Download/${n.folderName}?file=`) + encodeURIComponent(n.files[u]), s.find("#DownloadButton").attr("href", f), s.find("#DownloadButton").contents().first()[0].textContent = n.files[u] + "   ", $("#DownloadContainer").append(s), e.push(s);
			for(h = function(t, i) {
					$.get(+ encodeURI(`/${n.folderName}?file=`) + encodeURIComponent(n.files[i]) + "&locale=" + $("#SendResultTo").attr("data-lang"), function(r) {
						var f = encodeURI(`pdf/api/Download/${n.folderName}?file=`) + encodeURIComponent(n.files[i]),
							u = "";
						r.forEach(n => {
							var t = '                    <a class="proposedApp" target="_blank" href="../' + n.url + "?url=" + encodeURI(f) + '" title="' + n.title + '"]" onclick="uploadAppClick(\'' + n.appName + "')\">\t\t\t\t\t\t<div style=\"width:28px;height:28px;background-size:contain; background-image: url('data:image/png;base64," + n.dataImageSource + "')\"><\/div>                    <\/a>";
							u += t
						});
						r.length && t.after('<div id="ProposedApps' + i + '" style="margin-left: -30px;">\t\t\t\t\t<label style="vertical-align:super">' + $("#SendResultTo").text() + '<\/label>\t\t\t\t\t\t<div class="ProposedAppsContainer">\t\t\t\t\t\t\t' + u + "\t\t\t\t\t\t<\/div>            <\/div>")
					})
				}, u = 0; u < e.length; u++) c = $(e[u]), h(c, u);
			f = encodeURI( `Download/${n.folderName}?file=`) + encodeURIComponent(n.files[0])
		} else f = encodeURI(o.APIBasePath + `Download/${n.folderName}?file=`) + encodeURIComponent(n.fileName), n.downloadFileLink && (f = n.downloadFileLink), $("#DownloadButton").attr("href", f), $("#dvOpenImgBtn").attr("href", f), f = encodeURI(`pdf/api/Download/${n.folderName}?file=`) + encodeURIComponent(n.fileName), $.get( encodeURI(`/${n.folderName}?file=`) + encodeURIComponent(n.fileName) + "&locale=" + $("#SendResultTo").attr("data-lang"), function(n) {
			n.forEach(t => {
				var i = $('                    <a class="proposedApp" target="_blank" href="../' + t.url + "?url=" + encodeURI(f) + '" title="' + t.title + '"]" onclick="uploadAppClick(\'' + t.appName + "')\">\t\t\t\t\t\t<div style=\"width:28px;height:28px;background-size:contain; background-image: url('data:image/png;base64," + t.dataImageSource + "')\"><\/div>                    <\/a>");
				$(".ProposedAppsContainer").append(i);
				n.length > 0 && $("#bProposedAppsContainer").show()
			})
		});
		if(o.DownloadUrl = f, console.log(o.DownloadUrl), $(".immediatelyRemove").click(function() {
				return window.scrollTo(0, 0), $.post( + "ImmediatelyRemove/", {
					id: n.folderName
				}, function(n) {
					$("#SuccessMessage").text(n.status).fadeTo("fast", 0).fadeTo("fast", 1).fadeTo("fast", 0).fadeTo("fast", 1);
					$(".download-button").attr("disabled", !0);
					$(".download-button").click(function(n) {
						n.preventDefault()
					});
					$("#sendEmailButton").attr("disabled", !0);
					$(".proposedApp").attr("disabled", !0)
				}), !1
			}), $(".next-app").attr("href", $(".next-app").attr("href") + "?url=" + encodeURI(f)), o.ShowViewerButton) {
			let i = $("#ViewerLink"),
				r = n.fileName.lastIndexOf("."),
				t = r >= 0 ? n.fileName.substring(r + 1).toUpperCase() : null;
			if(t !== null && i.length && VIEWABLE_EXTENSIONS.indexOf(t) !== -1) {
				$("#dvOpenImgBtn").hide();
				$("#dvViewerBtn").show();
				i.on("click", function(t) {
					t.preventDefault();
					t.stopPropagation();
					downloadFileForView(n)
				})
			} else t !== null && VIEWABLE_IMG_EXTENSIONS.indexOf(t) !== -1 ? ($("#dvOpenImgBtn").show(), $("#dvViewerBtn").hide()) : ($("#dvOpenImgBtn").hide(), $("#dvViewerBtn").hide())
		}
	} else n.statusCode === 204 ? (showProcessing(), workProcess(n)) : (hideProcessing(), n.StatusCode !== 200 && showAlert(n.status))
}

function workProcess(n) {
	setTimeout(function() {
		executeStatusQuery(n)
	}, 5e3)
}

function executeStatusQuery(n) {
	n !== undefined && $.ajax({
		method: "POST",
		url:o.NatsAPIPath + "ProcessStatus/" + n.folderName,
		processData: !1,
		contentType: !1,
		cache: !1,
		timeout: 12e4,
		success: workSuccess,
		error: function(n) {
			n.status != 0 ? (hideProcessing(), n.data !== undefined && n.data.Status !== undefined ? showAlert(n.data.Status) : n.status ? showAlert("Error " + n.status + ": " + n.responseText) : showAlert("Service temporary unavailable.")) : showAlert("Service temporary unavailable.")
		}
	})
}

function sendFeedback(n) {
	var t = typeof n == "string" ? n : $("#feedbackText").val(),
		r, i;
	if(t && !t.match(/^\s+$/) && !(t.length > 1e3)) {
		if(r = {
				appname: o.AppName,
				title: document.title,
				text: t
			}, !n && "ga" in window) try {
			i = window.ga.getAll()[0];
			i !== undefined && i.send("event", {
				eventCategory: "Social",
				eventAction: "feedback-in-download"
			})
		} catch(u) {}
		// $.ajax({
		// 	method: "POST",
		// 	url: o.NatsAPIPath + "sendfeedback",
		// 	data: r,
		// 	dataType: "json",
		// 	success: n => {
		// 		showMessage(n.message), $("#feedback").hide()
		// 	},
		// 	error: n => {
		// 		n ? showAlert(n.responseJSON.message) : showAlert("Service currently unavailable.")
		// 	}
		// })
	}
}


function hideAlert() {
	$("#alertMessage").addClass("hidden");
	$("#alertMessage").text("");
	$("#alertSuccess").addClass("hidden");
	$("#alertSuccess").text("")
}

function showAlert(n) {
	if(hideLoader(), !n) {
		n = "Unknown error";
		var t = new Error;
		console.log(t.stack)
	}
	n.length > 100 && (n = n.replace("System.AggregateException: One or more errors occurred.", "").replace("Aspose.PDF.Exceptions.ValidationException:", "").split("--->")[0]);
	$("#alertMessage").html(n);
	$("#alertMessage").removeClass("hidden");
	$("#alertMessage").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
}

function showMessage(n) {
	hideLoader();
	$("#alertSuccess").text(n);
	$("#alertSuccess").removeClass("hidden")
}

function showProcessing() {
	hideLoader();
	$("#uploadButton").attr("disabled", "disabled");
	$("#processing").removeClass("hidden")
}

function hideProcessing() {
	$("#uploadButton").removeAttr("disabled", "disabled");
	$("#processing").addClass("hidden")
}

function progress(n) {
	if(n.lengthComputable) {
		var i = n.total,
			r = n.loaded,
			t = Math.round(r * 100 / i);
		t = (t < 15 ? 15 : t) + "%";
		$(".progress > .progress-bar").html(t);
		$(".progress > .progress-bar").css("width", t)
	}
}

function removeAllFileBlocks() {
	fileDrop.droppedFiles.forEach(function(n) {
		$("#fileupload-" + n.id).remove()
	});
	fileDrop.droppedFiles = [];
	hideLoader()
}

function openIframe(n, t, i) {
	window.history.pushState(null, null, t);
	$("body").css("overflow-y", "hidden");
	var r = $('<div id="iframe-wrap"><\/div>');
	$("<iframe>", {
		src: encodeURI(n),
		id: "iframe-document",
		frameborder: 0,
		scrolling: "yes"
	}).appendTo(r);
	r.appendTo("body");
	sendPageView(i)
}

function closeIframe() {
	removeAllFileBlocks();
	$("div#iframe-wrap").remove();
	$("body").css("overflow-y", "auto")
}

function request(n, t) {
	showLoader();
	$.ajax({
		method: "POST",
		url: n,
		data: t,
		processData: !1,
		contentType: !1,
		cache: !1,
		timeout: 6e5,
		success: (n, i, r) => workSuccess(n, i, r, t),
		xhr: function() {
			var n = $.ajaxSettings.xhr();
			return n.upload && n.upload.addEventListener("progress", progress, !1), n
		},
		error: function(n) {
			n.data !== undefined && n.data.Status !== undefined ? showAlert(n.data.Status) : n.status > 0 ? showAlert("Error " + n.status + ": " + n.responseText) : showAlert("Service temporary unavailable.")
		}
	})
}

function requestQueue(n, t) {
	showLoader();
	$.ajax({
		method: "POST",
		url: n,
		data: t,
		processData: !1,
		contentType: !1,
		cache: !1,
		timeout: 6e5,
		success: (n, i, r) => workSuccess(n, i, r, t),
		xhr: function() {
			var n = $.ajaxSettings.xhr();
			return n.upload && n.upload.addEventListener("progress", progress, !1), n
		},
		error: function(n) {
			n.data !== undefined && n.data.Status !== undefined ? showAlert(n.data.Status) : n.status > 0 ? showAlert("Error " + n.status + ": " + n.responseText) : showAlert("Service temporary unavailable.")
		}
	})
}

function prepareDownloadUrl() {
	o.AppDownloadURL = o.AppURL;
	var n = o.AppDownloadURL.indexOf(":");
	n > 0 && (o.AppDownloadURL = (n > 0 ? o.AppDownloadURL.substring(n + 3) : o.AppURL) + "/download");
	n = o.AppDownloadURL.indexOf("/");
	o.AppDownloadURL = o.AppDownloadURL.substring(n)
}

function checkReturnFromViewer() {
	var i = window.location.search,
		n, t;
	i.length > 0 && (o.ReturnFromViewer = !0, n = {
		StatusCode: 200,
		FolderName: $.QueryString.id,
		FileName: $.QueryString.FileName,
		FileProcessingErrorCode: 0
	}, t = window.location.href.split("?")[0], window.history.pushState({}, document.title, t), o.UploadAndRedirect || workSuccess(n))
}


function otherAppClick(n, t = false) {
	if("ga" in window) try {
		var i = window.ga.getAll()[0];
		i !== undefined && i.send("event", {
			eventCategory: "Other App Click" + (t ? " Left" : ""),
			eventAction: n
		})
	} catch(r) {}
}

function uploadAppClick(n, t = false) {
	if("ga" in window) try {
		var i = window.ga.getAll()[0];
		i !== undefined && i.send("event", {
			eventCategory: "Next App Click" + (t ? " Left" : ""),
			eventAction: n
		})
	} catch(r) {}
}

function getInputType(n) {
	var i = "pdf",
		r = window.location.pathname.toLowerCase(),
		u = r.toLowerCase().indexOf(n),
		t, f;
	return u < 0 ? i : (t = r.substring(u + n.length + 1), t.length === 0) ? i : (f = t.split("-"), f[0])
}

function getOutputType(n) {
	var r = "",
		u = window.location.pathname.toLowerCase(),
		f = u.toLowerCase().indexOf(n),
		t, i;
	return f < 0 ? r : (t = u.substring(f + n.length + 1), t.length === 0) ? r : (i = t.split("-"), i[i.length - 1])
}

function autoIncreaseStatistic() {
	var n = $("#processedFiles").text() * 1;
	$("#processedFiles").text(n + (increase ? 1 : 0));
	$("#processedBytes").text(Math.round(($("#processedBytes").text() * 1 + (increase ? .3 : 0)) * 10) / 10)
}

function readStatistic() {
	let n = 0;
	setInterval(function() {
		n % 5 == 0
		n++;
		autoIncreaseStatistic()
	}, 1e3)
}

function openLng() {
	$("#lngPanel").hasClass("hidden") ? $("#lngPanel").removeClass("hidden") : $("#lngPanel").addClass("hidden")
}

function openAlertChangeLang(n) {
	var i, t;
	if($("#alertChangeLang").hasClass("hidden")) {
		for(i = "Change language?", t = 0; t < o.AllSupportedLang.length; t++) o.AllSupportedLang[t].Id === n && (i = o.AllSupportedLang[t].ChangeToLanguage);
		$("#changeLangHeader")[0].innerText = i;
		$("#alertChangeLang").removeClass("hidden");
		window.setTimeout(openAlertChangeLang, 7e3)
	} else $("#alertChangeLang").addClass("hidden")
}

function gotoLocalePage() {
	var n = browserLang(),
		t;
	changePrefLang(n);
	t = "en" === n ? "" : "/" + n;
	window.location.href = o.AppRouteTemplate.replace("{0}", t)
}

function changePrefLang(n) {
	localStorage.setItem("app.aspose.products_pdf_preferred_lang", n)
}

function prefLangDefined() {
	try {
		var n = localStorage.getItem("app.aspose.products_pdf_preferred_lang");
		return n === null || n === undefined || n.toString().length > 2 ? "" : n.toLowerCase()
	} catch(t) {
		return ""
	}
}

function browserLang() {
	try {
		return navigator.language.substr(0, 2)
	} catch(n) {
		return "en"
	}
}

function browserLangSupported(n) {
	for(var t = 0; t < o.AllSupportedLang.length; t++)
		if(o.AllSupportedLang[t].Id === n) return !0;
	return !1
}

function checkNeedLangRedirect(n, t) {
	if(t === "") n !== o.CurrentAppLang && browserLangSupported(n) && openAlertChangeLang(n);
	else if(t !== o.CurrentAppLang && browserLangSupported(t)) {
		var i = "en" === t ? "" : "/" + t;
		window.location.href = o.AppRouteTemplate.replace("{0}", i)
	}
}

function openImageInTab() {
	var n = $("#DownloadButton").attr("href"),
		t = '<div style="height:100%;width:100%;horizontal-align:middle;"><img style="max-width:100%;max-height:100%;display:block;margin:auto auto;" src="' + n + '"><\/div>',
		i = window.open();
	i.document.write(t)
}

function expandOtherApps() {
	if($(".otherapps-panel-expand").hide(), $("#otherapps-panel").removeClass("otherapps-panel-collapse"), $("#WorkPlaceHolder").css("display") != "none") {
		var n = 0;
		$("#controlsView").height() > 0 && (n = $("#controlsView").height() - 30);
		$("#expander").height($("#otherapps-panel").height() + $("#expander").height() - 325 - n - ($("#DownloadPlaceHolder").height() > 0 ? $("#DownloadPlaceHolder").height() : 0) - ($("#dvTitle").height() > 0 ? $("#dvTitle").height() : 0) - ($("#dvTitle").height() > 0 ? $("#expander").height() : 0) + "px");
		console.log($("#expander").height())
	} else $("#DownloadPlaceHolder").css("display") != "none" && $("#expander").height($("#otherapps-panel").height() + $("#expander").height() - 120 - $("#DownloadPlaceHolder").height() - $("#sendemail").height() - $("#sendemail").height() - $("#dvTitle").height() + "px")
}

function restoreOtherApps() {
	$("#otherapps-panel").addClass("otherapps-panel-collapse");
	$(".otherapps-panel-expand").show();
	$("#expander").height("auto")
}

function toggleFiledropUrl() {
	$("#filedrop-input-url:visible").length ? $("#filedrop-input-url").hide() : $("#filedrop-input-url").show()
}

function addFiledropUrl() {
	var n = $("#externalUrlInput").val(),
		t = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);
	n.match(t) && (fileDrop.appendLinkBlock(n), cancelFiledropUrl())
}

function cancelFiledropUrl() {
	$("#filedrop-input-url").hide();
	$("#externalUrlInput").val("")
}
var fileDrop, fileDrop2, increase;
const VIEWABLE_EXTENSIONS = ["PDF", "TEX", "MHT", "MHTML"],
	VIEWABLE_IMG_EXTENSIONS = ["JPG", "PNG", "SVG", "BMP"];
fileDrop = {};
fileDrop2 = {};
$.extend($.expr[":"], {
		isEmpty: function(n) {
			return n.value === ""
		}
	}),
	function(n) {
		n.fn.inputFilter = function(n) {
			return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
				n(this.value) ? (this.oldValue = this.value, this.oldSelectionStart = this.selectionStart, this.oldSelectionEnd = this.selectionEnd) : this.hasOwnProperty("oldValue") ? (this.value = this.oldValue, this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)) : this.value = ""
			})
		}
	}(jQuery),
	function(n) {
		n.QueryString = function(n) {
			let t = {};
			for(let i = 0; i < n.length; ++i) {
				let r = n[i].split("=", 2);
				r.length === 2 && (t[r[0]] = decodeURIComponent(r[1].replace(/\+/g, " ")))
			}
			return t
		}(window.location.search.substr(1).split("&"))
	}(jQuery);
increase = !0;
$(document).ready(function() {
	prepareDownloadUrl();
	checkReturnFromViewer();
	var n = browserLang(),
		t = prefLangDefined();
	if(checkNeedLangRedirect(n, t), readStatistic(), fileDrop = $("form#UploadFile").filedrop(Object.assign({
			showAlert: showAlert,
			hideAlert: hideAlert,
			showLoader: showLoader,
			progress: progress
		}, o)), o.AppName === "Comparison" && (fileDrop2 = $("form#UploadFile").filedrop(Object.assign({
			showAlert: showAlert,
			hideAlert: hideAlert,
			showLoader: showLoader,
			progress: progress
		}, o))), window.onpopstate = function() {
			$("div#iframe-wrap").length > 0 && closeIframe()
		}, !o.UploadAndRedirect) $("#uploadButton").on("click", o.Method);
	$("#sendEmailButton").on("click", sendEmail);
	$("#sendFeedbackBtn").on("click", sendFeedback);
	$("#externalUrlButton").on("click", toggleFiledropUrl);
	$(".file-link-holder-add").on("click", addFiledropUrl);
	$(".file-link-holder-cancel").on("click", cancelFiledropUrl);
	$(".otherapps-panel-expand > div > svg").on("click", expandOtherApps);
	$(".otherapps-panel-restore > svg").on("click", restoreOtherApps);
	$("#dcIsLandscape").length && $("#saveAs").change(function() {
		console.log("2");
		var n = $("#saveAs").val();
		switch(n.toLowerCase()) {
			case "pdf":
			case "doc":
			case "docx":
			case "word":
			case "ppt":
			case "powerpoint":
			case "pptx":
			case "tex":
			case "html":
			case "words":
			case "djvu":
			case "xps":
			case "epub":
			case "latex":
			case "mhtml":
			case "mht":
			case "pdfa1a":
			case "pdfa1b":
			case "pdfa2a":
			case "pdfa3a":
			case "ps":
			case "eps":
			case "pcl":
			case "rtf":
			case "cgm":
			case "mobi":
				$("#dcIsLandscapeBlock").show();
				break;
			default:
				$("#dcIsLandscapeBlock").hide()
		}
	})
});
if(document.getElementById("idFile")) var idFileBlock = parseInt(document.getElementById("idFile").innerHTML);
(function(n) {
	n.fn.filedrop = function(t) {
		var v = function() {
				return idFileBlock = idFileBlock + 1, idFileBlock - 1
			},
			r = v(),
			y = t.Accept.split(/\s*,\s*/).map(function(n) {
				return n.substring(1).toUpperCase()
			}),
			i = [],
			p = function(n) {
				var t = n.name.lastIndexOf(".");
				return t !== -1 ? n.name.substring(t + 1).toUpperCase() : null
			},
			e = function() {
				var n = 1,
					t;
				do {
					t = !1;
					for(let r = 0; r < i.length; r++) {
						if(i[r].id === "link_" + n) {
							n += 1;
							t = !0;
							break
						}
						if(i[r].id === n) {
							n += 1;
							t = !0;
							break
						}
					}
				} while (t);
				return n
			},
			u = function(n) {
				n = n || event;
				n.preventDefault();
				n.stopPropagation()
			},
			s = function(t) {
				for(var u = 0; u < i.length; u++)
					if(i[u].id === t) {
						document.getElementById("fileupload-" + t).remove();
						i.splice(u, 1);
						i.length === 0 && n("#filedrop-" + r).find(".chooseFilesLabel").removeClass("hidden");
						break
					}
			},
			h = function(t) {
				for(var f, e, o, u = 0; u < i.length; u++)
					if(i[u].id === t) break;
				u < i.length && u !== 0 && (f = i[u - 1].id, e = i[u - 1], i[u - 1] = i[u], i[u] = e, o = n("#filedrop-" + r + " > div > #fileupload-" + t).detach(), n("#filedrop-" + r + " > div > #fileupload-" + f).before(o))
			},
			c = function(t) {
				for(var f, e, o, u = 0; u < i.length; u++)
					if(i[u].id === t) break;
				u < i.length && u !== i.length - 1 && (f = i[u + 1].id, e = i[u + 1], i[u + 1] = i[u], i[u] = e, o = n("#filedrop-" + r + "> div > #fileupload-" + t).detach(), n("#filedrop-" + r + " > div > #fileupload-" + f).after(o))
			},
			w = function(r, f) {
				var o = e(),
					w = r.name,
					v = null,
					y = null,
					p, l, a;
				if(t.UseSorting) {
					v = n('                    <a>                        <i><svg class="fa icon icon-arrow-up frame0" viewBox="0 0 30 32"><path d="M28.768 17.339q0 0.911-0.661 1.607l-1.339 1.339q-0.679 0.679-1.625 0.679-0.964 0-1.607-0.679l-5.25-5.232v12.571q0 0.929-0.67 1.509t-1.616 0.58h-2.286q-0.946 0-1.616-0.58t-0.67-1.509v-12.571l-5.25 5.232q-0.643 0.679-1.607 0.679t-1.607-0.679l-1.339-1.339q-0.679-0.679-0.679-1.607 0-0.946 0.679-1.625l11.625-11.625q0.625-0.661 1.607-0.661 0.964 0 1.625 0.661l11.625 11.625q0.661 0.696 0.661 1.625z"><\/path><\/svg><\/i>                    <\/a>                ');
					y = n('                    <a>                        <i><svg class="fa icon icon-arrow-down frame0" viewBox="0 0 30 32"><path d="M28.768 14.857q0 0.946-0.661 1.607l-11.625 11.643q-0.696 0.661-1.625 0.661-0.946 0-1.607-0.661l-11.625-11.643q-0.679-0.643-0.679-1.607 0-0.946 0.679-1.625l1.321-1.339q0.696-0.661 1.625-0.661 0.946 0 1.607 0.661l5.25 5.25v-12.571q0-0.929 0.679-1.607t1.607-0.679h2.286q0.929 0 1.607 0.679t0.679 1.607v12.571l5.25-5.25q0.661-0.661 1.607-0.661 0.929 0 1.625 0.661l1.339 1.339q0.661 0.696 0.661 1.625z"><\/path><\/svg><\/i>                    <\/a>                ');
					v.find("i").on("click", function() {
						h(o)
					});
					y.find("i").on("click", function() {
						c(o)
					})
				}
				p = n('                <a>\t\t\t\t    <i><svg class="fa icon icon-close frame0" viewBox="0 0 25 32"><path d="M23.179 23.607q0 0.714-0.5 1.214l-2.429 2.429q-0.5 0.5-1.214 0.5t-1.214-0.5l-5.25-5.25-5.25 5.25q-0.5 0.5-1.214 0.5t-1.214-0.5l-2.429-2.429q-0.5-0.5-0.5-1.214t0.5-1.214l5.25-5.25-5.25-5.25q-0.5-0.5-0.5-1.214t0.5-1.214l2.429-2.429q0.5-0.5 1.214-0.5t1.214 0.5l5.25 5.25 5.25-5.25q0.5-0.5 1.214-0.5t1.214 0.5l2.429 2.429q0.5 0.5 0.5 1.214t-0.5 1.214l-5.25 5.25 5.25 5.25q0.5 0.5 0.5 1.214z"><\/path><\/svg><\/i>                <\/a>            ');
				p.find("i").on("click", function() {
					s(o)
				});
				l = n('                <span class="filename">                    <label style="display:inline">' + w + "<\/label>                <\/span>            ");
				v !== null && y !== null && (l.append(v), l.append(y));
				l.append(p);
				a = n('<div id="fileupload-' + o + '" class="fileupload"><\/div>');
				a.on("dragover", u);
				a.on("drop", u);
				a.append(l);
				a.insertBefore("#" + f);
				i.push({
					id: o,
					file: r,
					name: w,
					idUploadBlock: f
				})
			},
			b = function(r) {
				var f = "link_" + e(),
					w = r,
					v = null,
					y = null,
					p, o, l;
				if(t.UseSorting) {
					v = n('                    <a>                        <i><svg class="fa icon icon-arrow-up frame0" viewBox="0 0 30 32"><path d="M28.768 17.339q0 0.911-0.661 1.607l-1.339 1.339q-0.679 0.679-1.625 0.679-0.964 0-1.607-0.679l-5.25-5.232v12.571q0 0.929-0.67 1.509t-1.616 0.58h-2.286q-0.946 0-1.616-0.58t-0.67-1.509v-12.571l-5.25 5.232q-0.643 0.679-1.607 0.679t-1.607-0.679l-1.339-1.339q-0.679-0.679-0.679-1.607 0-0.946 0.679-1.625l11.625-11.625q0.625-0.661 1.607-0.661 0.964 0 1.625 0.661l11.625 11.625q0.661 0.696 0.661 1.625z"><\/path><\/svg><\/i>                    <\/a>                ');
					y = n('                    <a>                        <i><svg class="fa icon icon-arrow-down frame0" viewBox="0 0 30 32"><path d="M28.768 14.857q0 0.946-0.661 1.607l-11.625 11.643q-0.696 0.661-1.625 0.661-0.946 0-1.607-0.661l-11.625-11.643q-0.679-0.643-0.679-1.607 0-0.946 0.679-1.625l1.321-1.339q0.696-0.661 1.625-0.661 0.946 0 1.607 0.661l5.25 5.25v-12.571q0-0.929 0.679-1.607t1.607-0.679h2.286q0.929 0 1.607 0.679t0.679 1.607v12.571l5.25-5.25q0.661-0.661 1.607-0.661 0.929 0 1.625 0.661l1.339 1.339q0.661 0.696 0.661 1.625z"><\/path><\/svg><\/i>                    <\/a>                ');
					v.find("i").on("click", function() {
						h(f)
					});
					y.find("i").on("click", function() {
						c(f)
					})
				}
				p = n('                <a>\t\t\t\t    <i><svg class="fa icon icon-close frame0" viewBox="0 0 25 32"><path d="M23.179 23.607q0 0.714-0.5 1.214l-2.429 2.429q-0.5 0.5-1.214 0.5t-1.214-0.5l-5.25-5.25-5.25 5.25q-0.5 0.5-1.214 0.5t-1.214-0.5l-2.429-2.429q-0.5-0.5-0.5-1.214t0.5-1.214l5.25-5.25-5.25-5.25q-0.5-0.5-0.5-1.214t0.5-1.214l2.429-2.429q0.5-0.5 1.214-0.5t1.214 0.5l5.25 5.25 5.25-5.25q0.5-0.5 1.214-0.5t1.214 0.5l2.429 2.429q0.5 0.5 0.5 1.214t-0.5 1.214l-5.25 5.25 5.25 5.25q0.5 0.5 0.5 1.214z"><\/path><\/svg><\/i>                <\/a>            ');
				p.find("i").on("click", function() {
					s(f)
				});
				o = n('                <span class="filename">                    <label style="display:inline">' + w + "<\/label>                <\/span>            ");
				v !== null && y !== null && (o.append(v), o.append(y));
				o.append(p);
				l = n('<div id="fileupload-' + f + '" class="fileupload"><\/div>');
				l.on("dragover", u);
				l.on("drop", u);
				l.append(o);
				l.insertBefore(".filedrop > div > input[type=file]");
				i.push({
					id: f,
					name: w,
					url: r
				});
				t.UploadAndRedirect && (n("#externalUrlButton").hide(), a())
			},
			l = function(r = 1, u = undefined) {
				var e, h, o, f, c, s, l;
				if(u === undefined && (u = t.MaximumUploadFiles), i.length) {
					if(i.length < r || i.length > u) return t.showAlert(t.FileAmountMessage), null;
					for(e = new FormData, c = 0, s = 0; s < i.length; s++) {
						if(f = i[s], h = f.name.lastIndexOf("."), o = h >= 0 ? f.name.substring(h + 1).toUpperCase() : null, f.url || o === null || t.UploadOptions.indexOf(o) === -1)
							if(f.url) e.append(f.id, f.url);
							else return t.showAlert(t.FileWrongTypeMessage + o), null;
						else e.append(f.id, f.file, f.name);
						if(t.MaximumUploadFileSize > 0 && ((l = t.MaximumUploadFileSize, !f.url && f.file.size > l) || !f.url && (c += f.file.size, c > l))) return t.showAlert(t.FileMaximumUploadSizeReachedMessage), null
					}
					return e.append("dc_isLandscape", n("input[name=dcIsLandscape]:checked").val() == "on" ? "true" : "false"), e
				}
				return t.showAlert(t.FileSelectMessage), null
			},
			f = function(u) {
				var s = !1,
					h, f, e;
				if(u.target.files && u.target.files.length)
					if(h = o.AppName === "comparison" && i.find(n => n.idUploadBlock == u.target.name) == undefined ? u.target.files.length : u.target.files.length + i.length, h <= t.MaximumUploadFiles)
						for(t.hideAlert(), e = 0; e < u.target.files.length; e++) f = p(u.target.files[e]), f !== null && y.indexOf(f) !== -1 ? w(u.target.files[e], u.target.id) : (s = !0, f !== null && (f = f.toUpperCase()), t.showAlert(t.FileWrongTypeMessage + f));
					else s = !0, t.showAlert(t.FileAmountMessage), window.setTimeout(function() {
						t.hideAlert()
					}, 5e3);
				return n("input#UploadFileInput-" + r).val(""), !s
			},
		
			k = function(n) {
				t.showLoader();
				f(n) && a()
			};
		if(t.UploadAndRedirect) n("input#UploadFileInput-" + r).on("change", k);
		else {
			n("input#UploadFileInput-" + r).on("change", f);
			if(o.AppName == "comparison") n("input#UploadFileInput-" + (r + 1)).on("change", f)
		}
		return {get droppedFiles() {
				return i
			},
			get prepareFormData() {
				return l
			},
			get appendLinkBlock() {
				return b
			},
			reset: function() {
				i = [];
				n("#filedrop-" + r).find("div[id^=fileupload-]").remove();
				n("#filedrop-" + r).find(".chooseFilesLabel").removeClass("hidden")
			}
		}
	}
})(jQuery);