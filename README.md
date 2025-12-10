# Invoice Generator - Proof of Concept

A professional HTML/CSS/JavaScript invoice generator with print and accessible PDF download functionality.

## 🌐 Live Demo

**View the live demo:** [https://d12.github.io/print-download-poc/](https://d12.github.io/print-download-poc/)

## ✨ Features

- **Professional Invoice Design**: Clean, modern invoice layout with company branding
- **Print Functionality**: Uses CSS `@media print` queries for perfect printing
- **Accessible PDF Download**: Generates text-based, screen-reader-friendly PDFs
- **Small File Sizes**: ~50KB PDFs (vs 20MB with image-based approaches)
- **Fully Searchable**: Text in PDFs is selectable, copyable, and searchable
- **Screen Reader Compatible**: WCAG 2.1 Level A compliant
- **Responsive Design**: Works on desktop and mobile devices
- **No Server Required**: Everything runs client-side in the browser

## Files

- `index.html` - Main HTML structure with invoice UI
- `styles.css` - Professional styling with print media queries
- `script.js` - JavaScript functionality for print and accessible PDF generation

## Dependencies

- **pdfmake**: For generating accessible, text-based PDFs (loaded from CDN)
- **vfs_fonts**: Font data for pdfmake (loaded from CDN)

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
- Text-based PDF generation (not image-based)
- Enhanced accessibility with screen reader support
- Rich document metadata
- Loading states and user feedback
- Error handling for PDF generation
- Keyboard shortcut support (Cmd/Ctrl+P for print, Cmd/Ctrl+D for download)

## Why pdfmake?

This project uses **pdfmake** instead of html2canvas for several important reasons:

| Feature | html2canvas | pdfmake |
|---------|-------------|---------|
| **File Size** | ~20MB | ~50KB (400x smaller!) |
| **Accessibility** | ❌ Not accessible | ✅ Screen reader compatible |
| **Text Selection** | ❌ Not selectable | ✅ Fully selectable |
| **Searchable** | ❌ No | ✅ Yes |
| **Quality** | Pixelated when zoomed | ✅ Crisp at any zoom |
| **WCAG Compliance** | ❌ Fails | ✅ Level A |

See `ALTERNATIVES.md` for detailed comparison of PDF generation approaches.

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions:

1. **Automatic Deployment**: Any push to the `main` branch triggers a deployment
2. **GitHub Actions Workflow**: Located in `.github/workflows/deploy.yml`
3. **Live URL**: [https://d12.github.io/print-download-poc/](https://d12.github.io/print-download-poc/)

### Manual Deployment

To manually trigger a deployment:
1. Go to the Actions tab in your GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
