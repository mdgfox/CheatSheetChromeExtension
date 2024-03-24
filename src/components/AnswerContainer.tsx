import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { RegisteredQuestion } from "../types";
import { useDatabase } from "../hooks/useDatabase";
import { findSelectionInDatabase } from "../utils";
import {Box} from "@mui/material";

export default function AnswerContainer() {
    const [display, setDisplay] = useState<"none" | "block">("none");
    const [displayText, setDisplayText] = useState("");

    const {database} = useDatabase();

    const printAnswer = useCallback((question: RegisteredQuestion | undefined, timeout = 5500) => {
        if(question){
            setDisplayText(question.answer);
            setDisplay("block");
            setTimeout(() => {setDisplay("none"); setDisplayText("");}, timeout);
        }
        else {
            setDisplay("none");
            setDisplayText("");
        }
    }, [setDisplayText, setDisplay]);

    const selectionEnd = useCallback(() => {
        const selection = window.getSelection();
        if(selection && selection.type === "Range") {
            const question = findSelectionInDatabase(database, selection);

            printAnswer(question);
        }
    }, [database, printAnswer]);

    useEffect(() => {
        document.addEventListener("mouseup", selectionEnd);
        return () => {document.removeEventListener("mouseup", selectionEnd); };
    }, [database, selectionEnd]);

    return (
        <Box
            display={display}
            sx={{
                position:"fixed",
                right:"20px",
                left:"20px",
                bottom:"10px",
                zIndex:"100",
                fontSize: "12px",
                borderRadius: "5px",
                padding: "3px",
                backgroundColor: "#dfe3ee",
                color: "#363753",
            }}
        >
            {displayText}
        </Box>
    );
}
