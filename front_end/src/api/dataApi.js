import axios from "axios";
import api from "./api";


export const onCreateInquire = async (data) => {
    const phone_number = data.phone_first + '-' + data.phone_seconed + '-' + data.phone_last;
    try {
        const response = await axios.post(`/api/data/create/inquire`,
            {
                data: data,
                phone_number: phone_number,
            }
        );

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
};