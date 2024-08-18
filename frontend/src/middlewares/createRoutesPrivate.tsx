import Cookies from 'js-cookie';

const createRoutesPrivate = (routesPrivate) => {
  const token = Cookies.get('token');
  const infoUser = token ? JSON.parse(token) : null;

  if (infoUser && infoUser.role === 'admin') {
    return routesPrivate;
  } else {
    return []; // Trả về một mảng rỗng nếu không phải admin
  }
};

export default createRoutesPrivate;