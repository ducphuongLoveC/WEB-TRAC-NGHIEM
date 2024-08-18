interface Prop {
    datas: any[]; // Kiểu dữ liệu của datas, ví dụ: array các object
    thead: React.ReactNode; // Kiểu dữ liệu của thead là một node React
    tbody: (data: any, index: number) => React.ReactNode; // Kiểu dữ liệu của tbody là một function nhận data và index và trả về một node React
}

const Table: React.FC<Prop> = ({ datas, thead, tbody }) => {
    return (
        <div className="table-responsive">
            <table className="table info-table table-bordered">
                <thead>{thead}</thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={index}>
                            {tbody(data, index)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
