import React, { useEffect, useState, useRef } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { PORT_SERVER } from '../../../../constants';


function TypeExamForm({ finishForm }) {

    const [dataForm, setDataForm] = useState({ name: '', time_exam: '', id_subject: '' });
    const [subjects, setSubjects] = useState([]);
    const refSelect = useRef();

    useEffect(() => {
        const fetchApi = async () => {

            try {
                const response = await axios.get(`${PORT_SERVER}api/subject`)
                setSubjects(response.data);

            } catch (error) {

            }
        }
        fetchApi();
    }, [])
    const handleChangeIdSubject = (event) => {
        setDataForm({ ...dataForm, id_subject: refSelect?.current?.value });
    };
    const handleChangeName = (event) => {
        setDataForm({ ...dataForm, name: event.target.value });
    };

    const handleChangeTimeExam = (event) => {
        setDataForm({ ...dataForm, time_exam: event.target.value });
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(dataForm);

        try {
            const response = await axios.post(`${PORT_SERVER}api/type_exam/create_type_exam`, dataForm);
            toast.success('Thêm thành công');
            finishForm();
        } catch (error) {
            console.error('Error adding type exam:', error);
            toast.error('Thêm thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h6>Thêm vào:</h6>
            <select
                onChange={handleChangeIdSubject}
                ref={refSelect}
                className="form-select mb-3">
                {
                    subjects.map((level: any, i) => (
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
                label="time exam"
                value={dataForm.time_exam}
                onChange={handleChangeTimeExam}
                type="text"
                placeholder="Nhập số phút"
            />
            
            <MDBBtn className='mt-3' color="primary" type="submit">
                Tạo loại đề thi
            </MDBBtn>
        </form>
    );
}

export default TypeExamForm;
