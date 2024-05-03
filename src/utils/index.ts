export const avatarLetters = (inputString: string | undefined) => {
    const words = inputString?.split(' '); // Split the string into words
    const firstLetters = words?.map(word => word.charAt(0)); // Extract the first letter of each word
    return firstLetters?.join(''); // Join the first letters back together
}

export const checkImageURL = (url: string) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

export const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const checkPasswordStrength = (password: string) => {

    const passwordSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    // Define criteria for password strength
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = passwordSpecialChars.test(password);

    // Calculate the total score based on criteria
    let score = 0;
    if (password.length >= minLength) score++;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChars) score++;

    // Determine the strength based on the score
    if (score === 5) {
        return 'Strong';
        // } else if (score >= 3) {
        //   return 'Moderate';
    } else {
        return 'Weak';
    }
}