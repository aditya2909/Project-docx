import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export const generateDocument = async (data, product, templateNo) => {
  try {
    // 👉 load correct template dynamically
    const response = await fetch(`/template/${templateNo}.docx`);
    const content = await response.arrayBuffer();

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    };

    const formatIndianDate = (dateString) => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    };

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: {
        start: "<<",
        end: ">>",
      },
    });

    // 🔥 Replace placeholders
    doc.setData({
      projName: data.projName,
      projLocation: data.projLocation,
      clientLocation: data.clientLocation,
      clientName: data.clientName,
      productName: product.prodName, // 👈 important
      orderNo: data.orderNo,
      engineNo: data.engineNo,
      alternatorNo: data.alternatorNo,
      orderDate: formatDate(data.orderDate),
      dateOfSubstantial: formatDate(data.dateOfSubstantial),
      commissionDate: formatDate(data.dateOfSubstantial),
      installationDate: formatIndianDate(data.installationDate),
      warrantyStartDate: formatDate(data.warrantyStartDate),
      warrantyEndDate: formatDate(data.warrantyEndDate),
      otherLocation: data.otherLocation || "Ground floor Open space",
    });

    doc.render();

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(blob, `${data.projName}_${templateNo}.docx`);
  } catch (error) {
    console.error("Doc generation error:", error);
  }
};
