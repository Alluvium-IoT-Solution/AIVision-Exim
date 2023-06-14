import * as yup from "yup";

export const validationSchema = yup.object({
  arrival_date: yup
    .string("Enter arrival date")
    .required("Arrival date is required"),
  eta: yup.string("Enter ETA").required("ETA is required"),
  free_time: yup.string("Enter free time").required("Free time is required"),
});
