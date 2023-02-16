export default uploadPicture = async (files) => {
  const formData = new FormData();

  formData.append("myFile", files[0]);

  fetch(
    "https://alpha-league-racing-api-dev.herokuapp.com/call-amazon-s3/daolpu",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("error=>" + error);
    });
};
