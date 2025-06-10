export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  
  return undefined;
};

export const validatePassword = (password: string, isRegistration = false): string | undefined => {
  if (!password) return 'Password is required';
  
  if (isRegistration) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }
  }
  
  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (password !== confirmPassword) return 'Passwords do not match';
  return undefined;
};

export const validateName = (name: string, fieldName: string): string | undefined => {
  if (!name.trim()) return `${fieldName} is required`;
  return undefined;
};