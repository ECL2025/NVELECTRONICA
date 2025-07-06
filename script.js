// Función para emitir el PDF con jsPDF
function emitirPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [148, 210]  // Tamaño A5
    });

    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Título de la boleta
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    const textWidth1 = doc.getTextWidth('NOTA DE VENTA ELECTRONICA');
    const centerX1 = (pageWidth - textWidth1) / 2;
    doc.text('NOTA DE VENTA ELECTRONICA', centerX1, margin);

    // Agregar datos al PDF
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Fecha: ${document.getElementById('fecha').value}`, margin + 5, margin + 20);
    doc.text(`Boleta Nº: ${document.getElementById('nota-venta').value}`, margin + 5, margin + 30);
    doc.text(`DNI: ${document.getElementById('dni').value}`, margin + 5, margin + 40);
    doc.text(`Nombre del Cliente: ${document.getElementById('nombre').value}`, margin + 5, margin + 50);

    // Calcular la posición horizontal para centrar el texto
    const textCenter1 = (pageWidth - doc.getTextWidth(`Empresa: ${document.getElementById('empresa').value}`)) / 2;
    const textCenter2 = (pageWidth - doc.getTextWidth(`Dirección: ${document.getElementById('direccion').value}`)) / 2;

    // Calcular la posición vertical para centrar el texto
    const verticalOffset = (pageHeight - margin) / 2;

    // Agregar texto centrado
    doc.text(`Empresa: ${document.getElementById('empresa').value}`, textCenter1, verticalOffset + 5);
    doc.text(`Dirección: ${document.getElementById('direccion').value}`, textCenter2, verticalOffset + 15);

    // Continuar con el resto de los datos (productos, totales, etc.)
    doc.text(`Producto 1: ${document.getElementById('producto1').value}`, margin + 5, margin + 60);
    doc.text(`Cantidad: ${document.getElementById('cantidad1').value}`, margin + 5, margin + 70);
    doc.text(`Valor Unitario: S/ ${document.getElementById('precio1').value}`, margin + 5, margin + 80);
    doc.text(`Total: S/ ${document.getElementById('total1').value}`, margin + 5, margin + 90);

    // Si existe un segundo producto
    if (document.getElementById('producto2').value) {
        doc.text(`Producto 2: ${document.getElementById('producto2').value}`, margin + 5, margin + 100);
        doc.text(`Cantidad: ${document.getElementById('cantidad2').value}`, margin + 5, margin + 110);
        doc.text(`Valor Unitario: S/ ${document.getElementById('precio2').value}`, margin + 5, margin + 120);
        doc.text(`Total: S/ ${document.getElementById('total2').value}`, margin + 5, margin + 130);
    }

    // Total general
    doc.text(`Total General: S/ ${document.getElementById('totalGeneral').value}`, margin + 5, margin + 140);

    // Expresión en letras
    doc.text(`${document.getElementById('totalLetras').value}`, margin + 5, margin + 150);

    // Guardar el PDF
    doc.save('boleta-de-venta.pdf');

    // Limpiar los campos del formulario después de generar el PDF
    const form = document.getElementById('boleta-form');
    form.reset();
    document.getElementById('fecha').value = new Date().toLocaleDateString(); // Mantener la fecha actual
    document.getElementById('empresa').value = ''; // Limpiar empresa
    document.getElementById('direccion').value = ''; // Limpiar dirección
    document.getElementById('totalGeneral').value = ''; // Limpiar total
    document.getElementById('totalLetras').value = ''; // Limpiar total en letras
}
