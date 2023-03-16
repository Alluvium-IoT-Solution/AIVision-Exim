import { useState, useEffect } from 'react'
import "./Importer.css"
import axios from 'axios'

const Importer = () => {


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
    
        axios.post("http://localhost:3001/job", newInput)

        // fetch("http://localhost:3001/job")
        // .then(response=>{
        //     if(response.ok){
        //         return response.json();
        //     }
        // }).then(data => {
        //     if(data){
        //         console.log(data)
        //     }
        // }).catch(err => console.log(err));
   
    }

    function getData(event){
        event.preventDefault();

        fetch("http://localhost:3001/"+ (input.jobNo).toString())
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

    

  
    return (
        <form autoComplete='off' >
            <div className=''>
                <h1 className='text-center'>Welcome to EXIM</h1>
                {/* <button className='UploadSheetBtn'>Upload Sheet <i className="fa-solid fa-upload"></i></button> */}
            </div>
            <div className=" mt-5">
                <div className="row">
                    <div className="col-2 Column">

                        <input name="jobNo" className='Input' onChange={handleInput} value={input.jobNo} type="text" placeholder='Job No'/>
                        <button onClick={jobSumbit} className='submitBtn'>SEARCH</button>
                        <button onClick={getData} className='submitBtn'>GET DATA</button>
                        <input name="jobdate"  className='Input' onChange={handleInput} value={input.jobdate} type="date" placeholder='text' /><label className="Label">Job Date</label>
                        <input name="shipper" className='Input' onChange={handleInput} value={input.shipper} type="text" placeholder='Shipper/Exporter' />
                        <input name="invoiceNo" className='Input' onChange={handleInput} value={input.invoiceNo} type="text" placeholder='Invoice No'  />
                        <input name="date" className='Input' onChange={handleInput} value={input.date} type="date" placeholder='text' /><label className="Label"> Date</label>
                        <input name="descriptionOfGoods" className='Input' onChange={handleInput} value={input.descriptionOfGoods} type="text" placeholder='Description Of Goods'  />
                        <input name="netWeight" className='Input' onChange={handleInput} value={input.netWeight} type="text" placeholder='Net Weight'  />
                        <input name="proofOfLoading" className='Input' onChange={handleInput} value={input.proofOfLoading} type="text" placeholder='Proof Of Loading'  />
                        <input name="invoiceValue" className='Input' onChange={handleInput} value={input.invoiceValue} type="text" placeholder='Invoice Value'/>
                        <input name="unitPrice" className='Input' onChange={handleInput} value={input.unitPrice} type="text" placeholder='Unit Price'/>
                        <input name="eta" className='Input' onChange={handleInput} value={input.eta} type="text" placeholder=''/><label className="Label">ETA at Port (Dt)</label>
                        <input name="icdArrivalDate" className='Input' onChange={handleInput} value={input.icdArrivalDate} type="date" placeholder='text' /><label className="Label">ICD Arrival Date</label>

                    </div>
                    <div className="col-2 Column">
                        <input name="freeTime" className='Input' type="text" placeholder='' onChange={handleInput} value={input.freeTime} /><label className="Label">Free Time</label>
                        <input name="shippingLine" className='Input' type="text" placeholder='Shipping Line' onChange={handleInput} value={input.shippingLine}/>
                        <input name="containerNo" className='Input' type="text" placeholder='Container No' onChange={handleInput} value={input.containerNo} />
                        <input name="containerSize" className='Input' type="text" placeholder='Container Size' onChange={handleInput} value={input.containerSize} />
                        <input name="noOfcontainer" className='Input' type="text" placeholder='No of Container' onChange={handleInput} value={input.noOfcontainer}/>
                        <input name="billofEntryNo" className='Input' type="text" placeholder='Bill Of Entry No.' onChange={handleInput} value={input.billofEntryNo}/>
                        <input name="date_new" className='Input' type="date" placeholder='' onChange={handleInput} value={input.date_new} /><label className="Label">Date</label>
                        <input name="assessment_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.assessment_date} /><label className="Label">Assesment Date</label>
                        <input name="duty_payment_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.duty_payment_date} /><label className="Label">Duty Payment Date</label>

                    </div>
                    <div className="col-2 Column">
                        <input name="examination_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.examination_date} /><label className="Label">Examination Date</label>
                        <input name="orignalDocs_recordDate" className='Input' type="date" placeholder='' onChange={handleInput} value={input.orignalDocs_recordDate} /><label className="Label">Original Documents Received Date</label>
                        <input name="outOfchargeDate" className='Input' type="date" placeholder='' onChange={handleInput} value={input.outOfchargeDate} /><label className="Label">Out Of Charge Date</label>
                        <input name="DOcollected_date" className='Input' type="date" placeholder='' onChange={handleInput} value={input.DOcollected_date} /><label className="Label">DO Collected Date</label>
                        <input name="Gatepass" className='Input' type="date" placeholder='' onChange={handleInput} value={input.Gatepass}/><label className="Label">Gate Pass</label>
                        <input name="deliveryDate" className='Input' type="date" placeholder='' onChange={handleInput} value={input.deliveryDate} /><label className="Label">Delivery  Date</label>
                    </div>
                    <div className="col-2 Column">
                        <input name="emptyReturnDate" className='Input' type="date" placeholder=''  onChange={handleInput} value={input.emptyReturnDate}/><label className="Label">Empty Return Date</label>
                        <input name="billNo" className='Input' type="text" placeholder='Bill No' onChange={handleInput} value={input.billNo} />
                        <textarea name="remarks" className='Input' cols="30" rows="10" onChange={handleInput} value={input.remarks}></textarea>
                        <label className="Label">Remarks</label>
                    </div>
                </div>
            </div>
            <div className='Buttons'>
                <button onClick={handleClick} className='submitBtn'>Submit</button>
                <button className='clearBtn'>Clear</button>
                <i className="fa-sharp fa-solid fa-turn-down-left"></i>
            </div>

        </form>

    )
}

export default Importer