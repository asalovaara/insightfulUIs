mouseOverFindnreplaceToolbar = false;

// Define what buttons to show and what its CSS identifiers are:
var buttons = [
  { action: "bold",
    invocationName : "bold",
    buttonCss: "note-btn-bold",
    iCss: "note-icon-bold",
    customData: {
      onActivate: function() { basicButtonOnActivate("bold","b"); },
      onDeactivate: function() { return basicButtonOnDeactivate("bold","b"); }
    }
  },
  { action: "italic",
    invocationName : "italic",
    buttonCss: "note-btn-italic",
    iCss: "note-icon-italic",
    customData: {
      onActivate: function() { basicButtonOnActivate("italic","i"); },
      onDeactivate: function() { return basicButtonOnDeactivate("bold","i"); }
    }
  },
  { action: "underline",
    invocationName : "underline",
    buttonCss: "note-btn-underline",
    iCss: "note-icon-underline",
    customData: {
      onActivate: function() { basicButtonOnActivate("underline","u"); },
      onDeactivate: function() { return basicButtonOnDeactivate("underline","u"); }
    }
  },
  { action: "strikethrough",
    invocationName: "strikethrough",
    buttonCss: "note-btn-strikethrough",
    iCss: "note-icon-strikethrough",
    customData: {
      onActivate: function() { basicButtonOnActivate("strikethrough","strike"); },
      onDeactivate: function() { return basicButtonOnDeactivate("strikethrough","strike"); }
    }
  },
  { action: "superscript",
    invocationName: "superscript",
    buttonCss: "note-btn-superscript",
    iCss: "note-icon-superscript",
    customData: {
      onActivate: function() { basicButtonOnActivate("superscript","sup"); },
      onDeactivate: function() { return basicButtonOnDeactivate("superscript","sup"); }
    }
  },
  { action: "subscript",
    invocationName: "subscript",
    buttonCss: "note-btn-subscript",
    iCss: "note-icon-subscript",
    customData: {
      onActivate: function() { basicButtonOnActivate("subscript","sub"); },
      onDeactivate: function() { return basicButtonOnDeactivate("subscript","sub"); }
    }
  },
  { action: "ul",
    invocationName: "insertUnorderedList",
    buttonCss: undefined,  // No unique identifier in summernote
    iCss: "note-icon-unorderedlist"
  },
  { action: "ol",
    invocationName: "insertOrderedList",
    buttonCss: undefined, // No unique identifier in summernote
    iCss: "note-icon-orderedlist"
  },

  { action: "findnreplace",
    invocationName : "findnreplace",
    buttonCss: "XXXfindnreplace",
    iCss: "note-icon",
    customData: {
      onActivate: function() { findnreplaceOnActivate(); },
      onDeactivate: function() { return findnreplaceOnDeactivate(); }
    }
  },
  /*
  // This can be added if we write a custom function for adding the horizontal row:
  { action: "hr",
    invocationName: "hr",
    buttonCss: "note-btn-hr",
    iCss: "note-icon-minus"
  },
  */
  /*
  // Removed because of same reason as hr
  { action: "picture",
    invocationName: "picture",
    buttonCss: "note-btn-picture",
    iCss: "note-icon-picture"
  },
  */
  /*
  // Can be added if we save the previous style setting somewhere and are ready to return it
  { action: "style",
    invocationName: "style",
    buttonCss: "note-btn-style",
    iCss: "note-icon-style"
  },
  */
  /*
  // Removed for same reason as style
  { action: "paragraph",
    invocationName: "paragraph",
    buttonCss: "note-btn-paragraph",
    iCss: "note-icon-paragraph"
  },
  */

  /*
  // Removed because of same reason as hr
  { action: "table",
    invocationName: "table",
    buttonCss: "note-btn-table",
    iCss: "note-icon-table"
  },
  */
  /*
  // Color cannot be used: its toggling on/off in interactive preview is too difficult because
  // summernote does not tag the highlighted area with special class names.
  { action: "color",
    invocationName : "customInvocationColor",
    buttonCss: "note-current-color-button", // Class of the <button>
    iCss: "note-recent-color", // Class of the nested <i>
    customData: {
      onActivate: function() { colorOnActivate(); },
      onDeactivate: function() { return colorOnDeactivate(); }
    }
  },
  */
  /*
  { action: "codeview",
    invocationName: "XXX", // NOTE: this may not be invokable programmatically?,
    buttonCss: undefined, // No unique identifier in summernote
    iCss: "note-icon-code"
  },
  { action: "undo",
    invocationName: "undo", // NOTE: this may not be invokable programmatically?,
    invocationCancelName: "redo",
    buttonCss: undefined, // No unique identifier in summernote
    iCss: "note-icon-undo"
  },
  { action: "redo",
    invocationName: "redo", // NOTE: this may not be invokable programmatically?,
    buttonCss: undefined, // No unique identifier in summernote
    iCss: "note-icon-redo"
  },
  */
];

