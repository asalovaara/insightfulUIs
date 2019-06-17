$def with (form, text)


<!doctype html>

<html>

    <head>
        <meta charset="UTF-8">

        <title>Research instrument</title>

        <script src="static/dist/jquery-3.3.1.min.js"></script>

        <!-- Following links are from http://jsfiddle.net/ypweuw1L/99/ These work well with LTR-RTL conversion. -->
        <!-- link href= "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
        <link href= "http://cdnjs.cloudflare.com/ajax/libs/summernote/0.6.4/summernote.css" rel="stylesheet">
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.6.4/summernote.min.js"></script -->

        <!-- link href= "http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"  rel="stylesheet" -->

        <link rel="apple-touch-icon" href="/apple-touch-icon-precomposed.png"/>

        <!-- These are from SummerNote Getting Started page. These work with well findnreplace plugin -->
        <link href="static/dist/bootstrap.css" rel="stylesheet">
        <!-- link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet" -->
        <script src="static/dist/bootstrap.js"></script>
        <!-- script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script-->
        <link href="static/dist/summernote.css" rel="stylesheet">
        <!-- link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css" rel="stylesheet" -->
        <script src="static/dist/summernote.js"></script>
        <!-- script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script -->



        <script src="static/dist/summernote-text-findnreplace.js"></script>

        <script src="static/instrument.js"></script>
        <link href="static/instrument.css" rel="stylesheet">
        <script src="static/prompts.js"></script>
        <script src="static/buttons.js"></script>


        <link rel="stylesheet" type="text/css" href="static/tutorial.css" />

        <!-- script type="text/javascript" src="/static/jquery.js"></script -->

        <!-- script type="text/javascript">
                                jQuery(document).ready(function() {
                                jQuery(".button").click(function() {
                                        var input_string = $$("input#textfield").val();
                                        jQuery.ajax({
                                                type: "POST",
                                                data: {textfield : input_string},
                                                success: function(data) {
                                                jQuery('#foo').html(data).hide().fadeIn(1500);
                                                },
                                                });
                                        return false;
                                        });
                                });

                        </script -->
    </head>

    <body>
        <!-- form class="form" method="post">
        $:form.render()
        <input class="button" type="submit" value="send"/>
      </form -->

        <!-- span id="foo">$text</span -->

        <div>
        <ul id="progressbar">
        </ul>
        <div id="warning-noserver" style="display:none;">Server not running => Participant's actions are not logged.</div>
      </div>

          <div id="masterbox" style="display:none;">
            <h1>Master switches <button id="showmaster"></button></h1>
            <div id="master-wrapper">
              <div id="prompt-masterswitch-wrapper">
                <p>(These will be removed before the actual experiment)</p>
                <p id="prompt-selector">Select prompt:</p>
                <div id="prompt-masterswitch"></div>
              </div>
              <div id="condition-masterswitch-wrapper">
                <p id="condition-selector">Select condition: <span class="condition-help" style="display:none;">Now select the condition</span></p>
                <div id="condition-masterswitch">
                  <input type="radio" name="condition" value="baseline" id="baseline" disabled> <label for="baseline"><span class="condition-label disabled"> Baseline</span></label> &nbsp;&nbsp;
                  <input type="radio" name="condition" value="video" id="video" disabled> <label for="video"><span class="condition-label disabled"> Video preview</span></label> &nbsp;&nbsp;
                  <input type="radio" name="condition" value="interactive" id="interactive" disabled> <label for="interactive"><span class="condition-label disabled"> Interactive preview</span></label>
                </div>
              </div>
            </div>
          </div>

        <div id="wrapper-without-log"">
          <div id="editor-wrapper">
            <h1 id="tasklabel">&nbsp;</h1>
            <div id="instruction"></div>
            <button id="show-text">OK, got it. Please show the text.</button>
            <div id="editor"></div>
          </div>

          <div id="user-answer-wrapper">
            <span id="answer-prompt"></span>
            <input id="user-answer" type="text" />
            <button id="done-btn"></button><br/>
            <span id="answer-error-msg"></span>
          </div>
        </div>

        <div id="log-wrapper" style="display:none;">
          <h1 style="margin-top:1em;"">Data sent to the server <button id="showlog"></button></h1>
          <div id="log">
          </div>
        </div>
    </body>

</html>
