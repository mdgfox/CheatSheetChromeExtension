import { IconButton, LinearProgress, List, ListItem, ListItemText, ListSubheader, Tooltip } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { ChangeEvent, useCallback, useMemo } from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { omit } from "lodash";
import { useDatabase } from "../hooks/useDatabase";

const reader = new FileReader();

export const DatabaseList: React.FC = () => {
    const {database, setDatabase} = useDatabase();

    const handleImport = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(event && event.target.files) {
            const selectedFiles = Array.from(event.target.files);

            selectedFiles.forEach((file) => {
              if (!file) return;

              reader.onload = (event) => {
                const uploadedDatabase = JSON.parse(event.target?.result as string);
                const newDatabase = {...database, ...uploadedDatabase};
                setDatabase(newDatabase);
              };

              reader.readAsText(file);
            });
        }
    }, [database, setDatabase]);

    const subheader = (
        <ListSubheader sx={{display: 'flex', justifyContent: 'center', paddingRight: '0px'}}>
            Existing Databases
            <Tooltip title="Upload Databases">
            <IconButton color="secondary" aria-label="upload picture" component="label">
                <input
                    onChange={handleImport}
                    type="file"
                    accept=".json"
                    multiple
                    hidden
                />
                <UploadFileIcon/>
            </IconButton>
        </Tooltip>
        </ListSubheader>
    );

    const handleDeleteClick = useCallback((key: string) => setDatabase(omit(database, [key])), [database, setDatabase]);

    const listItems = useMemo(() => {
        const keys = Object.keys(database);
        if(!keys.length) {
            return <LinearProgress />;
        }

        return keys.map((key) => (
            <ListItem
                    key={key}
                    secondaryAction={
                        <IconButton edge="end" onClick={() => handleDeleteClick(key)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    }
                >
                    <ListItemText primary={key} />
            </ListItem>
        ));
    }, [database, handleDeleteClick]);

    return (
        <List dense
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={subheader}
        >
            {listItems}
        </List>
    );
};
