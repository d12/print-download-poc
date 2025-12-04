// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to buttons and invoice
    const printBtn = document.getElementById('printBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Set up current date
    updateInvoiceDate();
    
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
    
    // PDF Download functionality
    downloadBtn.addEventListener('click', async function() {
        try {
            // Show loading state
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Generating PDF...';
            downloadBtn.disabled = true;
            
            // Create PDF using html2canvas and jsPDF
            await generatePDF();
            
            // Restore button state
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
            
            // Restore button state
            downloadBtn.textContent = 'Download PDF';
            downloadBtn.disabled = false;
        }
    });
});

// Function to update invoice date to current date
function updateInvoiceDate() {
    const today = new Date();
    const dueDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
    
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    document.getElementById('invoiceDate').textContent = formatDate(today);
    document.getElementById('dueDate').textContent = formatDate(dueDate);
}

// Function to generate PDF
async function generatePDF() {
    // Get the invoice element
    const invoiceElement = document.getElementById('invoice');
    if (!invoiceElement) {
        throw new Error('Invoice element not found');
    }
    
    // Get the jsPDF constructor
    const { jsPDF } = window.jspdf;
    
    // Temporarily make invoice visible for capture without affecting UI layout
    const originalStyles = {
        position: invoiceElement.style.position,
        top: invoiceElement.style.top,
        left: invoiceElement.style.left,
        visibility: invoiceElement.style.visibility,
        opacity: invoiceElement.style.opacity,
        zIndex: invoiceElement.style.zIndex
    };
    
    // Position off-screen but visible for html2canvas
    invoiceElement.style.position = 'fixed';
    invoiceElement.style.top = '-9999px';
    invoiceElement.style.left = '0';
    invoiceElement.style.visibility = 'visible';
    invoiceElement.style.opacity = '1';
    invoiceElement.style.zIndex = '-1000';
    
    try {
        // Create canvas from the invoice element
        const canvas = await html2canvas(invoiceElement, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            logging: false,
            width: invoiceElement.scrollWidth,
            height: invoiceElement.scrollHeight,
            backgroundColor: '#ffffff'
        });
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        
        // Add the image to PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add new pages if content exceeds one page
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Generate filename with current date
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        const filename = `Invoice-INV-2025-001-${dateStr}.pdf`;
        
        // Save the PDF
        pdf.save(filename);
        
        // Show success message
        showNotification('PDF downloaded successfully!', 'success');
        
    } finally {
        // Restore original invoice styles
        Object.assign(invoiceElement.style, originalStyles);
    }
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
    // Add any pre-print processing here if needed
    console.log('Print dialog opened');
});

window.addEventListener('afterprint', function() {
    // Add any post-print processing here if needed
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

// Add some utility functions for dynamic content updates
function updateInvoiceNumber(newNumber) {
    const invoiceNumberElements = document.querySelectorAll('[data-invoice-number]');
    invoiceNumberElements.forEach(element => {
        element.textContent = newNumber;
    });
}

function updateCustomerInfo(customerData) {
    const customerInfoElement = document.querySelector('.customer-info p');
    if (customerInfoElement && customerData) {
        customerInfoElement.innerHTML = `
            <strong>${customerData.name || 'John Smith'}</strong><br>
            ${customerData.address || '456 Customer Lane'}<br>
            ${customerData.city || 'Customer City'}, ${customerData.state || 'State'} ${customerData.zip || '67890'}<br>
            Phone: ${customerData.phone || '(555) 987-6543'}<br>
            Email: ${customerData.email || 'john.smith@email.com'}
        `;
    }
}

// Export functions for external use
window.InvoiceUtils = {
    updateInvoiceNumber,
    updateCustomerInfo,
    generatePDF,
    showNotification
};
