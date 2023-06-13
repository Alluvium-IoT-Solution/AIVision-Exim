import React, { Fragment } from "react";

const EnvironmentalBenifits = props => {
    return (
        <Fragment>
            <h5><strong>Environmental benifits</strong></h5>

            <div className='row'>
                <div className="col pl-5 mt-3">
                    <h6>Co2 Emmission saved<br /></h6>
                    <strong>7696636 KG</strong>
                </div>
            </div>

            <div className='row mt-4'>
                <div className="col pl-5 mt-3">
                    <h6>Equivalent Trees planted</h6>
                    <strong>22972</strong>
                </div>
            </div>
        </Fragment>
    )
}

export default EnvironmentalBenifits