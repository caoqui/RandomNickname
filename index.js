const express = require("express");
const fs = require("fs");
const readFileSync = require("fs").readFileSync;
const app = express();
const port = 3000;
const join = require("path").join;

// get random
function getRandomNumber(to) {
  return Math.floor(Math.random() * to);
}

// readfile words
const getAllWords = readFileSync(join(__dirname, "./words.txt"), "utf-8");
var listWords = getAllWords.split("\n");

// get random word
const getRandomWords = () => {
  const randomNumber = getRandomNumber(listWords.length);
  return listWords[randomNumber].trim();
};

let l1 = "|-----------------------------------------------------------------------------------------------|";
let l2 = "|                               Hướng dẫn sử dụng                                               |";
let l3 = "|Câu truy vấn cơ bản full chức năng:                                                            |";
let l4 = "|http://localhost:3000/?words=4&&total=100&&number=true&&end=.tayaya                            |";
let l5 = "|Đối số:                                                                                        |"
let l6 = "|words: mỗi nickname được cấu thành từ bao nhiêu từ.                                            |";
let l7 = "|total: tổng số nickname.                                                                       |";
let l8 = "|number: không truyền thì nickname không có số, truyền bằng true thì thêm số bất kì vào cuối.   |";
let l9 = "|end: đuôi kết thúc của nickname là gì, không truyền thì là .near.                              |";
let introduction = [l1,l2,l3,l4,l5,l6,l7,l8, l9, l1];

app.get("/", (req, res) => {
try {
    const words = Number(req.query.words || 3);
    const total = Number(req.query.total || 1);
    const end = req.query.end || ".near";
    const number = req.query.number;
    let rs = [];
    for(let i = 0; i < total; i++) {
      let newWord = "";
      for(let j = 0; j < words; j++) {
          newWord += getRandomWords();
      }
      if(number) newWord += getRandomNumber(10000);
      newWord += end;
      rs.push(newWord)
    }
  
    return res.status(200).json({introduction: introduction, data: rs});
} catch (error) {
    return res.status(400).json("Đã xảy ra lỗi, vui lòng kiểm tra lại.")
}

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
