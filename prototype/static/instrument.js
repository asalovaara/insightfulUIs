
var currentTaskIdx = 0;
var currentConditionId; // = "baseline";

jQuery(document).ready(function() {

  do {
    cond = prompt("Which condition? Answer \"b\" for baseline, \"v\" for video or \"i\" for interactive condition.");
    switch (cond) {
      case "b":
        cond = "baseline";
        currentConditionId = cond;
        alert("Thank you! Condition set to " + cond + ".");
        break;

      case "v":
        cond = "video";
        currentConditionId = cond;
        alert("Thank you! Condition set to " + cond + ".");
        break;

      case "i":
        cond = "interactive";
        currentConditionId = cond;
        alert("Thank you! Condition set to " + cond + ".");
        break;

      default:
        alert("ERROR: Your answer \"" + cond + "\" was not b, v or i. You need to answer again.");
        cond = "ERROR";
    }
  } while (cond == "ERROR");

  for (var i = 0 ; i < taskList.length ; i++) {
    taskList[i].condition = cond;
  }

  // Because this prototype only works correctly on Chrome, let's detect this:
  // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  if ( !isChrome ) {
    alert("This prototype works correctly only in Google Chrome.");
  }

  myLog("Starting initializations.");
  var popoverButtons = [];
  for (var i = 0 ; i < buttons.length ; i++ ) {
    popoverButtons.push(buttons[i].action);
  }

  // Create the progress bar:
  var stepId;
  for (i = 0 ; i < taskList.length ; i++) {
    stepId = "progress_" + i;
    $("#progressbar").append("<li id=\"" + stepId + "\">" + (i+1) + "</li>");
    $("#"+stepId).click( function() {
      var idStr = $(this).attr("id");
      var newTaskIdx = parseInt(idStr.split("_")[1]);
      myLog("---- Experimenter clicks the progress bar to switch from #" + currentTaskIdx + " to #" + newTaskIdx +".");
      currentTaskIdx = newTaskIdx;
      currentConditionId = taskList[currentTaskIdx].condition;
      initializeTask( currentTaskIdx, currentConditionId);
    });
  }

  createMasterSwitches();
  initializeTask(currentTaskIdx,currentConditionId);

  $("#done-btn").click( function() {
    if ( $("#user-answer").css("display") == "none" ) {
      myLog("User clicked \"Done\" to indicate that s/he is ready.");
    }
    else {
      myLog("User clicked \"Done\" to indicate that s/he is ready, with this content as answer: \"" + $("#user-answer").val() + "\".");
    }

    $("#answer-error-msg").html("<span style=\"color:black;\">Waiting for experimenter...</span>");

    var stopAcceptingKeys = false;
    $(document).keypress( function(e) {
      if ( e.which == 87 && !stopAcceptingKeys) {     // "W"
        myLog("Task accepted by experimenter.");
        currentTaskIdx++;
        stopAcceptingKeys = true;
        $("#editor-wrapper").fadeOut(200, function() {
          initializeTask(currentTaskIdx,currentConditionId);
          $("#editor-wrapper").fadeIn(0, function() { });
        });
      }
      else {
        myLog("Task NOT accepted by experimenter, continuing.");
      }
      $(document).off("keypress");
      $("#answer-error-msg").text("");
    });

  });

  $("#show-text").click( function() {
    $("#editor").show();
    $("#show-text").hide();
    $("#user-answer-wrapper").show();
    myLog("Content shown. User clicked \"Got it!\"");
  });

  function createCustomButton(customButtonData) {

    var id = customButtonData.id;
    var title = customButtonData.title;
    var className = customButtonData.className;
    var imgName = customButtonData.imgName;
    var onActivate = customButtonData.onActivate;

    var newBtn = "<button id=\""+id+"\" type=\"button\" " +
      "class=\"btn btn-default btn-sm btn-small mybutton " + className + "\" " +
      "title=\""+title +
      "\" tabindex=\"-1\">" +
      "<img src=\"./static/img/" + imgName + "\" class=\"mybutton-icon\"/>" +
      "<i class=\"fa "+className+"\"></i></button>";

    if (customButtonData)
    $(".note-mymenu").append(newBtn);

    // Button tooltips
    $("#"+id).tooltip({container: 'body', placement: 'bottom'});
    // Button events
    $("#"+id).click(function(event) {
      onActivate.call(event);
      $("#editor .note-editor .preview").removeClass("preview");
    });

    // Add the custom button to our buttons object:
    buttons.push(
      { action: undefined,      // The invokding function within SummerNote. For custom buttons there is no such thing.
        invocationName: className,// Unique part of the filename
        buttonCss: undefined,   // No unique identifier in summernote
        iCss: className,         // the unique class name of the button's <i> element
        customData : customButtonData
      }
    );
  };

  function enterPrompt(editorId,index) {
    //$(editorId + " .summernotecontainer").summernote('reset');
    var thisTask = prompts[ taskList[index].taskId ];
    $("#tasklabel").html(thisTask.label);
    $("#instruction").html(thisTask.instruction);

    if ( typeof(thisTask.content) == "undefined" || thisTask.content == null) {
      $(editorId + " .summernotecontainer").html("");
      //$(editorId).css("visibility","hidden");
      $(editorId).hide();
      $("#show-text").hide();
      $("#user-answer-wrapper").show();
    }
    else {
      $(editorId + " .summernotecontainer").html(thisTask.content);
      //$(editorId).css("visibility","visible");
      //$(editorId).show();
    }

    if ( thisTask.answerPrompt != null) {
      $("#answer-prompt").text(thisTask.answerPrompt).show();
      $("#user-answer").show();

      // If the user needs to give an answer, do not let him/her push "Done" before there is some content:
      $("#done-btn").prop("disabled",true).addClass("disabled");
      $("#user-answer").keyup( function() {

        if ( $("#user-answer").val().length > 0 ) {

          var test =  { valid:true };
          if ( typeof( thisTask.answerIsValid ) != "undefined" ) {
            test = thisTask.answerIsValid( $("#user-answer").val() );
          }

          if ( test.valid == false ) {
            $("#answer-error-msg").text(test.msg);
            $("#done-btn").prop("disabled",true).addClass("disabled");
          }
          else {
            $("#done-btn").prop("disabled",false).removeClass("disabled");
            $("#answer-error-msg").text("");
          }
        }
        else {
          $("#done-btn").prop("disabled",true).addClass("disabled");
          $("#answer-error-msg").text("");
        }
      });
      $("#user-answer").keypress( function(e) {
        if (e.which == 13) {                      // if user pressed enter
          $("#done-btn").click();
        }
      });
    }
    else {
      if ( typeof(thisTask.content) == "undefined" || thisTask.content == null) {
        $("#answer-prompt").text("").hide();
        $("#user-answer").hide();
        $("#show-text").hide();
      }
      else {
        $("#answer-prompt").text("").hide();
        $("#user-answer").hide();
        $("#show-text").show();
        $("done-btn").show();
      }
    }

    if ( thisTask.buttonText != null) {
      $("#done-btn").text(thisTask.buttonText).show();
    }
    else {
      $("#answer-prompt").text("").hide();
      $("#done-btn").hide();
    }
  }

  function resetEditor() {
    $("#editor button").off("click mouseout mouseenter");
    $("#editor").summernote("destroy");
    $("#editor").empty().hide();
    $("#editor").html("<div class=\"summernotecontainer\"></div><div class=\"condition-video-popup\"></div>");
    $("#condition-video-popup").remove();
    $("#show-text").show();
    $("#user-answer-wrapper").hide();
  };

  function initializeTask(taskIdx,condition) {
    resetEditor();
    enterPrompt("#editor",taskIdx);
    createEditorScreen();
    $("#user-answer").val("");
    $("#editor .summernotecontainer").focus();
    $("#progressbar li").removeClass("current");
    $("#progress_" + taskIdx).addClass("current");

    myLog("Task instruction displayed.");
  };

  function addResetButton() {
    $(".note-mymenu").append(
      "<div class=\"btn-group\">" +
      "<button id=\"reset\" type=\"button\" class=\"note-btn btn btn-default btn-sm\" title data-original-title=\"Reset all\">Start over</button>" +
      "</div>");
    $("#reset").click( function() {
      $("#editor .note-editable").html(  prompts[taskList[currentTaskIdx].taskId].content);
      $("#editor .summernotecontainer").summernote("focus");
    });
  }

  function createEditorScreen(conditionOverride) {
    $("#editor .summernotecontainer").summernote( {
      shortcuts: false,
      toolbar: [["mymenu", popoverButtons ]],
      callbacks: {
        onInit: function() {

          for ( var i = 0 ; i < customButtons.length ; i ++ ) {
            createCustomButton(customButtons[i]);
          }

          $("#editor .note-editable").attr("spellcheck","false");
          addResetButton();

          // Add condition-based modifications:

          var condition = taskList[currentTaskIdx].condition;
          if ( typeof(conditionOverride) != "undefined") {
            condition = conditionOverride;
          }

          if ( condition == "baseline" ) {
            initBaselineCondition("#editor",buttons);
          }
          else if (condition == "video") {
            initVideoCondition("#editor",buttons)
          }
          else {
            initInteractiveCondition("#editor",buttons);
          }

          // Interaction logging events:
          $("#editor .note-toolbar button").click( function(e) {
            var jqButton = $(e.target);
            if ( jqButton.is("button") == false ) {
              jqButton = jqButton.parents("button");
            }
            if ( !jqButton.hasClass("fake-click") ) {
              // "fake-click" means that the click resulted from interactive condition's programmatically triggered click
              // and not from user's action
              myLog("User clicks at " + jqButton.attr("data-original-title"));
            }
            else {
              jqButton.removeClass("fake-click");
            }
          });
          $("#editor .note-toolbar button").mouseenter( function(e) {
            var jqButton = $(e.target);
            if ( jqButton.is("button") == false ) {
              jqButton = jqButton.parents("button");
            }
            myLog("User hovers at " + jqButton.attr("data-original-title"));
          });
          $("#editor .note-editable").mouseenter( function(e) {
            myLog("User hovers at editable window.");
          });
          $("#editor .note-editable").find("p, li, h1, h2, h3, h4, h5, h6").mouseenter( function(e) {
            //myLog("User hovers at line \"" + $(e.target).text().trim() + "\".");
          });
          $("#editor .note-editable").click( function(e) { //}).find("p, li, h1, h2, h3, h4, h5, h6").click( function(e) {

            var clickedRow = e.target;
            while ( $(clickedRow).is("span, b, u, i, a, strong") ) {
              clickedRow = clickedRow.parentElement;
            }
            var charPos = getCaretCharacterOffsetWithin(clickedRow);
            myLog("User clicks char #" + charPos + " at line \"" + $(clickedRow).text().trim() + "\"."); // YYY
          });


          $("#editor .summernotecontainer").focus();
        }
      }
    });
  }


  function createMasterSwitches() {

    // Populate the master switches with content:
    for (var i = 0 ; i < taskList.length ; i++) {
      var thisPrompt = prompts[ taskList[i].taskId ];
      var id = uniqueId();
      $("#prompt-masterswitch").append("&nbsp;&nbsp;<input type=\"radio\" name=\"prompt\" value=\"" + i + "\"" +
        "id=\"" + id + "\" " +
        "/> <label for=\"" + id + "\" <span class=\"prompt-label\">" + thisPrompt.label + "</span></label><br/>");
    }

    // Event handlers:
    $("#prompt-masterswitch input").change( function() {

      resetEditor();

      // Enter the new prompt and reset the condition selector:
      enterPrompt("#editor",parseInt( $(this).prop("value")) );
      $("#condition-masterswitch input").prop('checked', false);
      $("#condition-masterswitch input").prop("disabled",false);
      $("#condition-masterswitch .condition-label").removeClass("disabled");
      $("#condition-selector .condition-help").css("display","inline");
      $("#editor-wrapper").addClass("disabled");
    });

    $("#condition-masterswitch input").change( function() {
      currentConditionId = $("#condition-masterswitch input[name=condition]:checked").val();

      createEditorScreen(currentConditionId);
      $("#condition-masterswitch input").prop("disabled",true);
      $("#condition-masterswitch .condition-label").addClass("disabled");
      $("#editor .summernotecontainer").focus();
      $("#condition-selector .condition-help").css("display","none");
      $("#editor-wrapper").removeClass("disabled");
    });
  }

  // Hide/show switches for the handler and the log:
  $("#master-wrapper").addClass("displaynone");
  $("#showmaster").text("Show");
  $("#showmaster").click( function() {
      if ( $("#master-wrapper").hasClass("displaynone") ) {
        $("#master-wrapper").removeClass("displaynone");
        $("#showmaster").text("Hide");
      }
      else {
        $("#master-wrapper").addClass("displaynone");
        $("#showmaster").text("Show");
      }
  });

  $("#log").addClass("displaynone");
  $("#showlog").text("Show");
  $("#showlog").click( function() {
      if ( $("#log").hasClass("displaynone") ) {
        $("#log").removeClass("displaynone");
        $("#showlog").text("Hide");
      }
      else {
        $("#log").addClass("displaynone");
        $("#showlog").text("Show");
      }
  });


});

