/**
 *
 * @param input
 * @returns {*}
 */
export function emailChecker(input) {
    let regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i;
    // !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(input.val)
        ? {...input, isValid: true}
        : {...input, isValid: false, message: "Format de l'addresse mail incorrect"}
}

/**
 *
 * @param input
 * @returns {*}
 */
export function phoneChecker(input) {
    let regex = /^(2|6)[0-9]{8}$/ig;
    return regex.test(input.val)
        ? {...input, isValid: true}
        : {...input, isValid: false, message: "Format du numéro de téléphone incorrect"}
}

/**
 requiredChecker
 * @param input
 * @returns {*}
 */
export function passwordChecker(input) {
    return inRange(input, 6)
}

/**
 *
 * @param input
 * @param passwordInput
 * @returns {*}
 */
export function passwordConfirmChecker(input, passwordInput) {
    return (input.val === passwordInput.val)
        ? {...input, isValid: true}
        : {...input, isValid: false, message: "La confirmation du mot de passe n'est pas correct"};
}

/**
 *
 * @param input
 * @returns {*}
 */
export function requiredChecker(input) {
    return inRange(input, 1, 255, "Ce champ est réquis")
}

/**
 *
 * @param input
 * @returns {*}
 */
export function imageChecker(input) {
    if(input.val !== '') {
        const fileTypeChecked = inImageType(input);
        return fileTypeChecked.isValid ? inImageSize(input) : fileTypeChecked;
    }
    return {...input, isValid: true};
}

/**
 *
 * @param input
 * @returns {*}
 */
export function requiredImageChecker(input) {
    if(input.val !== '') {
        const fileTypeChecked = inImageType(input);
        return fileTypeChecked.isValid ? inImageSize(input) : fileTypeChecked;
    }
    return{...input, isValid: false, message: "Ce champ est réquis"};
}

/**
 *
 * @param input
 * @param extension
 * @returns {*}
 */
export function fileChecker(input, extension = 'file') {
    if(input.val !== '') {
        const fileTypeChecked = inFileType(input, extension);
        return fileTypeChecked.isValid ? inFileSize(input) : fileTypeChecked;
    }
    return {...input, isValid: true};
}

/**
 *
 * @param input
 * @param extension
 * @returns {*}
 */
export function requiredFileChecker(input, extension = 'file') {
    if(input.val !== '') {
        const fileTypeChecked = inFileType(input, extension);
        return fileTypeChecked.isValid ? inFileSize(input) : fileTypeChecked;
    }
    return{...input, isValid: false, message: "Ce champ est réquis"};
}

/**
 *
 * @param input
 * @returns {*}
 */
function inImageType(input) {
    const acceptedFileTYpe = ['image/png', 'image/jpg', 'image/jpeg'];
    return acceptedFileTYpe.includes(input.val.type)
        ? {...input, isValid: true}
        : {...input, isValid: false, message: 'Format non supporté'};
}

/**
 *
 * @param input
 * @returns {{isValid: boolean}|*}
 */
function inImageSize(input) {
    try {
        return input.val.size < 2000000
            ? {...input, isValid: true}
            : {...input, isValid: false, message: 'Image trop lourde'};
    }
    catch (e) { return {...input, isValid: false, message: "Erreur de chargement de l'image"} }
}

/**
 *
 * @param input
 * @param extension
 * @returns {*}
 */
function inFileType(input, extension) {
    const acceptedFileTYpe = (extension === 'file')
        ? ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']
        : ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return (acceptedFileTYpe.includes(input.val.type))
            ? {...input, isValid: true}
            : {...input, isValid: false, message: 'Format non supporté'};

}

/**
 *
 * @param input
 * @returns {{isValid: boolean}|*}
 */
function inFileSize(input) {
    try {
        return input.val.size < 10000000
            ? {...input, isValid: true}
            : {...input, isValid: false, message: 'Fichier trop lourde'};
    }
    catch (e) { return {...input, isValid: false, message: "Erreur de chargement du fichier"} }
}

/**
 *
 * @param input
 * @param min
 * @param max
 * @param errorMessage
 * @returns {*}
 */
function inRange(input, min = 2, max = 255, errorMessage = undefined) {
    const length = input.val ? input.val.toString().length : 0;
    const message = errorMessage ? errorMessage : `Ce champ doit avoir au moins ${min} caractères`;
    return (length <= max && length >= min)
        ? {...input, isValid: true}
        : {...input, isValid: false, message: message}
}
