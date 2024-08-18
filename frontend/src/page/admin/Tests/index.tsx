import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { PORT_SERVER } from "../../../constants/index.js";
import s from './CreateTest.module.scss';

import { FaFileAlt } from "react-icons/fa";

// toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// my pj
import ListTest from "./ListTests/index.tsx";
import Search from "../../../components/Search/index.tsx";
import Select from "./SelectTests/index.tsx";
import LabTabs from "../../../components/LabTabs/index.tsx";
import TabPanel from "../../../components/TabPanel/index.tsx";
import LevelForm from "./LevelForm/index.tsx";
import SubjectForm from "./SubjectForm/index.tsx";
import TypeExamForm from "./TypeExamForm/index.tsx";

import Table from "../../../components/Table/index.tsx";



const CreateTest: React.FC = () => {
    const [levels, setLevels] = useState<any[]>([]);
    const [subjects, setSubject] = useState<any[]>([]);

    const [typeExams, setTypeExams] = useState<any[]>([]);
    const [typeExamsWithTests, setTypeExamsWithTests] = useState<any[]>([]);
    const [examId, setExamId] = useState<string | number>("");

    // trạng thái để hiện thị boxRight tương ứng
    const [showLabTabQuest, setShowLabTabQuest] = useState<boolean>(true);
    const [showFormCreateLevel, setFormCreateLevel] = useState<boolean>(false);
    const [showFormCreateSubject, setFormCreateSubject] = useState<boolean>(false);
    const [showFormCreateTypeExam, setFormCreateTypeExam] = useState<boolean>(false);

    const [toggleRender, setToggleRender] = useState<boolean>(false); // State để khi render lại boxright

    const [isExport, setIsExport] = useState<boolean>(false);

    // Lấy loại đề thi
    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const result = await axios.get(`${PORT_SERVER}api/level/`);
                setLevels(result.data);
            } catch (error) {
                console.error("Error fetching levels:", error);
            }
        };
        fetchLevel();
    }, [toggleRender]); // Dependency là toggleRender

    // Lấy môn học
    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const result = await axios.get(`${PORT_SERVER}api/subject/`);
                setSubject(result.data);
            } catch (error) {
                console.error("Error fetching Subjects:", error);
            }
        };
        fetchLevel();
    }, [toggleRender]); // Dependency là toggleRender

    // Lấy loại đề thi
    useEffect(() => {
        const fetchTypeExams = async () => {
            try {
                const result = await axios.get(`${PORT_SERVER}api/type_exam/`);
                setTypeExams(result.data);
            } catch (error) {
                console.error("Error fetching type exams:", error);
            }
        };
        fetchTypeExams();
    }, [toggleRender]); // Dependency là toggleRender

    useEffect(() => {
        const fetchTypeExamsWithTests = async () => {
            if (!examId) return; // Exit early if examId is not set

            try {
                const result = await axios.get(`${PORT_SERVER}api/type_exam/getTypeExamWithTest?id_type_exam=${examId}`);
                setTypeExamsWithTests(result.data);
            } catch (error) {
                console.error("Error fetching type exam with tests:", error);
            }
        };
        fetchTypeExamsWithTests();
    }, [examId, toggleRender]); // Dependency là examId và toggleRender

    const handleChangeIdExam = (id: string | number) => {
        setExamId(id);
    };

    const handleSave = async (datas: any[]) => {
        console.log(datas);

        try {
            const response = await axios.post(`${PORT_SERVER}api/test/save_tests`, {
                id_type_exam: examId,
                tests: datas
            });
            console.log('Response:', response.data);
            handleAddSuccess();

        } catch (error) {
            console.error('Error:', error.response.data);

        }
    };

    const handleAddSuccess = () => {
        toast.success('Lưu thành công!', {});
        setToggleRender(prevState => !prevState); // Toggle state để render lại component
    };

    return (
        <div className={clsx(s['create_box'])}>
            <div className={clsx(s['box_left'])}>
                <Search/>
                <br />
                <TabPanel tabs={[
                    {
                        label: 'Đường dẫn',
                        content: <>
                            <Select hanlder={(id) => handleChangeIdExam(id)} />
                            <h6>Hành động</h6>
                            <button onClick={() => setIsExport(true)} className="btn btn-outline-primary" type="button">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only">Đợi Lưu...</span>
                            </button>
                        </>,
                        onAction: () => {
                            setShowLabTabQuest(true);
                            setFormCreateLevel(false);
                            setFormCreateSubject(false);
                            setFormCreateTypeExam(false);
                        }
                    },
                    {
                        label: 'Tạo cấp',
                        content: <LevelForm finishForm={() => setToggleRender(prevState => !prevState)} />,
                        onAction: () => {
                            setShowLabTabQuest(false);
                            setFormCreateLevel(true);
                            setFormCreateSubject(false);
                            setFormCreateTypeExam(false);
                        }
                    },
                    {
                        label: 'Tạo Môn',
                        content: <SubjectForm finishForm={() => setToggleRender(prevState => !prevState)} />,
                        onAction: () => {
                            setShowLabTabQuest(false);
                            setFormCreateLevel(false);
                            setFormCreateSubject(true);
                            setFormCreateTypeExam(false);
                        }
                    },
                    {
                        label: 'Tạo loại đề thi',
                        content: <TypeExamForm finishForm={() => setToggleRender(prevState => !prevState)} />,
                        onAction: () => {
                            setShowLabTabQuest(false);
                            setFormCreateLevel(false);
                            setFormCreateSubject(false);
                            setFormCreateTypeExam(true);
                        }
                    }
                ]} />

                <div>
                    <small>*Tạo đề thi: cần phải trỏ đường dẫn tới loại đề thi trước!</small>
                    <br />
                    <small>*Cấp: cấp ở đây là danh mục cao nhất!</small>
                    <br />
                    <small>*Môn học: tạo môn học để nhóm loại đề thi vào môn đó!</small>
                    <br />
                    <small style={{ color: 'red' }}>*Loại đề thi: Là tên của của đề thi cần tạo nó để tạo câu hỏi!</small>

                </div>

            </div>
            <div className={clsx(s['box_right'])}>

                {/* Xử lý hiển thị các form chat */}
                {showLabTabQuest && (
                    <LabTabs
                        
                        tabs={[
                            { label: 'Thêm tay' },
                            { label: 'Thêm bằng file' }
                        ]}
                        tabPanels={[
                            {
                                content: (
                                    <ListTest
                                        id={typeExamsWithTests._id}
                                        datas={typeExamsWithTests.tests || []}
                                        isExportData={isExport}
                                        handleExport={(datas) => {
                                            handleSave(datas);
                                            setIsExport(false);
                                        }}
                                    />
                                )
                            },
                            {
                                content: <div> <input type="file" /> Đang phát triển </div>
                            }
                        ]}
                    />
                )}
                {showFormCreateLevel && (
                    <Table
                        thead={
                            <tr>
                                <th>_Id</th>
                                <th>Icon</th>
                                <th>Name</th>
                                <th colSpan={2}>Hành động</th>
                            </tr>
                        }
                        tbody={(value, index) => (
                            <React.Fragment key={index}>
                                <td>{value._id}</td>
                                <td>{value.icon}</td>
                                <td>{value.name}</td>
                                <td>
                                    <button className="btn btn-warning">Sửa</button>
                                    <button className="mt-3 btn btn-danger">Xóa</button>
                                </td>
                            </React.Fragment>
                        )}
                        datas={levels}
                    />
                )}

                {showFormCreateSubject && <Table
                    thead={
                        <tr>
                            <th>_Id</th>
                            <th>name</th>
                            <th>Image</th>
                            <th>Des</th>
                            <th colSpan={2}>Hành động</th>
                        </tr>
                    }
                    tbody={(value, index) => (
                        <React.Fragment key={index}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td> <img width={'50px'} src={value.image} alt={value.name} /></td>
                            <td>{value.des}</td>
                            <td>
                                <button className="btn btn-warning">Sửa</button>
                                <button className="mt-3 btn btn-danger">Xóa</button>
                            </td>
                        </React.Fragment>
                    )}
                    datas={subjects}
                />
                }
                {showFormCreateTypeExam && <Table
                    thead={
                        <tr>
                            <th>_Id</th>
                            <th>name</th>
                            <th>Time</th>
                            <th colSpan={2}>Hành động</th>
                        </tr>
                    }
                    tbody={(value, index) => (
                        <React.Fragment key={index}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{value.time_exam}</td>
                            <td>
                                <button className="btn btn-warning">Sửa</button>
                                <button className="mt-3 btn btn-danger">Xóa</button>
                            </td>
                        </React.Fragment>
                    )}
                    datas={typeExams}
                />}
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateTest;