var customButtons = [
  /*
  { id: "bold",
    title: "Bold",
    className : "icon-bold",
    imgName : "icon-bold.png",
    place: "before basic features",
    onActivate: function(event) {
    }),
    onDeactivate: function(event) {
    })
  },
  { id: "italic",
    title: "Italic",
    className : "icon-italic",
    imgName : "icon-italic.png",
    place: "before basic features",
    onActivate: function(event) {
    }),
    onDeactivate: function(event) {
    })
  },
  { id: "underline",
    title: "Underline",
    className : "icon-underline",
    imgName : "icon-underline.png",
    place: "before basic features",
    onActivate: function(event) {
    }),
    onDeactivate: function(event) {
    })
  },
  { id: "strikethrough",
    title: "Strike through",
    className : "icon-strikethrough",
    imgName : "icon-strikethrough.png",
    place: "before basic features",
    onActivate: function(event) {
    }),
    onDeactivate: function(event) {
    })
  },
  { id: "superscript",
    title: "Superscript",
    className : "icon-superscript",
    imgName : "icon-superscript.png",
    place: "before basic features",
    onActivate: function(event) {
    }),
    onDeactivate: function(event) {
    })
  },
  { id: "subscript",
    title: "Subscript",
    className : "icon-subscript",
    imgName : "icon-subscript.png",
    onActivate: function(event) {
    }),
    onDeactivate: function(event) {
    })
  },
  */
  {
    id: "alignLeft",
    title: "Align left",
    className: "icon-left",
    imgName: "align-left.png",
    place: "after basic features",
    onActivate: function(event) {
      alignmentOnActivate("align-left");
    },
    onDeactivate: function(event) {
      alignmentOnDeactivate("align-left");
      return true;
    }
  },
  {
    id: "alignRight",
    title: "Align right",
    className: "icon-right",
    imgName: "align-right.png",
    place: "after basic features",
    onActivate: function(event) {
      alignmentOnActivate("align-right");
    },
    onDeactivate: function(event) {
      alignmentOnDeactivate("align-right");
      return true;
    }
  },
  {
    id: "alignCenter",
    title: "Align center",
    className: "icon-center",
    imgName: "align-center.png",
    place: "after basic features",
    onActivate: function(event) {
      alignmentOnActivate("align-center");
    },
    onDeactivate: function(event) {
      alignmentOnDeactivate("align-center");
      return true;
    }
  },
  /*
  {
    id: "alignBoth",
    title: "Align both left and right",
    className: "icon-both",
    imgName: "align-both.png",
    onActivate: function(event) {
      alignmentOnActivate("align-both");
    },
    onDeactivate: function(event) {
      alignmentOnDeactivate("align-both");
      return true;
    }
  },
  */
  {
    id: "makeRTL",
    title: "Change text direction go right-to-left",
    className: "icon-rtl",
    imgName: "pen-RTL.png",
    place: "after basic features",
    onActivate : function(event) {
      var area = forEachCharacterInRangeDo( function(jqSpan) {
        $(jqSpan).find(".ltr, .rtl").removeClass("ltr rtl");
        $(jqSpan).addClass("preview rtl");
      });
      if (typeof(area) != "undefined") {
        reportAreaToLog(area);
      }
    },
    onDeactivate: function(event) {
      $("#editor .note-editor .preview").removeClass("rtl preview");
      return true;
    }
  },
  {
    id: "makeLTR",
    title: "Change text direction go left-to-right",
    className: "icon-ltr",
    imgName: "pen-LTR.png",
    place: "after basic features",
    onActivate: function(event) {

      var area = forEachCharacterInRangeDo( function(jqSpan) {
        $(jqSpan).find(".ltr, .rtl").removeClass("ltr rtl");
        $(jqSpan).addClass("ltr");
      });
      if (typeof(area) != "undefined") {
        reportAreaToLog(area);
      }
    },
    onDeactivate: function(event) {
      $("#editor .note-editor .preview").removeClass("ltr preview");
    }
  },
  {
    id: "sort",
    title: "Sort the lines alphabetically",
    className: "icon-sort",
    imgName: "sort.png",
    place: "after basic features",
    onActivate: function(event) {

      function joinHtmlFields(lines) {
        var ret = "";
        for (var i = 0 ; i < lines.length ; i++) {
          ret = ret + lines[i].html;
        }
        return ret;
      }

      //debugger;
      // Clean up anything that possibly remains from previous sorts:
      $("#sortbackupcontent").remove();
      $("#sortedcontent p").unwrap();

      var lines = [];
      var sel = window.getSelection();
      if (sel.type == "None") {   // If user had not selected anything
        return;
      }
      sel = sel.getRangeAt(0);
      var curRow = getParentElement(sel.startContainer,["P","LI","UL","OL","DIV"]);
      var endRow = getParentElement(sel.endContainer,["P","LI","UL","OL","DIV"]);

      if (curRow == endRow) {
        return;
      }

      // Before anything is harmed, chek that we do not want to sort areas where rows are not of same type:
      var firstNodeName = curRow.nodeName;
      var tempRow = getParentElement(sel.startContainer,["P","LI","UL","OL","DIV"]);
      while ( tempRow != null && tempRow !== endRow) {
        tempRow = tempRow.nextSibling;

        if (tempRow.nodeName != firstNodeName) {
          // We do not want to sort areas where rows are not of same type:
          return;
        }
      }

      $("body").append("<div id=\"sortbackupcontent\" style=\"display:none;\"></div>");
      var backupDiv = $("#sortbackupcontent");
      $(curRow).before("<div id=\"sortedcontent\"></div>");



      var nextRow;
      while ( curRow != null && curRow !== endRow) {
        lines.push( { html: curRow.outerHTML, txt: $(curRow).text()} );
        //lines.push( curRow.outerHTML );
        backupDiv.append( $(curRow).clone() );
        nextRow = curRow.nextSibling;
        $(curRow).remove();
        curRow = nextRow;
      }
      lines.push( { html: curRow.outerHTML, txt: $(curRow).text()} );
      //lines.push( curRow.outerHTML );
      backupDiv.append( $(curRow).clone() );
      $(curRow).remove();

      lines.sort(function(s1,s2) {
        if (s1.txt.trim() == "") {      // sort empty rows to the end
          return 1;
        }
        else if (s2.txt.trim() == "") {
          return -1;
        }
        else {
          return s1.txt.localeCompare(s2.txt);
        }

      });
      $("#sortedcontent").html( joinHtmlFields(lines) );
      $("#sortedcontent p").addClass("preview");
    },
    onDeactivate: function(event) {
      $("#sortedcontent").html( $("#sortbackupcontent").html() );
      $("#sortbackupcontent").remove();
      $("#sortedcontent p").removeClass("preview");
      $("#sortedcontent p").unwrap();
      return true;
    }
  }

];
function getParentElement(elem,targetParents) {
  var curNode = elem;
  while ( !targetParents.includes(curNode.nodeName) ) {
    curNode = curNode.parentNode;
    if ( curNode.nodeName == "BODY" ) {
      console.log("ERROR: Runaway search for parent elements");
      debugger;
    }
  }
  return curNode;
}
function getCursorRowIdx(rangeContainer) {
  // rangeContainer should be either startContainer or endContainer, retrieved with window.getSelection().getRangeAt(0)

  // Count the number of steps upward until there are no previous siblings:
  var count = 0;
  var curRow = getParentElement(rangeContainer,["P","LI","UL","OL","DIV"])
  while ( getPreviousRow(curRow) != null ) {
    count++;
    curRow = getPreviousRow(curRow);
  }
  return count;
}




