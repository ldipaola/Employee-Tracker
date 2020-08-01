const validateInput = (input) => {
 
      if (input.trim() === "") {       
        return 'input must not be empty!'; 
      }
      return true;
  }

module.exports = validateInput;