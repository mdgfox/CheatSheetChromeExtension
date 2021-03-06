# CheatSheetChromeExtension
Small Google Chrome extension for passing tests

## Publishing guide
* Archive repository
* Create & adjust dev account
* Verify yourself
* Upload zip file
More info <a href="https://developer.chrome.com/docs/webstore/publish/" target="_blank">here</a>

## Database structure
Uploaded file should have next structure: 
~~~tcl
{
    "someDatabaseUniqName: [
        {
            "question": "some trigger phrase",
            "answer": "string to return as result"
        }
    ]
}
~~~
Some tips:
* You can import many files at one time
* New files placed to the end of databases list, so they have higher priority
* When you don't remember what is your database consists of, you can drop it by button
* You can check local storage by next snippet
~~~tcl
chrome.storage.local.get(function(result){console.log(result)})
~~~
