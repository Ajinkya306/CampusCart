const authHeader = () => {

  const token =

    localStorage.getItem(
      "campusToken"
    );

  return {

    headers: {

      Authorization:
        `Bearer ${token}`,

    },

  };

};

export default authHeader;