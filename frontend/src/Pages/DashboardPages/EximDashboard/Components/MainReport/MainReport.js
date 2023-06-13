import { useState, useEffect } from 'react'
import "./MainReport.css"
import axios from 'axios'
import * as XLSX from 'xlsx'

const MainReport = () => {


    const [input, setInput] = useState({
        jobNo: "",
        custom_house: "",
        job_date: "",
        importer: "",
        supplier_exporter: "",
        invoice_no: "",
        invoice_date: "",
        billofLN: "",
        billofLD: "",
        description: "",
        billOfEN: "",
        billOfED: "",
        typeofBE: "",

        numberOfpkgs: "",
        unit1: "",
        gross_weight: "",
        unit2: "",
        gateway_igm:"",
        gateway_igmdate: "",
        igm_number: "",
        igm_date: "",
        portOfLoading: "",
        origin_country: "",
    
        portofReporting: "",
        shippingline: "",
        container_no: "",
        container_count: "",
        no_of_container: "",
        toi: "",
        unit_price: "",
        cif_amount: "",
        assbl_value: "",
        total_duty: "",
        out_of_charge: "",

        consignment_type: "",
        bill_no: "",
        bill_date: "",
        cth_no: "",
    
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
            custom_house: input.custom_house,
            job_date: input.job_date,
            importer: input.importer,
            supplier_exporter: input.supplier_exporter,
            invoice_no: input.invoice_no,
            invoice_date: input.invoice_date,
            billofLN: input.billofLN,
            billofLD: input.billofLD,
            description: input.description,
            billOfEN: input.billOfEN,
            billOfED: input.billOfED,
            typeofBE: input.typeofBE,
            numberOfpkgs: input.numberOfpkgs,
            unit1: input.unit1,
            gross_weight: input.gross_weight,
            unit2: input.unit2,
            gateway_igm: input.gateway_igm,
            gateway_igmdate: input.gateway_igmdate,
            igm_number: input.igm_number,
            igm_date: input.igm_date,
            portOfLoading: input.portOfLoading,
            origin_country: input.origin_country,
            portofReporting: input.portofReporting,
            shippingline: input.shippingline,
            container_no: input.container_no,
            container_count: input.container_count,
            no_of_container: input.no_of_container,
            toi: input.toi,
            unit_price: input.unit_price,
            cif_amount: input.cif_amount,
            assbl_value: input.assbl_value,
            total_duty: input.total_duty,
            out_of_charge: input.out_of_charge,
            consignment_type: input.consignment_type,
            bill_no: input.bill_no,
            bill_date: input.bill_date,
            cth_no: input.cth_no

        }

        console.log(newInput)
    
        axios.post("http://localhost:3001/mainReportAPI", newInput)
    
    

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
                <h1 className='text-center'>Main Report</h1>
                <input className='UploadSheetBtn' type="file"/>
                
            </div>
            <div className=" mt-5">
                <div className="row">
                    <div className="col-2 Column">

                        <input name="jobNo" className='Input' onChange={handleInput} value={input.jobNo} type="text" placeholder='Job No'/>
                        <button onClick={jobSumbit} className='submitBtn'>SEARCH</button>
                        <button onClick={getData} className='submitBtn'>GET DATA</button>
                        <input name="custom_house"  className='Input' onChange={handleInput} value={input.custom_house} type="text" placeholder='' /><label className="Label">Custom House</label>
                        <input name="job_date" className='Input' onChange={handleInput} value={input.job_date} type="date" placeholder='text' /><label className="Label">Job Date</label>
                        <input name="importer" className='Input' type="text" placeholder='' onChange={handleInput} value={input.importer} /><label className="Label">Importer</label>
                        <input name="supplier_exporter" className='Input' onChange={handleInput} value={input.supplier_exporter} type="text" placeholder='Supplier/Exporter' />
                        <input name="invoiceNo" className='Input' onChange={handleInput} value={input.invoiceNo} type="text" placeholder='Invoice No'/>
                        <input name="invoiceDate"  className='Input' onChange={handleInput} value={input.invoiceDate} type="date" placeholder='text' /><label className="Label">Invoice Date</label>
                        <input name="billofLN" className='Input' type="text" placeholder='' onChange={handleInput} value={input.billofLN} /><label className="Label">Bill of Lading No.</label>
                       
                    </div>
                    <div className="col-2 Column">
                        <input name="billofLD" className='Input' onChange={handleInput} value={input.billofLD} type="date" placeholder='text' /><label className="Label">Bill of Lading Date</label>
                        <input name="description" className='Input' onChange={handleInput} value={input.description} type="text" placeholder='Description of Goods'  />
                        <input name="billOfEN" className='Input' type="text" placeholder='Bill of Entry of No.' onChange={handleInput} value={input.billOfEN} />
                        <input name="billOfED" className='Input' type="text" placeholder='Bill of Entry Date' onChange={handleInput} value={input.billOfED} />
                        <input name="typeofBE" className='Input' onChange={handleInput} value={input.typeofBE} type="text" placeholder='Type of B/E'  />
                        <input name="numberOfpkgs" className='Input' type="text" placeholder='' onChange={handleInput} value={input.numberOfpkgs} /><label className="Label">No. of PKGS</label>
                        <input name="unit1" className='Input' type="text" placeholder='' onChange={handleInput} value={input.unit1} /><label className="Label">Unit</label>
                        <input name="gross_weight" className='Input' type="text" placeholder='' onChange={handleInput} value={input.gross_weight} /><label className="Label">Gross Weight</label>
                        <input name="unit2" className='Input' type="text" placeholder='' onChange={handleInput} value={input.unit2} /><label className="Label">Unit</label>
                        <input name="gateway_igm" className='Input' type="text" placeholder='' onChange={handleInput} value={input.gateway_igm} /><label className="Label">Gateway IGM</label>
                       
                        
                    </div>

                    <div className="col-2 Column">

                        <input name="gateway_igmdate" className='Input' type="date" placeholder='' onChange={handleInput} value={input.gateway_igmdate} /><label className="Label">Gateway IGM Date</label>
                        <input name="igm_number" className='Input' type="text" placeholder='' onChange={handleInput} value={input.igm_number} /><label className="Label">IGM No.</label>
                        <input name="igm_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.igm_date} /><label className="Label">IGM Date</label>
                        <input name="portOfLoading" className='Input' onChange={handleInput} value={input.portOfLoading} type="text" placeholder='Port Of Loading'  />
                        <input name="origin_country" className='Input' onChange={handleInput} value={input.origin_country} type="text" placeholder='Origin Country'  />
                        <input name="portofReporting" className='Input' type="text" placeholder='' onChange={handleInput} value={input.portofReporting} /><label className="Label">Port of Reporting</label>
                        <input name="shippingline" className='Input' type="text" placeholder='Shipping Line' onChange={handleInput} value={input.shippingline}/>
                        <input name="container_no" className='Input' type="text" placeholder='Container No.' onChange={handleInput} value={input.container_no} />
                        <input name="container_count" className='Input' type="text" placeholder='' onChange={handleInput} value={input.container_count} /><label className="Label">Container Count</label>
                        <input name="toi" className='Input' type="date" placeholder='' onChange={handleInput} value={input.toi} /><label className="Label">TOI</label>
                        
                       
                       
                    </div>

                    <div className="col-2 Column">

                        <input name="unit_price" className='Input' type="text" placeholder='Unit Price' onChange={handleInput} value={input.unit_price} />
                        <input name="cif_amount" className='Input' type="text" placeholder='' onChange={handleInput} value={input.cif_amount} /><label className="Label">CIF Amount</label>
                        <input name="assbl_value" className='Input' type="text" placeholder='' onChange={handleInput} value={input.assbl_value} /><label className="Label">Assbl. Value</label>
                        <input name="total_duty" className='Input' type="text" placeholder='' onChange={handleInput} value={input.total_duty} /><label className="Label">Total Duty</label>
                        <input name="out_of_charge" className='Input' type="text" placeholder='Out of charge' onChange={handleInput} value={input.out_of_charge} />
                        <input name="consignment_type" className='Input' type="text" placeholder='' onChange={handleInput} value={input.consignment_type} /><label className="Label">Consignment Type</label>
                        <input name="bill_no" className='Input' type="text" placeholder='Bill No.' onChange={handleInput} value={input.bill_no}/>
                        <input name="bill_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.bill_date} /><label className="Label">Bill Date</label>
                        <input name="cth_no" className='Input' type="text" placeholder='' onChange={handleInput} value={input.cth_no} /><label className="Label">CTH No.</label>
                      
                    </div>


                    
            
                </div>
            </div>
            <div className='Buttons'>
                {/* <button onClick={handleClick} className='submitBtn'>Submit</button> */}
                <button onClick={handleClick} className='submitBtn'>Submit</button>
                <button className='clearBtn'>Clear</button>
                <i className="fa-sharp fa-solid fa-turn-down-left"></i>
            </div>

        </form>

    )
}

export default MainReport