function getPreviousRow(curRow) {
  // Row can be a <p> or a <li> and they appear in different depths, Because
  // li's are nested within ul and ol. Therefore we need some tricks to traverse correctly.

  if ( curRow == null ) {
    return null;
  }
  else if ( curRow.previousSibling == null ) {
    if ( curRow.nodeName == "LI" ) {
      curRow = curRow.parentNode.previousSibling;

      // If two ol's or ul's are after each other, then
      // curRow can be an ol or ul and not a p or li.
      // Fix this bug if it becomes important.
    }
    else {
      curRow = curRow.previousSibling;
    }
  }
  else if ( curRow.previousSibling.nodeName == "OL" || curRow.previousSibling.nodeName == "UL") {
    var listElem = curRow.previousSibling;
    curRow = listElem.childNodes[ listElem .childNodes.length-1 ];
  }
  else {
    curRow = curRow.previousSibling;
  }

  return curRow;
}

function getNextRow(curRow) {

  if ( curRow == null ) {
    return null;
  }
  else if ( curRow.nextSibling == null ) {
    if ( curRow.nodeName == "LI" ) {
      curRow = curRow.parentNode.nextSibling;
      // If two ol's or ul's are after each other, then
      // curRow can be an ol or ul and not a p or li.
      // Fix this bug if it becomes important.
    }
    else {
      curRow = curRow.nextSibling;
    }
  }
  else if (curRow.nextSibling.nodeName == "OL" || curRow.nextSibling.nodeName == "UL") {
    curRow = curRow.nextSibling.childNodes[0];
  }
  else {
    curRow = curRow.nextSibling;
  }
  return curRow;
}

