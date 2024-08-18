import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Cookies from 'js-cookie';
import { shuffleArray } from "../../utils";
import './Test.css';
import { PORT_SERVER } from "../../constants";
import NotificationForm from "../../components/NotificationForm/index.tsx";
import CountdownTimer from "../../components/CountDownTime/index.tsx";

import confetti from 'canvas-confetti';

const handleConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            y: 0.6,
        },
    });
};

const token = Cookies.get('token');
const infoUser = token ? JSON.parse(token) : null;

const Test: React.FC = () => {
    let times: { minutes: number, seconds: number } = { minutes: 0, seconds: 0 };

    const [exams, setExams] = useState<any[]>([]);
    const [shuffTests, setShuffTests] = useState<any[]>([]);
    const [checkIdExams, setCheckIdExams] = useState<string[]>([]);
    const [resultExams, setResultExams] = useState<any[]>([]);
    const [infoScores, setInfoScores] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [showLate, setShowLate] = useState(false);
    const [showScores, setShowScores] = useState(false);
    const [runTime, setRuntime] = useState(true);

    const [searchParams] = useSearchParams();
    const id_type_exam = searchParams.get('id_type_exam');

    const btnRef = useRef<HTMLButtonElement>(null);
    const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await axios.get(`${PORT_SERVER}api/type_exam/getTypeExamWithTest?id_type_exam=${id_type_exam}`);
                setExams(result.data);
                setShuffTests(shuffleArray(result.data.tests));
            } catch (error) {
                throw new Error(error);
            }
        }
        fetchApi();
    }, [id_type_exam]);

    const handleExam = () => {
        setRuntime(false);
        setShow(false);
        setShowLate(false);
        handleConfetti();

        const completed = resultExams.reduce((accumulator, currentValue) => {
            return currentValue.isCorrect ? accumulator + 1 : accumulator + 0;
        }, 0);


        const examResult = {
            completed: `${completed} / ${exams?.tests?.length}`,
            id_type_exam: exams._id,
            id_user: infoUser._id,
            score: ((10 / exams.tests.length) * completed).toFixed(1),
            setFinish: true
        }

        setInfoScores(prevScores => [...prevScores, examResult]);
        setShowScores(true);
        const fetchApi = async () => {
            try {
                await axios.post(`${PORT_SERVER}api/exam_result/create_exam_result`, examResult);
            } catch (error) {
                console.error('Failed to create exam results:', error);
            }

        }
        fetchApi();
    }

    const scrollToQuestion = (index: number) => {
        if (questionRefs.current[index]) {
            questionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    return (
        <div className="row">
            <div className="col-9">
                <div className="container" style={{ overflow: 'auto', height: '90vh' }}>
                    {/* render list câu hỏi */}
                    {
                        shuffTests?.map((e: any, i: number) => (
                            <div key={e._id} className="mb-2 mt-2" ref={el => questionRefs.current[i] = el}>
                                <div style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }} className="p-3">
                                    <div className="container mt-2">
                                        <h6>Câu {i + 1}: {e.title} </h6>
                                        <form>
                                            {
                                                e.options.map((o, j) => (
                                                    <div key={o._id} className="form-check">
                                                        <input onClick={(event: any) => {
                                                            if (event.target.checked && !checkIdExams.includes(e._id)) {
                                                                setCheckIdExams([...checkIdExams, e._id]);
                                                            }

                                                            const isExistOption = resultExams.some((r) => r.idOption === o._id);

                                                            if (!isExistOption) {
                                                                //  cắt thằng kết quả chọn câu cũ đi để thay câu mới
                                                                const changeOption = resultExams.filter((value) => value.idFatherOp !== e._id);
                                                                setResultExams([
                                                                    ...changeOption,
                                                                    {
                                                                        idFatherOp: e._id,
                                                                        idOption: o._id,
                                                                        isCorrect: o.isCorrect
                                                                    }
                                                                ])
                                                            }
                                                        }} type="radio" className="form-check-input" id={`radio_${i}_${j}`} name={`radio_${i}`} value={`option_${j}`} />
                                                        <label style={{ color: `${infoScores.length > 0 && infoScores[infoScores.length - 1].setFinish && o.isCorrect ? '#3498db' : ''}` }} className="form-check-label" htmlFor={`radio_${i}_${j}`}>{o.title}</label>
                                                    </div>
                                                ))
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="col-3">
                <div style={{ height: '80vh' }}>
                    <div className="card-body  d-flex flex-column justify-content-between h-100">
                        <div className="box-1 d-flex flex-wrap" style={{ overflow: 'auto', maxHeight: '470px' }}>
                            {
                                shuffTests?.map((e: any, i: number) => {
                                    const style: any = {
                                        width: '45px', height: '45px', border: '1px solid rgb(189, 188, 188)', borderRadius: '10px'
                                    }
                                    if (checkIdExams.includes(e._id)) {
                                        style.color = 'white';
                                        style.background = '#3498db';
                                    }
                                    // render các khối để nhìn tổng quát nhưng câu mình đã làm
                                    return (
                                        <div key={e._id} className="m-2">
                                            <button style={style} onClick={() => scrollToQuestion(i)}>
                                                {i + 1}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="box-2">
                            <h4 className="card-text">Đề thi: {exams.name}</h4>
                            <p className="card-text card-title">Số lượng câu hỏi: {exams.tests && exams.tests.length}</p>
                            <p className="card-text card-title  ">Thời gian làm: {exams.time_exam} phút</p>

                            <button disabled={!runTime} ref={btnRef} onClick={() => setShow(true)} style={{ background: '#3498db' }} className="w-100 btn btn-primary btn-lg mt-1">
                                Nộp bài | {
                                    exams.time_exam && <CountdownTimer
                                        isRunning={runTime}

                                        handleFinishLate={() => setShowLate(true)}
                                        initialMinutes={exams.time_exam} />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <NotificationForm
                title={'Nộp bài'}
                des={'Bạn chắc chắn muốn nộp bài không?'}
                isShow={show}
                onClose={() => setShow(false)}
                handle={handleExam}
            />

            <NotificationForm
                title={'Hết giờ'}
                des={'Đã hết thời gian vui lòng nộp bài'}
                isShow={showLate}
                require
                handle={handleExam}
            />

            {
                infoScores.map((score, index) => (
                    <NotificationForm
                        key={index}
                        title={`Kết quả bài thi ${index + 1}`}
                        des={`Bạn làm đúng ${score.completed} câu. ${score.score} điểm!.`}
                        isShow={showScores}
                        onClose={() => setShowScores(false)}
                        handle={() => setShowScores(false)}
                    />
                ))
            }
        </div>
    )
}

export default Test;