// -------------------------------------------- Baseline condition ---------------------------
function initBaselineCondition(editorId,buttons) {

  // TODO: Create loggers
  myLog("Condition initialised (baseline).");
}


// -------------------------------------------- Video condition ---------------------------
function initVideoCondition(editorId,buttons) {

  var mouseEntered = false;

  initMouseEnterTriggers();
  initMouseOutTriggers();
  initClickTriggers();

  myLog("Condition initialised (video).");

  function initMouseEnterTriggers() {

    $("body").append( "<div id=\"condition-video-popup\"></div>" );

    // Trigger actions on mouseovers:
    //$hoverMenu.find("button").mouseenter( function(e) {
    $(editorId + " .note-editor button").mouseenter( function(e) {

      var $hoveredElem = $(e.target).find("i");
      mouseEntered = true;

      if ( $hoveredElem.length == 0 ) {
        // Mouseenter on elem that does not have <i> => skipping: " + $hoveredElem.prop("class")
        return;
      }
      else {
        //console.log("Mouseenter on " + $hoveredElem.prop("class"));
      }

      //$("#summernote").summernote("insertOrderedList");

      // Find which element was hovered:
      var hoveredAction = undefined;
      for ( var i = 0 ; i < buttons.length ; i++ ) {
        if ( $hoveredElem.hasClass( buttons[i].iCss ) ) {
          hoveredAction = buttons[i].invocationName;
          break;
        }
      }
      if ( typeof(hoveredAction) == "undefined" ) {
        myLog("ERROR in video condition: This hovered element not found from the list of buttons: "+$hoveredElem.prop("class"));
        return;
      }

      // Show the preview:
      myLog("Video preview of \"" + hoveredAction + "\"");
      $("#condition-video-popup").html("<img src=\"./static/img/video-" + hoveredAction + ".gif\" />");
      var buttonPos = $(e.target).offset();
      var videoPos = {
          "left": buttonPos.left + "px",
          "top": (buttonPos.top - $("#condition-video-popup").height() - 10) + "px"
      };
      $("#condition-video-popup").css(videoPos).css("visibility","visible");
    });
  }

  function initMouseOutTriggers() {

    // Undo mouseenter action when the mouse leaves the element:
    //$hoverMenu.find("button").mouseleave( function(e) {
    $(editorId + " .note-editor button").mouseleave( function(e) {
      $("#condition-video-popup").css("visibility","hidden");
    });
  }

  function initClickTriggers() {
    // The basic reporting tools are good enough:
    return;

    /*
    $(editorId + " .note-editor button").click( function(e) {

      var clickedElemBtn = undefined;
      if ( $(e.target).is("i, img, path, svg") ) {
        clickedElemBtn = $(e.target).parents("button");
      }
      else if ( $(e.target).is("button") ) {
        clickedElemBtn = $(e.target);
      }
      if ( $(e.target).is("span") && $(e.target).hasClass("note-icon-caret") ) {
        // Means that user clicked a dropdown arrow next to a button

        alert("hoi");
      }
      else {
        console.log("ERROR: Something weird was clicked:");
        console.log(e.target);
      }

      myLog("Action confirmed: "+ clickedElemBtn.attr("data-original-title"));
      //myLog("Action confirmed: "+ clickedElemBtn.find("i").prop("class"));
    });
    */
  }
}



