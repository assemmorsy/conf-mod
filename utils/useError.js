function useError(msg, status) {
    let errorObj = new Error(msg)
    errorObj.status = status
    return errorObj
}

function useValidationError(errors) {
    errorMsgs = errors.array().reduce((msg, err) => {
        return msg + `${err.msg} at field ${err.param} / `;
    }, "")
    return useError(errorMsgs, 400)
}
module.exports = { useError, useValidationError }