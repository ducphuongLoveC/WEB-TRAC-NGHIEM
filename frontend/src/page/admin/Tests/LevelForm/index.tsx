import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { PORT_SERVER } from '../../../../constants';
import randomId from '../../../../utils/random';

function LevelForm({ finishForm }) {
    const [dataForm, setDataForm] = useState({ icon: '', name: '' });

    const handleChangeIcon = (event) => {
        setDataForm({ ...dataForm, icon: event.target.value });
    };
    const handleChangeLevel = (event) => {
        setDataForm({ ...dataForm, name: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post(`${PORT_SERVER}api/level/createLevel`, dataForm);
            toast.success('Thêm thành công');
            finishForm(randomId(24, { value: 'number', percent: 90 }));
        } catch (error) {
            toast.warn('Thêm thất bại thử lại!')

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <small>*Icon không bắt buộc</small>
            <MDBInput
                className='mt-3'
                label="icon"
                value={dataForm.icon}
                onChange={handleChangeIcon}
                type="text"
                placeholder="Enter icon"
            />
            <MDBInput
                className='mt-3'
                label="Level"
                value={dataForm.name}
                onChange={handleChangeLevel}
                type="text"
                placeholder="Enter level name"
            />
            <MDBBtn className='mt-3' color="primary" type="submit">
                Tạo level
            </MDBBtn>
        </form>
    );
}

export default LevelForm;
