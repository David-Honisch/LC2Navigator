if(/*@cc_on!@*/false || typeof ScriptEngineMajorVersion === "function")
{
    //You are using IE >= 4 (unreliable for IE11!!!)
}
else if(window.chrome)
{
    //You are using Chrome or Chromium
}
else if(window.opera)
{
    //You are using Opera >= 9.2
}
else if('MozBoxSizing' in document.body.style)
{
    //You are using Firefox or Firefox based >= 3.2
}
else if({}.toString.call(window.HTMLElement).indexOf('Constructor')+1)
{
    //You are using Safari >= 3.1
}
else
{
    //Unknown
}