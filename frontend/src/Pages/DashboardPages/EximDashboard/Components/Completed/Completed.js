import { useState, useEffect } from 'react'
import "./Completed.css"
import axios from 'axios'
import * as XLSX from 'xlsx'

const Completed = () => {


    const [input, setInput] = useState({
        party: "",
        invoiceNo: "",
        invoiceDate: "",
        invoiceVandR: "",
        invoiceR: "",
        billofLN: "",
        billofLD: "",
        commodity: "",
        numberOfpkgs: "",
        netWeight1: "",
        netWeight2: "",
        portOfLoading: "",

        arrival_date: "",
        freeTime: "",
        detention_date: "",
        shippingLine: "",
        containerNo: "",
        containerSize: "",
        remarks: "",
   

        DO_validity: "",
        billOfEN: "",
        billOfED: "",
        checklist: "",
    
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

    // function handleClick(event){
    //     event.preventDefault();

    //     window.alert("Submitted")

    //     const newInput = {
    //         jobNo: input.jobNo,
    //         jobdate: input.jobdate,
    //         shipper: input.shipper,
    //         invoiceNo: input.invoiceNo,
    //         date: input.date,
    //         descriptionOfGoods: input.descriptionOfGoods,
    //         netWeight: input.netWeight,
    //         proofOfLoading: input.proofOfLoading,
    //         invoiceValue: input.invoiceValue,
    //         unitPrice: input.unitPrice,
    //         eta: input.eta,
    //         icdArrivalDate: input.icdArrivalDate,
    //         freeTime: input.freeTime,
    //         shippingLine: input.shippingLine,
    //         containerNo: input.containerNo,
    //         containerSize: input.containerSize,
    //         noOfcontainer: input.noOfcontainer,
    //         billofEntryNo: input.billofEntryNo,
    //         date_new: input.date_new,
    //         assessment_date: input.assessment_date,
    //         duty_payment_date: input.duty_payment_date,
    //         examination_date: input.examination_date,
    //         orignalDocs_recordDate: input.orignalDocs_recordDate,
    //         outOfchargeDate: input.outOfchargeDate,
    //         DOcollected_date: input.DOcollected_date,
    //         Gatepass: input.Gatepass,
    //         deliveryDate: input.deliveryDate,
    //         emptyReturnDate: input.emptyReturnDate,
    //         billNo: input.billNo,
    //         remarks: input.remarks,
           
    //     }

    //     console.log(newInput)
    
    //     axios.post("http://localhost:3001/api", newInput)
    
    // window.location.replace('http://localhost:3000/Dashboard');

    // }


    // function jobSumbit(event){
    //     event.preventDefault();

    //     const newInput = {
    //         jobNo: input.jobNo,
    //     }

    //     console.log(newInput)
    
    //     axios.put("http://localhost:3001/job", newInput)

    // }

    // function getData(event){
    //     event.preventDefault();

    //     fetch("http://localhost:3001/" +  (input.jobNo).toString())
    //     .then(response=>{
    //         if(response.ok){
    //             return response.json();
    //         }
    //     }).then(data => {
    //         if(data){
    //             setInput({
    //                 jobNo: data[0].jobNo,
    //                 jobdate: data[0].jobdate,
    //                 shipper: data[0].shipper,
    //                 invoiceNo: data[0].invoiceNo,
    //                 date: data[0].date,
    //                 descriptionOfGoods: data[0].descriptionOfGoods,
    //                 netWeight: data[0].netWeight,
    //                 proofOfLoading: data[0].proofOfLoading,
    //                 invoiceValue: data[0].invoiceValue,
    //                 unitPrice: data[0].unitPrice,
    //                 eta: data[0].eta,
    //                 icdArrivalDate: data[0].icdArrivalDate,
    //                 freeTime: data[0].freeTime,
    //                 shippingLine: data[0].shippingLine,
    //                 containerNo: data[0].containerNo,
    //                 containerSize: data[0].containerSize,
    //                 noOfcontainer: data[0].noOfcontainer,
    //                 billofEntryNo: data[0].billofEntryNo,
    //                 date_new: data[0].date_new,
    //                 assessment_date: data[0].assessment_date,
    //                 duty_payment_date: data[0].duty_payment_date,
    //                 examination_date: data[0].examination_date,
    //                 orignalDocs_recordDate: data[0].orignalDocs_recordDate,
    //                 outOfchargeDate: data[0].outOfchargeDate,
    //                 DOcollected_date: data[0].DOcollected_date,
    //                 Gatepass: data[0].Gatepass,
    //                 deliveryDate: data[0].deliveryDate,
    //                 emptyReturnDate: data[0].emptyReturnDate,
    //                 billNo: data[0].billNo,
    //                 remarks: data[0].remarks,
    //             })

    //             console.log(data[0])

    //         }
    //     }).catch(err => console.log(err));

    // }

    // function handleFileUpload (event) {
    //     const file = event.target.files[0];
    //     convertExcelToJson(file);
    //   }

    //   function convertExcelToJson (file) {
    //     const reader = new FileReader();
    //     reader.readAsBinaryString(file);
    //     reader.onload = (event) => {
    //       const data = event.target.result;
    //       const workbook = XLSX.read(data, { type: 'binary' });
    //       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //       const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    //       axios.post('http://localhost:3001/exceldata', json)
    //       .then(response => console.log(response))
    //       .catch(error => console.log(error));
    //     };
    //   };

    

  
    return (
        <form autoComplete='off' >
            <div className=''>
                <h1 className='text-center'>Welcome to EXIM</h1>
                <input className='UploadSheetBtn' type="file" />
            </div>
            <div className=" mt-5">
                <div className="row">
                    <div className="col-2 Column">

                        <input name="party" className='Input' onChange={handleInput} value={input.party} type="text" placeholder='Party'/>
                        <input name="invoiceNo" className='Input' onChange={handleInput} value={input.invoiceNo} type="text" placeholder='Invoice No'/>
                        <input name="invoiceDate"  className='Input' onChange={handleInput} value={input.invoiceDate} type="date" placeholder='text' /><label className="Label">Invoice Date</label>
                        <input name="invoiceVandR" className='Input' onChange={handleInput} value={input.invoiceVandR} type="text" placeholder='Invoice Value & Rate' />
                        <input name="invoiceR" className='Input' onChange={handleInput} value={input.invoiceR} type="text" placeholder='Invoice Rate in Rupees'  />
                        <input name="billofLN" className='Input' onChange={handleInput} value={input.billofLN} type="text" placeholder='Bill of Lading No.'  />
                        <input name="billofLD" className='Input' onChange={handleInput} value={input.billofLD} type="date" placeholder='text' /><label className="Label">Bill of Lading Date</label>
                        <input name="commodity" className='Input' onChange={handleInput} value={input.commodity} type="text" placeholder='Commodity'  />
                        <input name="numberOfpkgs" className='Input' onChange={handleInput} value={input.numberOfpkgs} type="text" placeholder='No. of PKGS'  />
                        <input name="netWeight1" className='Input' onChange={handleInput} value={input.netWeight1} type="text" placeholder='NET Weight (MT)'  />
                        <input name="netWeight2" className='Input' onChange={handleInput} value={input.netWeight2} type="text" placeholder='NET Weight (KG)'/>
                        <input name="portOfLoading" className='Input' onChange={handleInput} value={input.portOfLoading} type="text" placeholder='Port Of Loading'  />

                    </div>
                    <div className="col-2 Column">
                        <input name="arrival_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.arrival_date} /><label className="Label">Arrival Date</label>
                        <input name="freeTime" className='Input' type="text" placeholder='' onChange={handleInput} value={input.freeTime} /><label className="Label">Free Time</label>
                        <input name="detention_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.detention_date} /><label className="Label">Detention From Date</label>
                        <input name="shippingLine" className='Input' type="text" placeholder='Shipping Line' onChange={handleInput} value={input.shippingLine}/>
                        <input name="containerNo" className='Input' type="text" placeholder='Container No' onChange={handleInput} value={input.containerNo} />
                        <input name="containerSize" className='Input' type="text" placeholder='Container Size' onChange={handleInput} value={input.containerSize} />
                        <textarea name="remarks" className='Input' cols="30" rows="10" onChange={handleInput} value={input.remarks}></textarea>
                        <label className="Label">Remarks</label>
                    </div>

                    <div className="col-2 Column">
                        <input name="DO_validity" className='Input' type="text" placeholder='DO Validity' onChange={handleInput} value={input.DO_validity}/>
                        <input name="billOfEN" className='Input' type="text" placeholder='Bill of Entry of No.' onChange={handleInput} value={input.billOfEN} />
                        <input name="billOfED" className='Input' type="text" placeholder='Bill of Entry Date' onChange={handleInput} value={input.billOfED} />
                        <input name="checklist" className='Input' type="text" placeholder='Checklist' onChange={handleInput} value={input.checklist} />
                     
                    </div>

                    
            
                </div>
            </div>
            <div className='Buttons'>
                {/* <button onClick={handleClick} className='submitBtn'>Submit</button> */}
                <button  className='submitBtn'>Submit</button>
                <button className='clearBtn'>Clear</button>
                <i className="fa-sharp fa-solid fa-turn-down-left"></i>
            </div>

        </form>

    )
}

export default Completed