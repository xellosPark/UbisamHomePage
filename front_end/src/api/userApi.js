import api from "./api";

export const onCreateUser = async (id, pw, name, admin, position) => {
    try {
        const response = await api.post(`/api/user/create`,
            {
                user_id : id,
                user_password : pw,
                user_name : name,
                admin : admin,
                job_position : position,
            }
        );
        
        return response;
      } catch (error) {
        if (error.response) {
          
        }
      }
};

export const idDuplicateCheck = async (id) => {
  try {
    const response = await api.get(`/api/user/${id}`);
    console.log('response', response);
    
    return response;
  } catch (error) {
    return error;
  }
}