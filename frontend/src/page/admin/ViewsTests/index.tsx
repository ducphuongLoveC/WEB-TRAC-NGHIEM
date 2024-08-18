
import { Fragment, useState, useEffect } from "react";
import Table from "../../../components/Table/index.tsx";

import axios from "axios";
import { PORT_SERVER } from "../../../constants/index.js";

const ViewsTests: React.FC = () => {
    const [resultExams, setResultExams] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`${PORT_SERVER}api/exam_result/get_info_exam_result`);
                setResultExams(response.data);
            } catch (error) {

            }
        }
        fetchApi();
    }, []);
    return (
        <Table
            datas={resultExams}
            thead={
                <tr>
                    <td>id</td>
                    <td>User làm</td>
                    <td>Tên bài làm</td>
                    <td>Hoàn thành</td>
                    <td>Điểm số</td>
                    <td colSpan={2}>Hành động</td>
                </tr>

            }
            tbody={(value) => (
                <Fragment>
                    <td>{value._id}</td>
                    <td>{value.id_user.username}</td>
                    <td>{value.id_type_exam.name}</td>
                    <td>{value.completed}</td>
                    <td>{value.score}</td>
                    <td><button className="btn btn-danger">Hủy kết quả thi</button></td>

                </Fragment>
            )}
        />
    )
}
export default ViewsTests;