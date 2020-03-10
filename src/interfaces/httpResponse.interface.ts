import IError from "./error.interface";

export default interface IHttpResponse<T> {
    error?: IError,
    data?: T
}