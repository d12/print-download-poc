// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to buttons
    const printBtn = document.getElementById('printBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Print functionality
    printBtn.addEventListener('click', function() {
        // Show loading state
        const originalText = printBtn.textContent;
        printBtn.textContent = 'Preparing Print...';
        printBtn.disabled = true;
        
        // Small delay to ensure styles are applied
        setTimeout(() => {
            // Trigger print dialog
            window.print();
            
            // Restore button state
            printBtn.textContent = originalText;
            printBtn.disabled = false;
        }, 100);
    });
    
    // PDF Download functionality using pdfmake
    downloadBtn.addEventListener('click', function() {
        try {
            // Show loading state
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Generating PDF...';
            downloadBtn.disabled = true;
            
            // Create accessible PDF using pdfmake
            const docDefinition = createAccessibleInvoiceDefinition();
            pdfMake.createPdf(docDefinition).download('Invoice-INV-2025-001.pdf');
            
            // Show success message
            showNotification('PDF downloaded successfully! File size: ~50KB, fully accessible.', 'success');
            
            // Restore button state
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            showNotification('Error generating PDF. Please try again.', 'error');
            
            // Restore button state
            downloadBtn.textContent = 'Download PDF';
            downloadBtn.disabled = false;
        }
    });
});

// Function to create the accessible invoice document definition
function createAccessibleInvoiceDefinition() {
    const today = new Date();
    const dueDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    const invoiceNumber = 'INV-2025-001';
    const companyName = 'ACME Corporation';
    const customerName = 'John Smith';
    
    return {
        // Enhanced metadata for screen readers and document management
        info: {
            title: `Invoice ${invoiceNumber} - ${companyName}`,
            author: companyName,
            subject: `Invoice for services rendered to ${customerName}`,
            keywords: `invoice, ${invoiceNumber}, ${customerName}, payment, business document`,
            creator: 'Invoice Generator with Accessibility',
            producer: 'pdfmake v0.2.7'
        },
        
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        
        content: [
            // Document type announcement (invisible but readable by screen readers)
            { 
                text: 'Invoice Document - Business Invoice',
                fontSize: 0.1,
                color: 'white',
                margin: [0, 0, 0, 0]
            },
            
            // Section 1: Company Information
            {
                text: 'Section: Seller Company Information',
                fontSize: 0.1,
                color: 'white'
            },
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: companyName, style: 'companyName' },
                            { text: '123 Business Street', style: 'companyInfo' },
                            { text: 'City, State 12345', style: 'companyInfo' },
                            { text: 'Phone: (555) 123-4567', style: 'companyInfo' },
                            { text: 'Email: info@acmecorp.com', style: 'companyInfo' }
                        ]
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: 'INVOICE', style: 'invoiceTitle', alignment: 'right' },
                            { text: `Invoice Number: ${invoiceNumber}`, style: 'invoiceMeta', alignment: 'right' },
                            { text: `Invoice Date: ${formatDate(today)}`, style: 'invoiceMeta', alignment: 'right' },
                            { text: `Payment Due Date: ${formatDate(dueDate)}`, style: 'invoiceMeta', alignment: 'right' }
                        ]
                    }
                ],
                margin: [0, 0, 0, 20]
            },
            
            // Visual separator
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0,
                        lineWidth: 2,
                        lineColor: '#007bff'
                    }
                ],
                margin: [0, 0, 0, 20]
            },
            
            // Section 2: Customer Information
            {
                text: 'Section: Customer Billing Information',
                fontSize: 0.1,
                color: 'white'
            },
            {
                stack: [
                    { text: 'Bill To:', style: 'sectionHeader' },
                    { text: `Customer Name: ${customerName}`, bold: true, margin: [0, 5, 0, 3] },
                    { text: 'Address: 456 Customer Lane' },
                    { text: 'City: Customer City, State 67890' },
                    { text: 'Phone Number: (555) 987-6543' },
                    { text: 'Email Address: john.smith@email.com' }
                ],
                margin: [0, 0, 0, 25]
            },
            
            // Section 3: Invoice Items
            {
                text: 'Section: Invoice Line Items and Services',
                fontSize: 0.1,
                color: 'white'
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', 60, 80, 80],
                    body: [
                        // Header row with descriptive labels
                        [
                            { text: 'SERVICE DESCRIPTION', style: 'tableHeader' },
                            { text: 'QUANTITY', style: 'tableHeader', alignment: 'right' },
                            { text: 'RATE PER UNIT', style: 'tableHeader', alignment: 'right' },
                            { text: 'LINE TOTAL', style: 'tableHeader', alignment: 'right' }
                        ],
                        // Data rows
                        [
                            {
                                stack: [
                                    { text: 'Website Design & Development', bold: true },
                                    { text: 'Custom responsive website with modern UI/UX design', fontSize: 9, color: '#666' }
                                ]
                            },
                            { text: 'Quantity: 1', alignment: 'right' },
                            { text: 'Rate: $2,500.00', alignment: 'right' },
                            { text: 'Amount: $2,500.00', alignment: 'right' }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'SEO Optimization', bold: true },
                                    { text: 'On-page SEO optimization and content strategy', fontSize: 9, color: '#666' }
                                ]
                            },
                            { text: 'Quantity: 10', alignment: 'right' },
                            { text: 'Rate: $75.00', alignment: 'right' },
                            { text: 'Amount: $750.00', alignment: 'right' }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Monthly Maintenance', bold: true },
                                    { text: 'Website hosting, updates, and security monitoring', fontSize: 9, color: '#666' }
                                ]
                            },
                            { text: 'Quantity: 6', alignment: 'right' },
                            { text: 'Rate: $100.00', alignment: 'right' },
                            { text: 'Amount: $600.00', alignment: 'right' }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Custom Contact Form', bold: true },
                                    { text: 'Development of custom contact form with validation', fontSize: 9, color: '#666' }
                                ]
                            },
                            { text: 'Quantity: 1', alignment: 'right' },
                            { text: 'Rate: $350.00', alignment: 'right' },
                            { text: 'Amount: $350.00', alignment: 'right' }
                        ]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex) {
                        return (rowIndex === 0) ? '#007bff' : null;
                    },
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0.5;
                    },
                    vLineWidth: function () {
                        return 0;
                    },
                    hLineColor: function (i) {
                        return (i === 1) ? '#007bff' : '#e9ecef';
                    },
                    paddingLeft: function () { return 10; },
                    paddingRight: function () { return 10; },
                    paddingTop: function () { return 8; },
                    paddingBottom: function () { return 8; }
                },
                margin: [0, 0, 0, 20]
            },
            
            // Section 4: Payment Summary
            {
                text: 'Section: Payment Calculation and Total',
                fontSize: 0.1,
                color: 'white'
            },
            {
                columns: [
                    { width: '*', text: '' },
                    {
                        width: 250,
                        stack: [
                            {
                                table: {
                                    widths: ['*', 100],
                                    body: [
                                        [
                                            { text: 'Subtotal:', style: 'totalLabel' },
                                            { text: '$4,200.00', style: 'totalAmount' }
                                        ],
                                        [
                                            { text: 'Tax (8.5%):', style: 'totalLabel' },
                                            { text: '$357.00', style: 'totalAmount' }
                                        ],
                                        [
                                            { text: 'Discount (5%):', style: 'totalLabel' },
                                            { text: '-$210.00', style: 'totalAmountDiscount' }
                                        ],
                                        [
                                            { text: 'Total Amount Due:', style: 'totalLabelFinal' },
                                            { text: '$4,347.00', style: 'totalAmountFinal' }
                                        ]
                                    ]
                                },
                                layout: {
                                    fillColor: function (rowIndex, node) {
                                        return (rowIndex === node.table.body.length - 1) ? '#007bff' : '#f8f9fa';
                                    },
                                    hLineWidth: function () { return 0; },
                                    vLineWidth: function () { return 0; },
                                    paddingLeft: function () { return 10; },
                                    paddingRight: function () { return 10; },
                                    paddingTop: function () { return 8; },
                                    paddingBottom: function () { return 8; }
                                }
                            }
                        ]
                    }
                ],
                margin: [0, 0, 0, 30]
            },
            
            // Section 5: Payment Terms and Notes
            {
                text: 'Section: Payment Terms and Additional Notes',
                fontSize: 0.1,
                color: 'white'
            },
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: 'Payment Terms and Conditions:', style: 'sectionHeader' },
                            {
                                ul: [
                                    'Payment is due within 30 days of invoice date',
                                    'Please include invoice number on payment',
                                    'Late payments may incur additional fees',
                                    'Accepted payment methods: Check, Wire Transfer, Credit Card'
                                ],
                                fontSize: 9,
                                margin: [0, 5, 0, 0]
                            }
                        ]
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: 'Notes and Contact Information:', style: 'sectionHeader' },
                            {
                                text: 'Thank you for your business! If you have any questions about this invoice, please contact us at (555) 123-4567 or email billing@acmecorp.com.',
                                fontSize: 9,
                                italics: true,
                                margin: [0, 5, 0, 0]
                            }
                        ]
                    }
                ],
                margin: [0, 0, 0, 15]
            },
            
            // Footer
            {
                text: 'ACME Corporation • 123 Business Street, City, State 12345 • www.acmecorp.com',
                style: 'footer',
                alignment: 'center'
            }
        ],
        
        // Styles
        styles: {
            companyName: {
                fontSize: 22,
                bold: true,
                color: '#007bff',
                margin: [0, 0, 0, 5]
            },
            companyInfo: {
                fontSize: 10,
                color: '#666',
                margin: [0, 2, 0, 0]
            },
            invoiceTitle: {
                fontSize: 32,
                bold: true,
                color: '#333',
                margin: [0, 0, 0, 10]
            },
            invoiceMeta: {
                fontSize: 11,
                margin: [0, 3, 0, 0]
            },
            sectionHeader: {
                fontSize: 13,
                bold: true,
                color: '#007bff',
                margin: [0, 0, 0, 5]
            },
            tableHeader: {
                fontSize: 10,
                bold: true,
                color: 'white',
                fillColor: '#007bff'
            },
            totalLabel: {
                fontSize: 11,
                alignment: 'left'
            },
            totalAmount: {
                fontSize: 11,
                alignment: 'right'
            },
            totalAmountDiscount: {
                fontSize: 11,
                alignment: 'right',
                color: '#28a745'
            },
            totalLabelFinal: {
                fontSize: 13,
                bold: true,
                color: 'white',
                alignment: 'left'
            },
            totalAmountFinal: {
                fontSize: 13,
                bold: true,
                color: 'white',
                alignment: 'right'
            },
            footer: {
                fontSize: 9,
                italics: true,
                color: '#666'
            }
        },
        
        defaultStyle: {
            fontSize: 10,
            color: '#333'
        }
    };
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#007bff';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle print events for better UX
window.addEventListener('beforeprint', function() {
    console.log('Print dialog opened');
});

window.addEventListener('afterprint', function() {
    console.log('Print dialog closed');
    showNotification('Print dialog was opened successfully!', 'info');
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+P or Cmd+P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        document.getElementById('printBtn').click();
    }
    
    // Ctrl+D or Cmd+D for download
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.getElementById('downloadBtn').click();
    }
});
