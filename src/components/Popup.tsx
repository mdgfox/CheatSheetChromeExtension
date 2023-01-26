import { Box, Button, Link, Typography } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';
import { Database } from '../types';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReactDOM from 'react-dom';


const mergeNewDatabase = (newJson: Database) => {
    chrome.storage.local.get(['cheatSheetExtensionDatabase'], (result) => {
        const oldDatabase: Database = result.cheatSheetExtensionDatabase;

        const cheatSheetExtensionDatabase = {...oldDatabase, ...newJson};

        chrome.storage.local.set({ cheatSheetExtensionDatabase }, () => {
            console.log('Database updated successfully.');
        });
    });
}

export const Popup: React.FC = () => {

    const handleImportDatabase = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(event && event.target.files) {
            const selectedFiles = Array.from(event.target.files);
    
            selectedFiles.forEach((file) => {
              if (!file) return;
          
              let reader = new FileReader();
          
              reader.onload = (event) => {
                  mergeNewDatabase(JSON.parse(event.target?.result as string));
              };
          
              reader.readAsText(file);
            });
        }
    }, []);

    const handleClearDatabase = useCallback(async () => {
        await chrome.storage.local.clear();

        let url = chrome.runtime.getURL("databases/default.json");
    
        fetch(url).then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
    
                // Examine the text in the response
                response.json().then(function(cheatSheetExtensionDatabase) {
                    chrome.storage.local.set({ cheatSheetExtensionDatabase }, function() {
                        console.log('Default database load successfully.');
                    });
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }, []);

    return (
        <Box 
            sx={{width: '250px', display: 'flex', flexDirection: 'column', alignContent: 'center',
                justifyContent: 'flex-start', alignItems: 'center', gap: '10px'
            }}
        >
            <img src="../icons/128.png" id="logo_image" />
            <Typography sx={{fontSize: '16px', fontWeight: '700'}}>Simple cheat sheet</Typography>
            <Typography sx={{fontSize: '14px',fontWeight: '500',textAlign: 'center',}}>
                You can import files with
                <Link
                    target="_blank"
                    rel="noopener"
                    href='https://github.com/mdgfox/CheatSheetChromeExtension/blob/main/README.md'
                    style={{padding: '0 1px'}}
                >
                    provided
                </Link>
                structure to extend our default database
            </Typography>

            <Button variant="outlined" component="label">
                Upload
                <input 
                    onChange={handleImportDatabase} 
                    type="file" 
                    accept=".json" 
                    multiple 
                    hidden 
                />
                <UploadFileIcon/>
            </Button>
            <Button variant="outlined" onClick={handleClearDatabase} id="clear_button" color='error'>
                <DeleteForeverIcon/>
                Clear Database
            </Button>

            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                <Link
                    target="_blank"
                    rel="noopener"
                    href="https://github.com/mdgfox/CheatSheetChromeExtension"
                >
                    <GitHubIcon sx={{color: 'black'}}/>
                </Link>

                <Link
                    target="_blank"
                    rel="noopener"
                    href="https://www.linkedin.com/in/alex-khmelev/"
                >
                    <LinkedInIcon/>
                </Link>
            </Box>
        </Box>
    );
}

ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    document.getElementById("root")
  );
  