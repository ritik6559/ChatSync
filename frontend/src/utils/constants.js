export const HOST = import.meta.env.VITE_SERVER_URL;

// AUTH ROUTES
export const AUTH_ROUTES = "/api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;

export const colors = [
    "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa] ",
    "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb] ",
    "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb] ",
    "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb] ",
]

export const getColor = (color) => {
    if( color >= 0 && color < colors.length ){
        return colors[color];
    }
    return colors[0];
}