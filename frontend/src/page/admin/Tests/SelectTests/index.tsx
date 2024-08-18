import React, { useEffect, useState } from "react";
import axios from "axios";
import { PORT_SERVER } from "../../../../constants/index.js";
import { findArray } from "../../../../utils/Array.js";
import { FaArrowCircleDown } from "react-icons/fa";
import styles from "./Select.module.scss"; // Import CSS module


interface Props {
    hanlder: Function;
}

const SelectTests: React.FC<Props> = ({ hanlder }) => {
    const [collections, setCollections] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${PORT_SERVER}api/level/getLevels`);
                setCollections([{ datas: response.data }]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleOnchangeSelect = (
        datas: any[],
        index: number,
        indexOption: number
    ) => {
        let updateCollection = [...collections];
        const nextData: any = findArray(datas[indexOption]);

        if (nextData?.length > 0) {
            updateCollection[index + 1] = {
                datas: nextData,
            };
            setCollections(updateCollection);
        } else {
            hanlder(datas[indexOption]._id);
        }
    };

    return (
        <div className={styles["select-container"]}>
            <h6>Đường dẫn đề thi</h6>
            {collections.map(({ datas }, i) => (
                <select
                    className="form-select mb-3"
                    key={i}
                    onChange={(e) =>
                        handleOnchangeSelect(datas, i, parseInt(e.target.value, 10))
                    }
                >
                    <option value={0}></option>
                    {datas.map((collect: any, j) => (
                        <option key={j} value={j}>
                            {collect.name}
                        </option>
                    ))}
                </select>
            ))}
        </div>
    );
};

export default SelectTests;
