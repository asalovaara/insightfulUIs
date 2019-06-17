import web
import os
import time
import sys

def make_text(string):
    return string

timeStr = time.strftime("%Y-%m-%dT%H-%M-%S",time.localtime()) # 2018-03-23T14:30:29
logFileName = "log-" + timeStr + ".txt"

# logFile = open("test.txt","w",0)
logPath = ""
if sys.platform == "win32":
    logPath = ".\\logs\\"
else:
    logPath = "./logs/"
    
logFile = open(logPath + logFileName,"w",0) # 0 = no buffer
logFile.write("Log started at " + timeStr + "\n\n")

urls = ('/', 'instrument_temp', '/favicon.ico', 'icon')
render = web.template.render('./')

app = web.application(urls, globals())

my_form = web.form.Form(web.form.Textbox('', class_='textfield', id='textfield'), )

# From https://stackoverflow.com/questions/11635381/web-py-development-server-favicon-ico-404-not-found
# Process favicon.ico requests
class icon:
    def GET(self): raise web.seeother("/static/favicon.ico")

class instrument_temp:
    def GET(self):
        form = my_form()
        return render.instrument_temp(form,"") #, "Your text goes here.")

    def POST(self):
        form = my_form()
        form.validates()
        s = form.value['textfield']

        logFile.write(s + "\n")
        return make_text(s)

if __name__ == '__main__':

    # Prepend the .html file with the python launch scripts:

    # This creates an empty file
    # 1. delete the file if it exists
    # 2. create empty file
    # 3. add the python prefix to empty file
    # 4. add the html file to the file

    script = ""
    if sys.platform == "win32":
        script = "@echo off & " +\
            "del instrument_temp.py & " +\
            "del instrument_temp2.py & " +\
            "type nul > instrument_temp.py & " +\
            "type instrument_prefix.py > instrument_temp2.py & " +\
            "type instrument_temp2.py instrument.html > instrument_temp.py"
    else:
        script = "rm -f instrument_temp.py ; "+ \
            "touch instrument_temp.py ; "+ \
            "cat instrument_prefix.py >> instrument_temp.py ; "+ \
            "cat instrument.html >> instrument_temp.py"
    os.system(script)

    # Run the server that displays the stuff based on the above-created instrument_temp.py

    print "\n********\nUse this address in Google Chrome:\n\nlocalhost:8080\n"
    print "When you are ready:\n1) press Ctrl-C in this window\n2) wait for a few seconds"
    print "3) answer \"y\"\n4) Store the newest log file in the \"logs\" directory in a safe place.\n\n**********\n"

    app.run()
