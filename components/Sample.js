import React, { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Sample() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file="test.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}

function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export function Highlight() {
    const [searchText, setSearchText] = useState('');

    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );

    function onChange(event) {
        setSearchText(event.target.value);
    }

    return (
        <>
            <div className="grid grid-cols-2 max-w-2xl max-h-screen">
            <div className='p-10 h-12 w-28'>
                    <label htmlFor="search">Search:</label>
                    <input type="search" id="search" value={searchText} onChange={onChange} />
                </div>
                <div className='m-0'>
                <Document file="test.pdf">
                    <Page
                        pageNumber={1}
                        customTextRenderer={textRenderer}
                    />
                </Document>
                </div>
            </div>
        </>
    );
}