/*
function sortSelection(sel) {

  function rowsAreSame(rowElem1,rowElem2) {
    return rowElem1 === rowElem2;
  }

  function getCollapsedArea(sel) {
    // Gathers every <p> and <li> from the range and returns them in a list

    var ret = [];
    var curRow = getParentElement(sel.startContainer,["P","LI","H1","H2","H3"]);
    var endRow = getParentElement(sel.endContainer,["P","LI","H1","H2","H3"]);
    var i = 0;
    while ( curRow != null && !rowsAreSame(curRow,endRow) ) {



      ret.push( "<p class=\"partofsort\" originalpos=\"" + i + "\">" + curRow.innerHTML + "</p>" );
      curRow = getNextRow(curRow);
      i++;
    }
    ret.push( "<p originalpos=\"" + i + "\">" + curRow.innerHTML + "</p>" );

    return ret;
  }

  var startRow = getCursorRowIdx(sel.startContainer);
  var endRow = getCursorRowIdx(sel.endContainer);

  var collapsedArea = getCollapsedArea(sel);
  ret.sort();

  return collapsedArea;
}
*/

function forEachCharacterInRangeDo(thisAction) {

  var sel = window.getSelection();
  if (sel.type == "None") {
    return;
  }
  sel = sel.getRangeAt(0);

  var startRow = getCursorRowIdx(sel.startContainer);
  var endRow = getCursorRowIdx(sel.endContainer);

  var area = {
    startIdx : startRow,
    endIdx : endRow,
    startStr: sel.startContainer.nodeValue,
    endStr: sel.endContainer.nodeValue
  }

  //debugger;

  if ( startRow == endRow ) {
    var wrapper = document.createElement("span");
    sel.surroundContents(wrapper);  // Works only on Chrome and when only one row is selected; see https://medium.com/@Alexandra2XU/window-getselection-and-range-in-javascript-5a13453d22
    thisAction.call(this,wrapper);
  }
  else {
    var rows = getParentElement(sel.commonAncestorContainer,["DIV"]);
    var curRow = rows.childNodes[0];

    // First go past those rows that are before startRow:
    var i;
    for (i = 0 ; i < startRow ; i++) {
      curRow = getNextRow(curRow);
    }

    // Then start that actual modifications:
    for ( var i = startRow ; i <= endRow ; i++ ) {

      if (i == startRow) {

        // We try to identify the position in innerHTML where the selection starts.
        // We use a combination of string search and startOffset:

        var parentPara = getParentElement(sel.startContainer,["P","LI"]);
        var parentHtml = parentPara.innerHTML;
        var startPosCandidate = parentPara.innerHTML.indexOf(sel.startContainer.nodeValue);
        //debugger;

        var uId = uniqueId();
        var newHtml = parentHtml.substring(0,startPosCandidate) +
          "<span id=\"" + uId + "\">" +
          parentHtml.substring(startPosCandidate) +
          "</span>";
        parentPara.innerHTML = newHtml;

        var jqSpan = $("#" + uId);
        jqSpan.removeAttr("id");
        thisAction.call(this,jqSpan);
      }
      else if (i == endRow) {
        var parentPara = getParentElement(sel.endContainer,["P","LI"]);
        var parentHtml = parentPara.innerHTML;
        var endPosCandidate = parentPara.innerHTML.indexOf(sel.endContainer.nodeValue) + sel.endOffset;
        //debugger;

        var uId = uniqueId();
        var newHtml = "<span id=\"" + uId + "\">" +
          parentHtml.substring(0,endPosCandidate) +
          "</span>" +
          parentHtml.substring(endPosCandidate);
        parentPara.innerHTML = newHtml;

        var jqSpan = $("#" + uId);
        jqSpan.removeAttr("id");
        thisAction.call(this,jqSpan);
      }
      else {
        var uId = uniqueId();
        curRow.innerHTML = "<span id=\"" + uId + "\">" + curRow.innerHTML + "</span>";
        var jqSpan = $("#" + uId);
        jqSpan.removeAttr("id");
        thisAction.call(this,jqSpan);
      }

      curRow = getNextRow(curRow);
    }
  }
  return area;
}

