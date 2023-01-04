
  // !to make a hook
export const getAuthFormContent = (type) => {
    
    return type === "login"
        ? {
            title: 'Login',
            navigatePath: '/register',
            navigateMessage: "Don't have an account?",
            linkText: 'Register',
        }
        : {
            title: 'Register',
            navigatePath: '/login',
            navigateMessage: 'Already have an account?',
            linkText: 'Login',
        };
}
  // !!