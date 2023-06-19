<p align="center">
    <img alt="logo" src="https://github.com/mdgfox/CheatSheetChromeExtension/blob/main/public/icons/readme.png?raw=true" width="250">
</p>

# CheatSheetChromeExtension
Small Google Chrome extension for passing tests. [Link to Chrome Web Store](https://chrome.google.com/webstore/detail/cheat-sheet-extension/enlhdgahjnhlfjfpkclignnnolokpplp?utm_source=ext_app_menu).

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
