import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PORT_SERVER } from "../../constants";

interface Props {
    isHandled: Function
}

const Register: React.FC<Props> = ({ isHandled }) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        if (pass === rePass && pass && username) {  // Corrected condition
            try {
                const response = await axios.post(`${PORT_SERVER}api/user/create_user`, {
                    username,
                    pass
                });
                toast.success('Tạo tài khoản thành công');
                isHandled();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('Server Error:', error.response.data);
                        toast.error('Server Error: ' + error.response.data.message);
                    } else if (error.request) {
                        console.error('Network Error:', error.request);
                        toast.error('Network Error');
                    } else {
                        console.error('Other Error:', error.message);
                        toast.error('Error: ' + error.message);
                    }
                } else {
                    console.error('Error:', error);
                    toast.error('Unexpected Error');
                }
            }
        } else {
            toast.warn('Pass không khớp!');
        }
    }

    return (
        <div className="fixed" style={{ zIndex: '10000' }}>
            <div className="row w-50 h-50 p-5" style={{ background: 'white', borderRadius: '20px', border: '0.1px solid #dddddd' }}>
                <div className="col-md-6 offset-md-3 login-container">
                    <h2 className="text-center mb-4">Đăng ký</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="username">Tài khoản</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Nhập tài khoản" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Nhập lại mật khẩu</label>
                            <input value={rePass} onChange={(e) => setRePass(e.target.value)} type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-2 mt-2">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;
