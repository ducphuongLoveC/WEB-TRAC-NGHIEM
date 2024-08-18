
import React from "react";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PORT_SERVER } from "../../constants";
import { Link } from "react-router-dom";
import Login from "../../components/Login/index.tsx";

import NotificationForm from "../../components/NotificationForm/index.tsx";

const Exam: React.FC = () => {

    const [subject, setSubject] = useState<any>({});
    const [formLogin, setFormLogin] = useState<boolean>(true);
    const [typeExams, setTypeExams] = useState<[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [idTypeExam, setIdTypeExam] = useState<boolean>(false);

    

    const [searchParams] = useSearchParams();
    const id_subject = searchParams.get('id_subject');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {

            try {
                const { data } = await axios.get(`${PORT_SERVER}api/subject/getSubjectId?id_subject=${id_subject}`);
                const { typeExams, ...rest } = data;
                setSubject(rest);
                setTypeExams(typeExams);
            } catch (error) {
                throw new Error(error);

            }
        }
        fetchApi();

    }, [id_subject]);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);
        
        if (!token) {
            console.log(token);
            setFormLogin(true);
        } else {
            setFormLogin(false);
        }
    }, []);


    const handleConfirm = ()=> {
        navigate(`/test?id_type_exam=${idTypeExam}`);
    }
    
    return (
        <div className="row">
            {
                formLogin && <Login></Login>
            }
            <div className="col-7">
                    <h2>Các dạng đề thi</h2>
                <div style={{maxHeight: '450px', overflow: 'auto'}} className="container mt-3">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Tên dạng đề thi</th>
                                <th>Thời gian làm bài(phút)</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                typeExams.map((t:any) => (
                                    <tr>
                                        <td>{t.name}</td>
                                        <td>{t.time_exam}</td>
                                        <td><button onClick={()=> {
                                            setShow(true)
                                            setIdTypeExam(t._id)
                                        }}  className="btn btn-outline-primary">Bắt đầu thi</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-3 mt-5">
                <div style={{ width: '550px' }}>
                    <img
                        src={subject.image}
                        className="d-block mx-auto"
                        style={{ width: '400px', height: '400px' }}
                        alt="Toán lớp 1"
                    />
                    <div className="card-body">
                        <h4 className="card-title">{subject.name}</h4>
                        <p className="card-text">Số lượng đề thi: {typeExams.length}</p>
                        <h6 className="card-text">{subject.des}</h6>
                    </div>
                </div>
            </div>
            <NotificationForm
                title={'Xác nhận'}
                des={'Bạn có muốn xác nhận vào thi không?'}
                isShow={show}
                onClose={()=>setShow(false)}
                handle={handleConfirm}
            />
        </div>
        
    )
}
export default Exam;