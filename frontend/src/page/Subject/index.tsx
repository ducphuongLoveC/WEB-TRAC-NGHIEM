import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
import { PORT_SERVER } from "../../constants";

import { customSpace } from "../../utils";

import { useSearchParams } from "react-router-dom";
const Subject: React.FC = () => {
  
   
    
    const [subjects, setSubjects] = useState<any>({});


    const [searchParams] = useSearchParams();
    const id_level = searchParams.get('id_level');

    useEffect(() => {
        const fetchApi = async () => {
            try {

                const result = await axios.get(`${PORT_SERVER}api/level/getLevelId?id_level=${id_level}`);
               
                setSubjects(result.data);


            } catch (error) {
                throw new Error(error)

            }
        }
        fetchApi();

    }, [id_level]);

    console.log(subjects);

    return (
        <div>
            <h2 className="text-center mt-5">ĐỀ THI</h2>
            <div className="row mt-5">
                {
                    subjects && subjects.subjects?.map((subject: any) => (

                        <div className="col-sm-6 col-lg-6 col-xl-3">
                            <div className="card">
                                <img alt="Card image cap" height={'300px'} src={subject.image} className="card-img" />
                                <div className="p-4 card-body">
                                    <h5 className="card-title">{subject.name}</h5>
                                    <div className="card-subtitle"></div>
                                    <p className="mt-3 card-text">{subject.des}</p>
                                    <Link to={`/exam/${customSpace(subjects.name, '-')}/${customSpace(subject.name, '-')}?id_subject=${subject._id}`} className="btn btn-primary">
                                        Làm thử ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Subject;
