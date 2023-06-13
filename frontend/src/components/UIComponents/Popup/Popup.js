import "./Popup.css"
import enter from "./Images/enter.png"
const Popup = ({ setOpen }) => {
    return (
        <div className="popupContainer" >

           <div className="popupBox">
             <h1 className="popupTitle">Job Details</h1>
           <div className="  mt-2 " >
                {/* <span className="">Job No:</span> */}
               <input className="popupInput" placeholder="Job No:" type="text" />
               <span><img className="popupImg" src={enter} alt="" /></span>
            </div>
       
            <div className="">
                <button onClick={() => setOpen(false)} className="btn btn-light  my-1 mx-2">close</button>
                <button className="popupSubmitBtn">save </button>
            </div>
           </div>


        </div>
    );

}

export default Popup