function forEachRowInRangeDo(thisAction) {

  var sel = window.getSelection();
  if (sel.type == "None") {
    return;
  }
  sel = sel.getRangeAt(0);
  var startIdx = getCursorRowIdx(sel.startContainer);
  var endIdx = getCursorRowIdx(sel.endContainer);

  var area = {
    startIdx : startIdx,
    endIdx : endIdx,
    startStr: sel.startContainer.nodeValue,
    endStr: sel.endContainer.nodeValue
  }
  //debugger;

  var curRow;
  var rows = getParentElement(sel.commonAncestorContainer,["DIV"]);
  for ( var i = startIdx ; i <= endIdx ; i++ ) {
    curRow = rows.childNodes[i];
    thisAction.call(this,curRow);
  }

  return area;
}


function basicButtonOnActivate(hoveredAction,wrapperTag) {
  // wrapperTag is the tag that SummerNote uses to make this style. We mimic here its way
  // of doing things and therefore do not use CSS classes.

  // If user has selected nothing, we make a change on the entire row.
  // This makes the UI consistent with the rest of the buttons.

  var sel = window.getSelection();
  console.log(sel.type);

  if (sel.type == "None") {
    // Cursor is nowhere. Let the basic summernote functions take care of everything.
  }
  else if (sel.type == "Range") {
    // Something was selected
    $("#editor .summernotecontainer").summernote(hoveredAction);
  }
  else {
    // Cursor is on a row.
    var range = sel.getRangeAt(0);
    var rowIdx = getCursorRowIdx(range.startContainer);
    console.log("Row = "+ rowIdx);
    var area = forEachRowInRangeDo(function(jqRow) {
      $(jqRow).addClass("preview");

      var c = $(jqRow).children();
      if ( c.is(wrapperTag) ) {
        // If the row already in itse entirety has this style, we must remove that style
        // by unwrapping the row elements from that tag. We replace innerHTML with contents
        // of inner element:

        // Doing this is somehow unreliable currently, so it is commented out        
        //$(jqRow).html( $(jqRow).children().html() );
      }
      else {
        // Inside the row, we surround its contents with the wrapperTag and a <span> that acts as a marker to find this again:
        $(jqRow).html( "<" + wrapperTag + ">" + $(jqRow).html() + "</" + wrapperTag + ">");
      }
    });
  }

}
function basicButtonOnDeactivate(hoveredAction,wrapperTag) {
  console.log("basicButtonOnDeactivate");
  var sel = window.getSelection();
  console.log(sel.type);

  if (sel.type == "None") {
    // Cursor is nowhere. Let the basic summernote functions take care of everything.
  }
  else if (sel.type == "Range") {
    // Something was selected
    $("#editor .summernotecontainer").summernote(hoveredAction);
  }
  else {
    // Cursor is on a row.
    var range = sel.getRangeAt(0);
    var rowIdx = getCursorRowIdx(range.startContainer);
    console.log("Row = "+ rowIdx);
    var area = forEachRowInRangeDo(function(jqRow) {


      var c = $(jqRow).children();
      if ( c.is(wrapperTag) ) {
        $(jqRow).html( $(jqRow).children().html() );
      }
      else {
        // Doing the opposite toggling somehow is unreliable currently, so it is commented out
        //$(jqRow).html( "<" + wrapperTag + ">" + $(jqRow).html() + "</" + wrapperTag + ">");
      }
      $(jqRow).removeClass("preview");
    });
  }
}