// -------------------------------------------- Interactive condition ---------------------------
function initInteractiveCondition(editorId,buttons) {

  //var $hoverMenu = $("#myhovermenu");
  var mouseEntered = false;

  // Populate the hover menu with the same controls as in summernote's popover menu:
  //$hoverMenu.html( $(".note-air-popover").html() );
  //$hoverMenu.html( $(".note-toolbar").html() );

  initMouseEnterTriggers();
  initMouseOutTriggers();
  initClickTriggers();
  //initVisibilityWatch();
  //$hoverMenu.show();
  myLog("Condition initialised (interactive).");

  function initMouseEnterTriggers() {

    // Trigger actions on mouseovers:
    //$hoverMenu.find("button").mouseenter( function(e) {
    $(editorId + " .note-editor button").mouseenter( function(e) {

      var $hoveredElem = $(e.target).find("i");
      mouseEntered = true;

      if ( $hoveredElem.length == 0 ) {
        myLog("ERROR: Mouseenter on elem that does not have <i> => skipping: " + $hoveredElem.prop("class"));
        return;
      }

      // Find which element was hovered:
      var hoveredAction = undefined;
      for ( var i = 0 ; i < buttons.length ; i++ ) {
        if ( $hoveredElem.hasClass( buttons[i].iCss ) ) {
          // OK, we found a match from buttons.

          hoveredAction = buttons[i].invocationName;
          myLog("Interactive preview of \"" + hoveredAction + "\"");

          // Trigger the action: either a standard Summernote action or a custom action.
          if ( typeof( buttons[i].customData ) == "undefined" ) {
            // OK, this is an action that Summernote provides
            $(editorId + " .summernotecontainer").summernote(hoveredAction);
          }
          else {
            // This is our custom action.
            buttons[i].customData.onActivate.call(e);
          }
          break;
        }
      }
      if ( typeof(hoveredAction) == "undefined" ) {
        myLog("ERROR: This hovereed element not found from the list of buttons: "+$hoveredElem.prop("class"));
      }
    });
  }

  function initMouseOutTriggers() {

    // Undo mouseenter action when the mouse leaves the element:
    //$hoverMenu.find("button").mouseleave( function(e) {
    $(editorId + " .note-editor button").mouseleave( function(e) {

      // Do not do anything if mouseleave has been explicitly cancelled. This
      // happens if user has pressed the button to actually execute the action.
      if ( !mouseEntered ) {
        return;
      }

      var $hoveredElem = $(e.target).find("i");

      if ( $hoveredElem.length == 0 ) {
        myLog("WARNING: mouseleave on elem that does not have <i> => skipping: " + $hoveredElem.prop("class"));
        return;
      }

      // Find which element was outhovered:
      var hoveredAction = undefined;
      for ( var i = 0 ; i < buttons.length ; i++ ) {
        if ( $hoveredElem.hasClass( buttons[i].iCss ) ) {
          hoveredAction = buttons[i].invocationName;

          if ( typeof( buttons[i].customData ) == "undefined" ) {
            myLog("Interactive preview cancellation on \"" + hoveredAction + "\"");
            //console.log("issuing: "+hoveredAction);

            if ( hoveredAction == "foreColor" ) {
              $(editorId + " .summernotecontainer").summernote(hoveredAction,"#ff0000");
            }
            else {
              $(editorId + " .summernotecontainer").summernote(hoveredAction);
            }
          }
          else {
            var cancelDone = buttons[i].customData.onDeactivate.call(e);
            if (cancelDone) {
              myLog("Interactive preview cancellation on \"" + hoveredAction + "\"");
            }
          }
          break;
        }
      }
      if ( typeof(hoveredAction) == "undefined" ) {
        myLog("ERROR: This hovered element not found from the list of buttons: "+$hoveredElem.prop("class"));
        return;
      }

      /*
      if ( typeof buttons[i].invocationCancelName !== "undefined" ) {
        // If an "invocationCancelName" can also be found, use it. Instead cancel then actions
        // by invoking the same action again:
        hoveredAction = buttons[i].invocationCancelName;
      }

      // Trigger the action:
      myLog("Interactive preview cancellation on \"" + hoveredAction + "\"");
      $(editorId + " .summernotecontainer").summernote(hoveredAction);
      //$("#summernotecontainer").find("i."+buttons[i].iCss).parents("button").click();
      */
    });
  }

  function initClickTriggers() {
    var hackClickDone = false;
    $(editorId + " .note-editor button").click( function(e) {

      var clickedElemBtn = undefined;
      if ( $(e.target).is("i, img") ) {
        clickedElemBtn = $(e.target).parents("button")
      }
      else if ( $(e.target).is("button") ) {
        clickedElemBtn = $(e.target);
      }
      //console.log("clickedElemBtn:");
      //console.log(clickedElemBtn);

      if (hackClickDone == false) {
        // Basic click reporting is enough:
        // myLog("Action confirmed: "+ clickedElemBtn.find("i").prop("class"));

        hackClickDone = true;
        clickedElemBtn.addClass("fake-click");     // Prevents duplicate click reporting
        $(e.target).click();
      }
      else {
        hackClickDone = false;
      }
      mouseEntered = false;
    });
  }
}

