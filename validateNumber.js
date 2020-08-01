const validateNumber = (department_id) => {
    let isNotNumber = isNaN(department_id);
 
      if (isNotNumber) {       
        return 'Numbers only, please!'; 
      }
      return true;
  }

module.exports = validateNumber;