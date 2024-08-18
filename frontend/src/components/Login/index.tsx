import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { PORT_SERVER } from "../../constants";
interface Props {
    isHandled: Function
}
const Login: React.FC<Props> = ({ isHandled = () => { } }) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post(`${PORT_SERVER}api/user`, {
                username,
                pass
            });

            if (response.data.username) {
                // Set token in cookies
                Cookies.set('token', JSON.stringify(response.data), { expires: 7 });
                // Navigate to home page after token is set

                navigate('/');
            }
            isHandled();

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Server Error:', error.response.data);
                } else if (error.request) {
                    console.error('Network Error:', error.request);
                } else {
                    console.error('Other Error:', error.message);
                }
            } else {
                console.error('Error:', error);
            }
        }
    }

    return (
        <div className="fixed" style={{ zIndex: '99999999' }}>
            <div className="row w-50 h-50 p-5" style={{ background: 'white', borderRadius: '20px', border: '0.1px solid #dddddd' }}>
                <div className="col-md-6 offset-md-3 login-container">
                    <h2 className="text-center mb-4">Đăng nhập</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Tài khoản</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Nhập tài khoản" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input onChange={(e) => setPass(e.target.value)} type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-2 mt-2">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
