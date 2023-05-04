import { useState, useEffect } from 'react'
import "./SFPL_Importer.css"
import DashboardPages from '../../DashboardConstants'
import axios from 'axios'
import * as XLSX from 'xlsx'

const SFPL_Importer = () => {
    
    const [input, setInput] = useState({
        jobNo: "",
        jobdate: "",
        shipper: "",
        invoiceNo: "",
        date: "",
        descriptionOfGoods: "",
        netWeight: "",
        proofOfLoading: "",
        invoiceValue: "",
        unitPrice: "",
        eta: "",
        icdArrivalDate: "",

        freeTime: "",
        shippingLine: "",
        containerNo: "",
        containerSize: "",
        noOfcontainer: "",
        billofEntryNo: "",
        date_new: "",
        assessment_date: "",
        duty_payment_date: "",

        examination_date: "",
        orignalDocs_recordDate: "",
        outOfchargeDate: "",
        DOcollected_date: "",
        Gatepass: "",
        deliveryDate:"",

        emptyReturnDate: "",
        billNo: "",
        remarks: "",


    })


    function handleInput(event){
        // setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        // setInput((e)=>e.target.value)
        const {name,value} = event.target
        
        setInput(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        })
        // const newinput = {...input}
        // newinput[e.target.id] = e.target.value
        // setInput(newinput)
        // console.log(newinput)
    }

    function handleClick(event){
        event.preventDefault();

        window.alert("Submitted")

        const newInput = {
            jobNo: input.jobNo,
            jobdate: input.jobdate,
            shipper: input.shipper,
            invoiceNo: input.invoiceNo,
            date: input.date,
            descriptionOfGoods: input.descriptionOfGoods,
            netWeight: input.netWeight,
            proofOfLoading: input.proofOfLoading,
            invoiceValue: input.invoiceValue,
            unitPrice: input.unitPrice,
            eta: input.eta,
            icdArrivalDate: input.icdArrivalDate,
            freeTime: input.freeTime,
            shippingLine: input.shippingLine,
            containerNo: input.containerNo,
            containerSize: input.containerSize,
            noOfcontainer: input.noOfcontainer,
            billofEntryNo: input.billofEntryNo,
            date_new: input.date_new,
            assessment_date: input.assessment_date,
            duty_payment_date: input.duty_payment_date,
            examination_date: input.examination_date,
            orignalDocs_recordDate: input.orignalDocs_recordDate,
            outOfchargeDate: input.outOfchargeDate,
            DOcollected_date: input.DOcollected_date,
            Gatepass: input.Gatepass,
            deliveryDate: input.deliveryDate,
            emptyReturnDate: input.emptyReturnDate,
            billNo: input.billNo,
            remarks: input.remarks,
           
        }

        console.log(newInput)
    
        axios.post("http://localhost:3001/api", newInput)
    
    window.location.replace('http://localhost:3000/Dashboard');

    }


    function jobSumbit(event){
        event.preventDefault();

        const newInput = {
            jobNo: input.jobNo,
        }

        console.log(newInput)
    
        axios.put("http://localhost:3001/job", newInput)

    }

    function getData(event){
        event.preventDefault();

        fetch("http://localhost:3001/" +  (input.jobNo).toString())
        .then(response=>{
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            if(data){
                setInput({
                    jobNo: data[0].jobNo,
                    jobdate: data[0].jobdate,
                    shipper: data[0].shipper,
                    invoiceNo: data[0].invoiceNo,
                    date: data[0].date,
                    descriptionOfGoods: data[0].descriptionOfGoods,
                    netWeight: data[0].netWeight,
                    proofOfLoading: data[0].proofOfLoading,
                    invoiceValue: data[0].invoiceValue,
                    unitPrice: data[0].unitPrice,
                    eta: data[0].eta,
                    icdArrivalDate: data[0].icdArrivalDate,
                    freeTime: data[0].freeTime,
                    shippingLine: data[0].shippingLine,
                    containerNo: data[0].containerNo,
                    containerSize: data[0].containerSize,
                    noOfcontainer: data[0].noOfcontainer,
                    billofEntryNo: data[0].billofEntryNo,
                    date_new: data[0].date_new,
                    assessment_date: data[0].assessment_date,
                    duty_payment_date: data[0].duty_payment_date,
                    examination_date: data[0].examination_date,
                    orignalDocs_recordDate: data[0].orignalDocs_recordDate,
                    outOfchargeDate: data[0].outOfchargeDate,
                    DOcollected_date: data[0].DOcollected_date,
                    Gatepass: data[0].Gatepass,
                    deliveryDate: data[0].deliveryDate,
                    emptyReturnDate: data[0].emptyReturnDate,
                    billNo: data[0].billNo,
                    remarks: data[0].remarks,
                })

                console.log(data[0])

            }
        }).catch(err => console.log(err));

    }

    function handleFileUpload (event) {
        const file = event.target.files[0];
        convertExcelToJson(file);
      }

      function convertExcelToJson(file) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          axios.post('http://localhost:3001/exceldata', json)
          .then(response => console.log(response))
          .catch(error => console.log(error));
        };
      };

    
    return (
        <form autoComplete='off'>
            <div className=''>
                <h1 className='text-center'>Welcome to EXIM</h1> 
            </div>
            <div className=" mt-5">
                <div className="row">
                    <div className="col-2 Column">  
                        <button  className='submitBtnIM'>Laxcon Steel Limited</button>
                        <button  className='submitBtnIM'>Allied Refactory Products</button>
                        <button  className='submitBtnIM'>Ankit</button>
                        <button  className='submitBtnIM'>CADILA PHARMACEUTICALS</button>
                    </div>
                    <div className="col-2 Column">
                        <button className='submitBtnIM'>Chandresh Cables</button>
                        <button  className='submitBtnIM'>Chandresh Coopper Pvt Ltd</button>
                        <button className='submitBtnIM'>Genius</button>
                        <button  className='submitBtnIM'>GRK Alloys LLP</button>
                    </div>
                    <div className="col-2 Column">
                        <button className='submitBtnIM'>Janki Stainless India Pvt Ltd</button>
                        <button  className='submitBtnIM'>Kanungo</button>
                        <button className='submitBtnIM'>Kayros Energy Private Limited</button>
                        <button className='submitBtnIM'>Kothari</button>
                    </div>
                    <div className="col-2 Column">
                        <button  className='submitBtnIM'>Laxminarayan Trading Co.</button>
                        <button className='submitBtnIM'>Preeti Metal Corporation</button>
                        <button  className='submitBtnIM'>Talin International</button>
                        <button  className='submitBtnIM'>Jagdish Udhyog</button>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default SFPL_Importer