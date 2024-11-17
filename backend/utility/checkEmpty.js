export default function checkEmptyFields(body, requiredFields) {
    const missingFields = requiredFields.filter(
        (field) => !body[field] || body[field].trim() === ""
    );
    return {
        isValid: missingFields.length === 0,
        missingFields,
    };
}
