
export const isInvalidUsername = (username) => {
    let message = false
    if (username === undefined || username?.trim() === '') {
        message = "Username is required"
    } else {
        if (username.trim().length < 8) {
            message = "Enter a minimum of 8 characters, including at least 6 letters, and exclude special characters."
        } else {
            if (username.trim().length > 25) {
                message = "Enter a maximum of 25 characters, including at least 6 letters, and exclude special characters."
            } else {
                const usernamePatern = /^(?=(.*[a-zA-Z]){6,})[a-zA-Z\d]*$/;
                if (!usernamePatern.test(username)) {
                    message = "Username invalid, enter from 8 to 25 characters including at least 6 letters, and exclude special characters."
                }
            }
        }
    }
    return message
}

export const isInvalidPassword = (password) => {
    let message = false
    if (password === undefined || password?.trim() === '') {
        message = "Password is required"
    } else {
        if (password.trim().length < 8) {
            message = "Enter a minimum of 8 characters, including at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
        } else {
            if (password.trim().length > 25) {
                message = "Enter a maximum of 25 characters, including at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
            } else {
                const passwordPatern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/
                if (!passwordPatern.test(password)) {
                    message = "Password invalid, enter from 8 to 25 characters including at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
                }
            }
        }
    }
    return message
}

export const isInvalidEmail = (email) => {
    let message = false
    if (email === undefined || email?.trim() === '') {
        message = "Email is required."
    } else {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(email)) {
            message = "Email invalid, please check your email."
        }
    }
    return message
}

export const isInvalidFullname = (fullName) => {
    let message = false
    if (fullName === undefined || fullName?.trim() === '') {
        message = "Fullname is required."
    } else {
        const fullNamePattern = /^[a-zA-ZÀ-ỹ\s]+$/
        if (!fullNamePattern.test(fullName)) {
            message = "FullName consists of letters only"
        }
    }
    return message
}

export const isInvalidTittle = (title) => {
    let message = false;
    let titleTest = title?.split(' ').filter(Boolean)
    if (titleTest.length < 5) {
        message = "Enter a minimum of 5 words"
    } else if (titleTest.length > 100) {
        message = "Enter a maximum of 100 words"
    }
    return message;
}

export const isInvalidContent = (content) => {
    let message = false;
    let contentTest = content?.split(' ').filter(Boolean)
    if (contentTest.length < 100) {
        message = "Enter a minimum of 100 words"
    }
    return message
}


