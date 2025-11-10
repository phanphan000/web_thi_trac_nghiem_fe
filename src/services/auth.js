import API from "./api";

// Đăng ký
export const register = async (data) => {
    const res = await API.post("/register", data);
    return res.data;
};

// Đăng nhập
export const login = async (data) => {
    const res = await API.post("/login", data);
    localStorage.setItem("token", res.data.token); // lưu token
    return res.data;
};

// Đăng xuất
export const logout = async () => {
    const res = await API.post("/logout");
    localStorage.removeItem("token");
    return res.data;
};

// Lấy thông tin user hiện tại
export const getMe = async () => {
    const res = await API.get("/me");
    return res.data;
};