// http://jsbin.com/anadox/3/edit?html,output
function createSelection(field, start, end) {
    if( field.createTextRange ) {
        var selRange = field.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end);
        selRange.select();
    } else if( field.setSelectionRange ) {
        field.setSelectionRange(start, end);
    } else if( field.selectionStart ) {
        field.selectionStart = start;
        field.selectionEnd = end;
    }
    //field.focus();
}


var myId = 0;

function myLog(data) {

  // Needed to escape non-ascii letters without server-side errors:
  // https://stackoverflow.com/questions/7499473/need-to-escape-non-ascii-characters-in-javascript


  function unicodeEscape(string) {

    function padWithLeadingZeros(string) {
        return new Array(5 - string.length).join("0") + string;
    }

    function unicodeCharEscape(charCode) {
        return "\\u" + padWithLeadingZeros(charCode.toString(16));
    }
      return string.split("")
                   .map(function (char) {
                       var charCode = char.charCodeAt(0);
                       return charCode > 127 ? unicodeCharEscape(charCode) : char;
                   })
                   .join("");
  }

  var printToConsole = true;
  var sendToServer = true;
  var printToDOM = true;

  if ( typeof data != "string" ) {
    // Just print to console.log() but do not send to server:
    console.log(data);
    return;
  }

  data = unicodeEscape(data);

  var timeNow = new Date();
  var timeNowString = timeNow.toISOString();
  timeNowString = timeNowString.slice(0,-1);  // beautification: removes the trailing "Z" that denotes UTC time zone
  var unixTime = timeNow.getTime() + " | ";   // reassign to "" if you don't want this

  var thisTask = prompts[ taskList[currentTaskIdx].taskId ];
  var msg = timeNowString + " | " + unixTime + currentTaskIdx + "/" + taskList[currentTaskIdx].condition + "/" + thisTask.label + " | " + data;

  if (printToConsole) {
    console.log(data);
  }

  if (sendToServer) {
    jQuery.ajax({
      type: "POST",
      data: {textfield :  msg},
      success: function(response) {
        $("body").removeClass("noserver");
        $("#warning-noserver").hide();
        //jQuery('#foo').html(response).hide().fadeIn(1500);
      },
      error: function(response) {
        $("body").addClass("noserver");
        $("#warning-noserver").show();
      }
    });
  }

  if (printToDOM) {
    $("#log").prepend("<p>" + msg + "</p>");
    /*
    $("#" + thisId).css("background-color","#ff9");
    setTimeout( function() {
      $("#" + thisId).css("background-color","transparent");
    },500);
    */
  }
}

function uniqueId() {
  return Date.now().toString() + "" + Math.floor( Math.random() * 100000 ).toString()
}




// https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}