function alignmentOnActivate(activeClass) {

  var area = forEachRowInRangeDo(function(jqRow) {
    // Find and store the current alingmnent so that we can return to it if needed:
    var possibleAlignmentClasses = ["align-left","align-right","align-center","align-both"];
    var curAlignment = "align-left";  // The default if no alignment has been set
    var i = 0;
    while ( i < possibleAlignmentClasses.length ) {
      if ( $(jqRow).hasClass( possibleAlignmentClasses[i] ) ) {
        curAlignment = possibleAlignmentClasses[i];
        break;
      }
      i++;
    }
    $(jqRow).attr("prev-alignment",curAlignment);

    // Then change the class:
    $(jqRow).removeClass(curAlignment).addClass(activeClass);
  });
  if (typeof(area) != "undefined") {
    reportAreaToLog(area);
  }
}

function alignmentOnDeactivate(activeClass) {

  forEachRowInRangeDo(function(jqRow) {
    var oldClass = $(jqRow).attr("prev-alignment");
    $(jqRow).removeClass(activeClass).addClass(oldClass);
  });
}


function removeRowClass(range,removeTheseClasses,editableDiv,rowIdx) {
  // Find out if user has selected an area or not:
  if (range.sc == range.ec && range.so == range.eo) {
    // same end content and start content and also string locations
    // => user has not selected an area. We manipulate just the cursor row:

    var jqThisRow = $(editableDiv).children().eq(rowIdx);
    jqThisRow.removeClass( removeTheseClasses.join(" ") );
  }
  else if (range.sc == range.ec && range.so != range.eo) { // selected area from the same row

    // Also here the same row => do the same as above:
    var jqThisRow = $(editableDiv).children().eq(rowIdx);
    jqThisRow.removeClass( removeTheseClasses.join(" ") );
  }
  else {
    console.log("TODO: removeRangeStyle() with multi-row operation.")
  }
}

function addRowClass(range,addThisClass,editableDiv,rowIdx) {
  var jqThisRow = $(editableDiv).children().eq(rowIdx);
  jqThisRow.addClass(addThisClass);
}

