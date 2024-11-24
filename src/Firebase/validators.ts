const userValidator = (email: string, phoneNo: string) => {
    const isEmailValid = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPhoneNoValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneNo);

    if (!isEmailValid) return "Email is not valid";
    if (!isPhoneNoValid) return "Phone number is not valid";

    return null;
};

export default userValidator;
