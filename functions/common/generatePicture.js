const fs = require("fs");
const Canvas = require("canvas");

// const generatePicture = async () => {
//   const width = 512;
//   const height = 512;

//   const canvas = createCanvas(width, height);
//   const context = canvas.getContext("2d");

//   context.fillStyle = "#000";
//   context.fillRect(0, 0, width, height);

//   await loadImage("./images/evo1.png").then((image) => {
//     context.drawImage(image, 0, 0, width, height);
//   });

//   await loadImage("./images/logo.jpeg").then((image) => {
//     const logoSize = 110;

//     const logoPosX = width / 2 - logoSize / 2;

//     context.arc

//     circlePath.arc(150, logoSize, logoSize, 0, 2 * Math.PI);
//     // let squarePath = new Path2D();
//     // squarePath.rect(85, 10, 130, 130);

//     // ctx.clip(squarePath, "evenodd");
//     context.clip(circlePath);

//     context.drawImage(image, logoPosX, 50, 110, 110);
//   });

//   const buffer = canvas.toBuffer("image/png");
//   fs.writeFileSync("./images/test.png", buffer);

//   context.font = "bold 70pt Menlo";
//   context.textAlign = "center";
//   context.textBaseline = "top";
//   context.fillStyle = "#3574d4";

//   const text = "Hello, World!";

//   const textWidth = context.measureText(text).width;
//   context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
//   context.fillStyle = "#fff";
//   context.fillText(text, 600, 170);

//   context.fillStyle = "#fff";
//   context.font = "bold 30pt Menlo";
//   context.fillText("flaviocopes.com", 600, 530);
// };

const generatePicture = async (evo, logo) => {
  const width = 512;
  const height = 512;

  const canvas = Canvas.createCanvas(width, height);
  const context = canvas.getContext("2d");

  await Canvas.loadImage("./images/bg.jpg").then((image) => {
    context.drawImage(image, 0, -250, width, 900);
  });

  // context.fillStyle = "rgba(30,230,19,0.4)";
  // context.fillRect(0, 0, canvas.width, canvas.height);

  await Canvas.loadImage("./images/evo3.png").then((image) => {
    context.drawImage(image, 0, 0, width, height);
  });

  context.font = "900 italic 22pt Montserrat";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#fff";

  let title = "Ultimate Marinade Tournament";

  title = title.toUpperCase();

  // context.fillText(title, 256, 468);

  context.font = "900 italic 18pt Montserrat";

  const text = "03/02/2023";

  // const textWidth = context.measureText(text).width;
  // context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);

  context.textAlign = "center";

  context.fillText(text, 255, 360);

  context.save();
  // context.rotate(-Math.PI / 2);
  // context.fillText(text, -370, 340);
  // context.restore();

  const circle = {
    x: canvas.width / 2,
    y: 180,
    radius: 58,
  };

  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  const avatar = await Canvas.loadImage("./images/logo.jpeg");
  console.log(avatar.height, avatar.width);

  // Compute aspectration
  const aspect = avatar.height / avatar.width;
  // Math.max is ued to have cover effect use Math.min for contain
  const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
  const hsy = circle.radius * Math.max(aspect, 1.0);
  // x - hsl and y - hsy centers the image
  context.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);

  context.font = "bold 70pt Menlo";
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#3574d4";

  const buffer = canvas.toBuffer("image/png");
  const data = canvas.toDataURL("image/png");

  fs.writeFileSync("./test.png", buffer);
  return data;
};

module.exports = generatePicture;
