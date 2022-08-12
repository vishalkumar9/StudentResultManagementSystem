import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalView(props) {

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.clear();
    }
    const handleShow = () => setShow(true);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>{props.message}</Modal.Body>
                {/*<Modal.Footer>*/}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                {/*</Modal.Footer>*/}
            </Modal>
        </div>
    );
}

export default ModalView;