import ApiInterface from "./_api";
import axios from "axios"
export default class GalleryItem extends ApiInterface {
    async getAll() {
        const response = await axios.get( this.baseUrl + "/gallery-items");
        return response.data;
    }
}