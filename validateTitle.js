const validateTitle = (title) => {
 
      if (title.trim() === "") {       
        return 'Title must not be empty!'; 
      }
      return true;
  }

module.exports = validateTitle;