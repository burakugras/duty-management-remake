const API_BASE_URL='http://localhost:5177/api/';

export const fetchTaks=()=>{
    return $.ajax({
        url: `${API_BASE_URL}/Duties/GetAll`,
        method: 'GET',
        dataType: 'json',
    });
};