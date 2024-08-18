import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Prop {
    title: String
    des: String
    isShow: boolean
    require?: boolean
    handle: Function
    onClose?: Function
}

const NotificationForm: React.FC<Prop> = ({ title, des, require = false, isShow, onClose, handle }) => {

    return (
        <>
            <Modal show={isShow}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{des}</Modal.Body>
                <Modal.Footer>
                    {
                        !require && <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    }

                    <Button variant="primary" onClick={() => {
                        handle();
                    }}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NotificationForm;