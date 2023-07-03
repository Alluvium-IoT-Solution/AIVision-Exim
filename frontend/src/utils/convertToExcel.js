import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const convertToExcel = async (
  rows,
  importer,
  status,
  detailedStatus
) => {
  const dateOfReport = new Date().toLocaleDateString();

  const headers = [
    "JOB NO",
    "CUSTOM HOUSE",
    "IMPORTER",
    "INVOICE NUMBER",
    "INVOICE DATE",
    "INVOICE VALUE AND UNIT PRICE",
    "DESCRIPTION",
    "CONTAINER COUNT",
    "GROSS WEIGHT",
    "POL",
    "ARRIVAL DATE",
    "FREE TIME",
    "DETENTION FROM",
    "SHIPPING LINE",
    "CONTAINER NUMBER",
    "SIZE",
    "REMARKS",
    "DO VALIDITY",
    "BE NUMBER",
    "BE DATE",
    "CHECKLIST",
    "DETAILED STATUS",
  ];

  // Row headers
  const dataWithHeaders = rows.map((item) => {
    const arrivalDates = item.container_nos
      .map((container) => container.arrival_date)
      .join(",\n");

    const containerNumbers = item.container_nos
      .map((container) => container.container_number)
      .join(",\n");

    const detentionFrom = item.container_nos
      .map((container) => container.detention_from)
      .join(",\n");

    const size = item.container_nos
      .map((container) => container.size)
      .join(",\n");

    // const invoice_value_and_unit_price = `${item.cif_amount} | FC ${item.unit_price}`;
    const invoice_value_and_unit_price = `\u20B9 ${item.cif_amount} | FC ${item.unit_price}`;

    return [
      item.job_no,
      item.custom_house,
      item.importer,
      item.invoice_number,
      item.invoice_date,
      invoice_value_and_unit_price,
      item.description,
      item.container_count,
      item.gross_weight,
      item.loading_port,
      arrivalDates,
      item.free_time,
      detentionFrom,
      item.shipping_line_airline,
      containerNumbers,
      size,
      item.remarks,
      item.do_validity,
      item.be_no,
      item.be_date,
      item.checklist,
      item.detailed_status,
    ];
  });

  // Create a new workbook
  const workbook = new ExcelJS.Workbook();

  // Add a worksheet
  const worksheet = workbook.addWorksheet("Sheet1");

  ///////////////////////////////////////  Title Row  //////////////////////////////////////
  // Merge cells for the title row
  worksheet.mergeCells("A1:V1");

  // Set the title for title row
  const titleRow = worksheet.getRow(1);
  titleRow.getCell(1).value = `${importer}: Status as of ${dateOfReport}`;

  // Apply formatting to the title row
  titleRow.font = { size: 24, color: { argb: "FFFFFFFF" } };
  titleRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472c4" },
  };
  titleRow.alignment = { horizontal: "center", vertical: "middle" };

  // Set text alignment and borders for the title row
  titleRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  titleRow.height = 40;

  /////////////////////////////////////  Header Row  //////////////////////////////////////
  // Add headers row
  worksheet.addRow(headers);

  // Apply formatting to the header row
  const headerRow = worksheet.getRow(2);
  headerRow.font = { size: 14, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472c4" },
  };

  // Set text alignment to center for each cell in the header row
  headerRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Increase the height of the header row
  headerRow.height = 35;

  ///////////////////////////////////////  Data Row  //////////////////////////////////////
  // Add the data rows
  for (const row of dataWithHeaders) {
    const dataRow = worksheet.addRow(row);
    const detailedStatus = row[row.length - 1]; // Get the Detailed Status from the last column

    // Apply background color based on Detailed Status
    if (detailedStatus === "Estimated Time of Arrival") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };
    } else if (detailedStatus === "Custom Clearance Completed") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCFFFF" },
      };
    } else if (detailedStatus === "BE Noted, Arrival Pending") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f4b083" },
      };
    } else if (detailedStatus === "BE Noted, Clearance Pending") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF8EAADB" },
      };
    } else if (detailedStatus === "Gateway IGM Filed") {
      dataRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffff66" },
      };
    }

    // Set text alignment to center for each cell in the data row
    dataRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true, // Enable text wrapping for all cells
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Add line breaks after commas in the containerNumbers cell
      if (cell.value && cell.value.includes(",\n")) {
        cell.value = cell.value.replace(/,\n/g, String.fromCharCode(10)); // Replace ",\n" with line break character
      }
    });

    // Adjust row height based on content
    const rowHeight = calculateRowHeight(dataRow);

    // Set the calculated row height
    dataRow.height = rowHeight;
  }

  // Function to calculate row height based on content
  function calculateRowHeight(row) {
    let maxHeight = 0;

    row.eachCell({ includeEmpty: true }, (cell) => {
      const lines = cell.value ? cell.value.toString().split(/\r\n|\r|\n/) : [];
      const lineCount = lines.length;

      // Set a minimum height for the row
      let cellHeight = 30;

      // Calculate the required height for the cell based on the number of lines
      if (lineCount > 1) {
        const defaultFontSize = 12; // Set the default font size used in the cell
        const lineSpacing = 2; // Set the additional spacing between lines

        const totalLineHeight =
          lineCount * defaultFontSize + (lineCount - 1) * lineSpacing;

        // Add padding to the calculated line height
        const padding = 10;

        cellHeight = totalLineHeight + padding;
      }

      // Update the maximum cell height for the row
      if (cellHeight > maxHeight) {
        maxHeight = cellHeight;
      }
    });

    return maxHeight;
  }

  // Adjust column widths based on content
  worksheet.columns.forEach((column, id) => {
    let maxLength = 0;

    column.eachCell({ includeEmpty: true }, (cell) => {
      maxLength = 10;
    });

    if (headers[id] !== "CONTAINER NUMBER") {
      column.width = maxLength < 25 ? 25 : maxLength;
    }
    if (headers[id] === "JOB NO") {
      column.width = 10;
    }
    if (headers[id] === "CONTAINER NUMBER") {
      column.width = 30;
    }
    if (headers[id] === "INVOICE VALUE AND UNIT PRICE") {
      column.width = 35;
    }
    if (headers[id] === "IMPORTER") {
      column.width = 40;
    }
    if (headers[id] === "SHIPPING LINE") {
      column.width = 40;
    }
    if (headers[id] === "DESCRIPTION") {
      column.width = 50;
    }
    if (headers[id] === "SIZE") {
      column.width = 10;
    }
    if (headers[id] === "FREE TIME") {
      column.width = 12;
    }
  });

  // Apply cell borders for the last column cells
  const lastColumnIndex = headers.length;
  worksheet
    .getColumn(lastColumnIndex)
    .eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  worksheet
    .getColumn(lastColumnIndex - 1)
    .eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

  // Generate Excel file
  const excelBuffer = await workbook.xlsx.writeBuffer();

  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Save the Excel file
  saveAs(
    data,
    detailedStatus === ""
      ? `${importer} - ${status}`
      : `${importer} - ${detailedStatus}`
  );
};
