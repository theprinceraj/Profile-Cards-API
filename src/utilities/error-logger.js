/**
 * Logs an error with additional information.
 *
 * @param {Error} error - The error object to be logged.
 * @param {Object} additionalInfo - Additional information to be included in the error log.
 * @return {undefined} This function does not return anything.
 */
export function logError(error, additionalInfo = {}) {
    try {
        // Get current timestamp in IST
        const timestamp = getISTTimestamp();

        // Extract relevant information from the error object
        const errorInfo = {
            timestamp,
            errorName: error.name || 'N/A',
            errorMessage: error.message || 'N/A',
            stackTrace: error.stack || 'N/A',
            ...additionalInfo,
        };

        // Log the error information
        console.error('Error Info:', errorInfo);
    } catch (logError) {
        console.error('Error in logging:', logError);
    }
}

/**
 * Returns the current timestamp in the IST time zone.
 *
 * @return {string} The IST timestamp in the format: "DD/MM/YYYY, HH:MM:SS"
 */
function getISTTimestamp() {
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date().toLocaleString('en-IN', options);
}