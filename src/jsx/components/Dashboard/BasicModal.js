import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {Modal} from 'react-bootstrap';

const BasicModal = forwardRef((props, ref) => {
    const [modalBox, setModalBox] = useState(false);

    useImperativeHandle(ref, () => ({
        openModal() {
            setModalBox(true);
        }    
      }));

    return(
        <>
            <Modal  onHide={setModalBox} show={modalBox} centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close"  onClick={()=>setModalBox(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 d-block">
                            <label htmlFor="basic-url" className="form-label d-block">Enter Name</label>
                            <input type="text" className="form-control w-100" placeholder="Username" />
                        </div>
                        <div className="mb-3 d-block">
                            <label htmlFor="basic-url" className="form-label d-block">Enter Position</label>
                            <input type="text" className="form-control w-100" placeholder="Userposition" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>setModalBox(false)}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>                
            </Modal>
        </>
    )
})
export default BasicModal;