import * as xlsx from "xlsx";
import { saveAs } from "file-saver";

export const convertToExcel = (rows) => {
  const headers = [
    "JOB NUMBER",
    "DATE",
    "PARTY",
    "INVOICE NUMBER",
    "INVOICE DATE",
    "INVOICE VALUE AND RATE",
    "BILL NUMBER",
    "BILL DATE",
    "COMMODITY",
    "NUMBER OF PACKAGES",
    "NET WEIGHT (MT)",
    "POL",
    "ARRIVAL DATE",
    "FREE TIME",
    "DETENTION FROM",
    "SHIPPING LINE",
    "CONTAINER NUMBER",
    "SIZE",
    "REMARKS",
    "DO VALIDITY",
    "BILL OF ENTRY NUMBER",
    "BILL OF ENTRY DATE",
    "CHECKLIST",
    "CLIENT",
    "STATUS",
    "DETAILED STATUS",
  ]; // Predefined row headers

  const dataWithHeaders = rows.map((item) => [
    item.job_number,
    item.date,
    item.date,
    item.invoice_number,
    item.invoice_date,
    item.invoice_value_and_rate,
    item.bill_number,
    item.bill_date,
    item.commodity,
    item.number_of_packages,
    item.net_wt_mt,
    item.pol,
    item.arrival_date,
    item.free_time,
    item.detention_from,
    item.shipping_line,
    item.container_number,
    item.size,
    item.size,
    item.do_validity,
    item.bill_of_entry_number,
    item.bill_of_entry_date,
    item.checklist,
    item.client,
    item.status,
    item.detailed_status,
  ]);

  const worksheet = xlsx.utils.aoa_to_sheet([headers, ...dataWithHeaders]);

  // Set the header row color to red
  const headerStyle = { fill: { fgColor: { rgb: "FF0000" } } };
  const headerRange = xlsx.utils.decode_range(worksheet["!ref"]);
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cellAddress = xlsx.utils.encode_cell({ r: 0, c: col });
    worksheet[cellAddress].s = headerStyle;
  }

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = xlsx.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(data, `1.xlsx`);
};
