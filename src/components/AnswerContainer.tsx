import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RegisteredQuestion } from '../types';
import { useDatabase } from '../hooks/useDatabase';
import { findSelectionInDatabase } from '../utils';

export const AnswerContainer: React.FC = () => {
    const [display, setDisplay] = useState<'none' | 'block'>('none');
    const [displayText, setDisplayText] = useState('');

    const {database} = useDatabase();

    const printAnswer = useCallback((question: RegisteredQuestion | undefined, timeout = 3000) => {
        if(question){
            setDisplayText(question.answer);
            setDisplay('block');
            setTimeout(() => {setDisplay('none'); setDisplayText('');}, timeout);
        }
        else {
            setDisplay('none');
            setDisplayText('');
        }
    }, [setDisplayText, setDisplay]);

    const selectionEnd = useCallback(() => {
        const selection = window.getSelection();
        if(selection && selection.type === 'Range') {
            const question = findSelectionInDatabase(database, selection);

            printAnswer(question);
        }
    }, [database, printAnswer]);

    useEffect(() => {
        document.addEventListener('mouseup', selectionEnd);
        return () => {document.removeEventListener('mouseup', selectionEnd); };
    }, [database, selectionEnd]);

    return (
        <div style={{
            display: display,
            position: 'fixed',
            right: '20px',
            left: '20px',
            bottom: '10px',
            zIndex: '100',
            fontSize: '12px',
            borderRadius: '5px',
            backgroundColor: 'white',
            color: 'black',
            padding: '3px',
            }}
        >{displayText}</div>
    );
};

export default AnswerContainer;