function changeRangeStyle(range,newClass,editableDiv,rowIdx) {
  // Find out if user has selected an area or not:
  if (range.sc == range.ec && range.so == range.eo) {
    // same end content and start content and also string locations
    // => user has not selected an area. We apply the change to the entire row:

    // We operate on editableDiv's childnode because that contains the entire row.
    console.log("changeRangeStyle(): User has not selected a range => change the entire row.")

    // https://stackoverflow.com/questions/6249095/how-to-set-caretcursor-position-in-contenteditable-element-div


    var jqThisRow = $(editableDiv).children().eq(rowIdx);
    var cleanText = jqThisRow.text();
    jqThisRow.text(cleanText).removeClass().addClass(newClass + " preview");

    /*
    var startIdx = 0;
    var endIdx = range.sc.nodeValue.length;

    var startText = range.sc.nodeValue.substring(0,startIdx);
    var rtlText = "<span class=\"" + newClass + " preview\">" + range.sc.nodeValue.substring(startIdx,endIdx) + "</span>";
    var endText = range.sc.nodeValue.substring(endIdx,range.sc.nodeValue.length);

    var newText = startText + rtlText + endText;
    range.sc.parentElement.innerHTML = newText;
    */
  }
  else if (range.sc == range.ec && range.so != range.eo) { // selected area from the same row

    var startText = range.sc.nodeValue.substring(0,range.so);
    var rtlText = "<span class=\"" + newClass + " preview\">" + range.sc.nodeValue.substring(range.so,range.eo) + "</span>";
    var endText = range.sc.nodeValue.substring(range.eo,range.sc.nodeValue.length);

    var newText = startText + rtlText + endText;
    range.sc.parentElement.innerHTML = newText;
  }
  else if ( editableDiv.childNodes[rowIdx].innerHTML.toString().includes( range.sc.nodeValue ) &&
            editableDiv.childNodes[rowIdx].innerHTML.toString().includes( range.ec.nodeValue )  ){

      // This is a hack. Summernote's range object does not understand contents being from the same row
      // if there is right-to-left content in the middle of it. But by finding out that the .sc and .ec
      // are from the same row we know that this is the case.

      // Because range.so and range.eo seem to get messed up in this, we treat this action as the same
      // as if the whole row would be changed. Let's call the whole function again:

      range.so = 0;
      range.eo = 0;
      range.sc = range.ec;
      changeRangeStyle(range,newClass,editableDiv,rowIdx);
  }
  else {
  }
}

function findnreplaceOnActivate() {

  var range = $("#editor .summernotecontainer").summernote('createRange');
  var editableDiv = $("#editor .note-editable")[0];
  var rowIdx = getCursorRowIdx_old(editableDiv,range);

  //console.log(range.so + " - "+ range.eo + " --- \"" + range.sc.nodeValue + "\"");
  if (range.sc == range.ec && range.so == range.eo) {
  }
  else {

   // This would pre-populate the text field:
   var txt = range.sc.nodeValue.toString().substring(range.so,range.eo);
   $("#note-findnreplace-find").val(txt);

   $("#editor .note-editable p:contains('" + txt + "')").each( function(index) {

     // Highlight each string with the same text:
     var split1 = $(this).html().split(">"); // Foo <span>bar</span> blah => "Foo <span","bar</span","blah"
     var newHtml = "";
     var split2;
     var regex;
     for (var i = 0 ; i < split1.length ; i++) {
       split2 = split1[i].split("<");                     // "Foo <span" => "Foo ","span"

       // Use regexp objects, as suggested here:
       // https://stackoverflow.com/questions/542232/in-javascript-how-can-i-perform-a-global-replace-on-string-with-a-variable-insi
       regex = new RegExp(txt,"g");

       newHtml = newHtml + split2[0].replace(regex,"<span class=\"preview-findnr\">" + txt + "</span>");
       if (split2.length == 2) {
         newHtml = newHtml + "<" + split2[1];
       }
     }
     $(this).html(newHtml);
     //console.log( $(this).html() + " => " + newHtml);
   });


   moveCursor(rowIdx,editableDiv);
  }

  $("#findnreplaceToolbar").mouseenter( function() {
   mouseOverFindnreplaceToolbar = true;
   console.log("mouseOverFindnreplaceToolbar = true");
  });
  $("#findnreplaceToolbar").show().removeClass("hidden");
}

