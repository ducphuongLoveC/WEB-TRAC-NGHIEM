import React, { useEffect, useState } from "react";
import randomId from "../../../../utils/random.js";

interface Props {
    id: string | number;
    datas: { title: string; options: { title: string; isCorrect?: boolean }[] }[];
    isExportData: boolean;
    handleExport: Function;
}

interface Option {
    title: string;
}

interface Question {
    title: string;
    options: Option[];
}

const ListTest: React.FC<Props> = ({ datas, isExportData, handleExport }) => {
    const [testsList, setTestsList] = useState<Question[]>([]);

    useEffect(() => {
        if (datas.length === 0) {
            setTestsList([
                { title: '', options: [{ title: '', isCorrect: false }] },
                { title: '', options: [{ title: '', isCorrect: false }] }
            ]);
        } else {
            setTestsList(datas);
        }
    }, [datas]);

    useEffect(() => {
        if (isExportData) {
            handleExport(testsList);
        }
    }, [isExportData, testsList, handleExport]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
        const newTitle = e.target.value;
        const updatedTestsList = [...testsList];
        updatedTestsList[questionIndex].title = newTitle;
        setTestsList(updatedTestsList);
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, optionIndex: number) => {
        const valueInput: string = e.target.value;
        const updatedTestsList = [...testsList];
        updatedTestsList[questionIndex].options[optionIndex] = {
            ...updatedTestsList[questionIndex].options[optionIndex],
            title: valueInput,
            _id: randomId(24, {
                value: 'number',
                percent: 90
            }),
        };
        setTestsList(updatedTestsList);
    };

    const handleCorrectOption = (questionIndex: number, optionIndex: number) => {
        const updatedTestsList = [...testsList];
        updatedTestsList[questionIndex].options = updatedTestsList[questionIndex].options.map((option, index) => ({
            ...option,
            isCorrect: index === optionIndex
        }));
        setTestsList(updatedTestsList);
    };

    const addNewOption = (questionIndex: number) => {
        const updatedTestsList = [...testsList];
        updatedTestsList[questionIndex].options.push({ title: '', isCorrect: false });
        setTestsList(updatedTestsList);
    };

    const addNewQuestion = () => {
        setTestsList([...testsList, { title: '', options: [{ title: '', isCorrect: false }] }]);
    };

    const removeQuestion = (questionIndex: number) => {
        const updatedTestsList = testsList.filter((_, index) => index !== questionIndex);
        setTestsList(updatedTestsList);
    };

    return (
        <div style={{ height: '65vh', overflow: 'auto' }}>
            <small style={{ paddingBottom: '10px', color: 'red' }}>*Vui lòng chọn "Đường dẫn" để thêm bài thi</small>

            {testsList?.map((test, questionIndex) => (
                <div key={questionIndex}>
                    <h6>Thêm câu thứ {questionIndex + 1}:</h6>
                    <input
                        className="form-control"
                        placeholder="Câu hỏi"
                        style={{ width: '100%', padding: '5px' }}
                        type="text"
                        value={test?.title}
                        onChange={(e) => handleTitleChange(e, questionIndex)}
                    />
                    <div>
                        <div>Đáp án:</div>
                        {test?.options.map((option, optionIndex) => (
                            <p className="d-flex" key={optionIndex}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    checked={option.isCorrect}
                                    onChange={() => handleCorrectOption(questionIndex, optionIndex)}
                                />
                                <input
                                    className="form-control"
                                    style={{ width: '90%' }}
                                    type="text"
                                    value={option.title}
                                    onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)}
                                    placeholder="Đáp án..."
                                />
                            </p>
                        ))}
                    </div>
                    <div style={{ marginBottom: '10px' }} className="btn btn-outline-primary" onClick={() => addNewOption(questionIndex)}>
                        Thêm đáp án
                    </div>
                    <div style={{ marginBottom: '10px', marginLeft: '10px' }} className="btn btn-outline-danger" onClick={() => removeQuestion(questionIndex)}>
                        Xóa Câu
                    </div>
                </div>
            ))}
            <div className="btn btn-outline-info" onClick={addNewQuestion}>
                Thêm câu hỏi
            </div>
        </div>
    );
};

export default ListTest;
