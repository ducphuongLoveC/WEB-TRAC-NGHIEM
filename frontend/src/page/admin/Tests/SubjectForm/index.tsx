import React, { useEffect, useState, useRef } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { PORT_SERVER } from '../../../../constants';


function SubjectForm({ finishForm }) {

    const [dataForm, setDataForm] = useState({ name: '', image: '', des: '', id_level: '' });
    const [levels, setLevels] = useState([]);
    const refSelect = useRef();

    useEffect(() => {
        const fetchApi = async () => {

            try {
                const response = await axios.get(`${PORT_SERVER}api/level`)
                setLevels(response.data);

            } catch (error) {

            }
        }
        fetchApi();
    }, [])
    const handleChangeIdLevel = (event) => {
        setDataForm({ ...dataForm, id_level: refSelect?.current?.value });
    };
    const handleChangeName = (event) => {
        setDataForm({ ...dataForm, name: event.target.value });
    };

    const handleChangeImage = (event) => {
        setDataForm({ ...dataForm, image: event.target.value });
    };

    const handleChangeDes = (event) => {
        setDataForm({ ...dataForm, des: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(dataForm);

        try {
            const response = await axios.post(`${PORT_SERVER}api/subject/createSubject`, dataForm);
            toast.success('Thêm thành công');
            finishForm();
        } catch (error) {
            console.error('Error adding level:', error);
            toast.error('Thêm thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
             <h6>Thêm vào:</h6>
            <select
                onChange={handleChangeIdLevel}
                ref={refSelect}
                className="form-select mb-3">
                {
                    levels.map((level: any, i) => (
                        <option value={level._id} key={i}>{level.name}</option>
                    ))
                }

            </select>

            <MDBInput
                className='mt-3'
                label="name"
                value={dataForm.name}
                onChange={handleChangeName}
                type="text"
                placeholder="Nhập tên"
            />
            <MDBInput
                className='mt-3'
                label="Image"
                value={dataForm.image}
                onChange={handleChangeImage}
                type="text"
                placeholder="Nhập đường dẫn ảnh"
            />
            <div className='mt-3'>
                <label>Mô tả</label>
                <textarea
                    className='form-control'
                    value={dataForm.des}
                    onChange={handleChangeDes}
                    placeholder="Nhập mô tả"
                    rows={4} // Số dòng bạn muốn hiển thị ban đầu
                />
            </div>
            <MDBBtn className='mt-3' color="primary" type="submit">
                Tạo môn
            </MDBBtn>
        </form>
    );
}

export default SubjectForm;