function findnreplaceOnDeactivate() {
  // With this button we cannot just hide the function. We have to let the user also move the
  // mouse to the popup box without hiding it. Therefore we hide only if user moves the mouse somewhere else.

  function cleanPreviews() {
    var txt = $("#note-findnreplace-find").val();
    var regexToRemove1 = new RegExp("<span class=\"preview-findnr\">" + txt + "</span>" , "g");
    var regexToRemove2 = new RegExp("<u class=\"note-findnreplace\" style=\"border-bottom: 3px solid #fc0; text-decoration: none;\">" + txt + "</u>" , "g");

    $("#editor .note-editable p").each( function(index) {
      var newHtml = $(this).html().replace(regexToRemove1,txt)
      newHtml = newHtml.replace(regexToRemove2,txt)
      $(this).html(newHtml);
    });
  }

  $("#editor .note-btn-group button, .note-editable").mouseenter( function(e) {
    if ( $(e.target).attr("data-original-title") !== "Find 'N Replace" ) {
      if ( $("#findnreplaceToolbar").css("display") != "none" ) {
        $("#findnreplaceToolbar").hide();
        myLog("Toolbar cancellation on findnreplace.");
        cleanPreviews();
      }
    }
  })
  setTimeout( function() {
    if ( mouseOverFindnreplaceToolbar ) {
      $("#findnreplaceToolbar input").focus( function() {
        cleanPreviews();
      });
      $("#findnreplaceToolbar button").mousedown( function() {
        cleanPreviews();
      });
    }
    else {
      cleanPreviews();
      $("#findnreplaceToolbar").hide();
      myLog("Toolbar cancellation on findnreplace.");
    }
    mouseOverFindnreplaceToolbar = false;
    //moveCursor(0,editableDiv);
  },50);

  return false; // Do not let the caller report that preview is cancelled yet. We report it here.
}

function colorOnActivate() {

  // Find out what backColor and frontColor to assign:
  var infoElem = $("#editor div.btn-group.note-color button.note-current-color-button");
  var backColor = infoElem.attr("data-backcolor");
  var foreColor = infoElem.attr("data-forecolor");

  $("#editor .summernotecontainer").summernote("foreColor",foreColor);
  $("#editor .summernotecontainer").summernote("backColor",backColor);
}

function colorOnDeactivate() {

}

function moveCursor(rowIdx,editableElement) {

  //var foo = el.childNodes[rowIdx];
  var r = document.createRange();
  var sel = window.getSelection();
  r.setStart(editableElement.childNodes[rowIdx], 0 ); //range.so-1);
  //r.setEnd(el.childNodes[0], el.childNodes[0].length-1 );
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);

}

function getCursorRowIdx_old(editableDiv,range) {
  var rowIdx = 0;
  while ( rowIdx < editableDiv.childNodes.length ) {
    //console.log("Comparing " + range.sc.nodeValue + " == " + el.childNodes[rowIdx].innerHTML );
    console.log(editableDiv.childNodes[rowIdx]);
    if ( editableDiv.childNodes[rowIdx].innerHTML.toString().includes( range.sc.nodeValue ) ) {
      break;
    }
    rowIdx++;
  }
  if ( rowIdx == editableDiv.childNodes.length ) {     // Safety measure
    rowIdx = 0;
  }
  return rowIdx;
}

function reportAreaToLog(area) {
  myLog("User's selection is from rows " + area.startIdx + "-" + area.endIdx + "(\"" + area.startStr + "\"-\"" + area.endStr + "\")");
}
