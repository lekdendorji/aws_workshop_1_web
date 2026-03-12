import * as DEV_CONSTANTS from '/scripts/constants/dev_constants.js';
import * as QA_CONSTANTS from '/scripts/constants/qa_constants.js';
import * as PROD_CONSTANTS from '/scripts/constants/prod_constants.js';

let CONSTANTS;

if(location.host == 'todo.prod.url.com') {
    CONSTANTS = PROD_CONSTANTS;
} else if(location.host == 'todo.qa.url.com') {
    CONSTANTS = QA_CONSTANTS;
} else {
    CONSTANTS = DEV_CONSTANTS;
}
// asd
export const STAGE = CONSTANTS.STAGE;
export const API_URL = CONSTANTS.API_URL;
export const GENERIC_ERROR = 'Sorry, something went wrong. Please try again later';
