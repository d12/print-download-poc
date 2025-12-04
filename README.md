# Invoice Generator - Proof of Concept

A professional HTML/CSS/JavaScript invoice generator with print and PDF download functionality.

## Features

- **Professional Invoice Design**: Clean, modern invoice layout with company branding
- **Print Functionality**: Opens the browser's print dialog for direct printing
- **PDF Download**: Generates and downloads invoices as PDF files
- **Responsive Design**: Works on desktop and mobile devices
- **Print-Optimized**: Special CSS media queries for clean printing
- **Dynamic Content**: Easy to customize invoice data

## Files

- `index.html` - Main HTML structure with invoice layout
- `styles.css` - Professional styling with print media queries
- `script.js` - JavaScript functionality for print and PDF generation

## Dependencies

- **jsPDF**: For PDF generation (loaded from CDN)
- **html2canvas**: For capturing HTML content as images (loaded from CDN)

## Usage

1. Open `index.html` in your web browser
2. Click "Print Invoice" to open the print dialog
3. Click "Download PDF" to generate and download a PDF version

## Keyboard Shortcuts

- `Ctrl+P` (or `Cmd+P` on Mac): Print invoice
- `Ctrl+D` (or `Cmd+D` on Mac): Download PDF

## Customization

The invoice can be easily customized by:
- Editing company information in the HTML
- Modifying invoice items in the table
- Updating customer details
- Changing colors and styling in the CSS
- Using JavaScript utility functions for dynamic updates

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Print functionality works in all major browsers
- PDF generation works in browsers that support html2canvas and jsPDF

## Technical Features

- Clean, semantic HTML structure
- CSS Grid and Flexbox for responsive layout
- Print-specific CSS media queries
- High-quality PDF generation with proper scaling
- Loading states and user feedback
- Error handling for PDF generation
- Keyboard shortcut support
