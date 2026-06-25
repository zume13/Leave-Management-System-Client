import { toastType } from "../utilities/types";

export interface Toast {
    id : string;
    message : string;
    type : toastType;
}
